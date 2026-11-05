import "server-only";

import { enhanceProjectWithAI } from "./ai";
import { buildPortfolioProject, calculatePortfolioStats } from "./classifier";
import { getSnapshotPortfolioProjects } from "./drive-snapshot";
import { getDriveAccessToken, hasDriveConfig } from "./drive-auth";
import type { DriveFile, PortfolioProject } from "./types";

const DRIVE_API = "https://www.googleapis.com/drive/v3";
const FOLDER_MIME = "application/vnd.google-apps.folder";
const FILE_FIELDS =
  "id,name,mimeType,description,webViewLink,webContentLink,thumbnailLink,iconLink,size,createdTime,modifiedTime,imageMediaMetadata(width,height),videoMediaMetadata(width,height,durationMillis)";

type DriveListResponse = {
  nextPageToken?: string;
  files: DriveFile[];
};

export async function getPortfolioData() {
  const projects = await getPortfolioProjects();
  return {
    projects,
    stats: calculatePortfolioStats(projects),
    configured: hasDriveConfig() || projects.length > 0,
  };
}

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  const rootFolderId = process.env.GOOGLE_DRIVE_PORTFOLIO_FOLDER_ID;
  if (!rootFolderId) return getSnapshotPortfolioProjects();

  try {
    const folders = await listChildren(rootFolderId, `mimeType='${FOLDER_MIME}'`);
    const projects = await mapLimit(folders, 6, async (folder) => {
      const childFiles = await listDescendants(folder.id, [folder.name], Number(process.env.GOOGLE_DRIVE_PORTFOLIO_MAX_DEPTH ?? 3));
      return enhanceProjectWithAI(buildPortfolioProject(folder, childFiles));
    });

    return projects.length ? projects.sort((a, b) => (b.modifiedTime ?? "").localeCompare(a.modifiedTime ?? "")) : getSnapshotPortfolioProjects();
  } catch {
    return getSnapshotPortfolioProjects();
  }
}

export async function getPortfolioProject(slug: string) {
  const projects = await getPortfolioProjects();
  return projects.find((project) => project.slug === slug) ?? null;
}

export async function getDriveFile(fileId: string) {
  const url = new URL(`${DRIVE_API}/files/${fileId}`);
  url.searchParams.set("fields", FILE_FIELDS);
  const response = await driveFetch(url);
  if (!response.ok) throw new Error(`Drive file fetch failed: ${response.status}`);
  return (await response.json()) as DriveFile;
}

export async function fetchDriveMedia(fileId: string) {
  const url = new URL(`${DRIVE_API}/files/${fileId}`);
  url.searchParams.set("alt", "media");
  return driveFetch(url);
}

export async function fetchDriveThumbnail(fileId: string) {
  const file = await getDriveFile(fileId);
  if (!file.thumbnailLink) return fetchDriveMedia(fileId);
  return driveFetch(new URL(file.thumbnailLink));
}

async function listDescendants(folderId: string, path: string[], depth: number): Promise<DriveFile[]> {
  const children = await listChildren(folderId);
  if (depth <= 1) return children;

  const nestedFolders = children.filter((file) => file.mimeType === FOLDER_MIME);
  const nestedFiles = await mapLimit(nestedFolders, 4, (folder) => listDescendants(folder.id, [...path, folder.name], depth - 1));
  return [...children.filter((file) => file.mimeType !== FOLDER_MIME), ...nestedFiles.flat()];
}

async function listChildren(parentId: string, extraQuery?: string) {
  const files: DriveFile[] = [];
  let pageToken: string | undefined;

  do {
    const url = new URL(`${DRIVE_API}/files`);
    const query = [`'${parentId}' in parents`, "trashed=false", extraQuery].filter(Boolean).join(" and ");
    url.searchParams.set("q", query);
    url.searchParams.set("fields", `nextPageToken,files(${FILE_FIELDS})`);
    url.searchParams.set("pageSize", "1000");
    url.searchParams.set("supportsAllDrives", "true");
    url.searchParams.set("includeItemsFromAllDrives", "true");
    if (pageToken) url.searchParams.set("pageToken", pageToken);

    const response = await driveFetch(url);
    if (!response.ok) {
      throw new Error(`Google Drive list failed: ${response.status} ${await response.text()}`);
    }
    const page = (await response.json()) as DriveListResponse;
    files.push(...page.files);
    pageToken = page.nextPageToken;
  } while (pageToken);

  return files;
}

async function driveFetch(url: URL) {
  const headers = new Headers();
  const token = await getDriveAccessToken();
  if (token) {
    headers.set("authorization", `Bearer ${token}`);
  } else if (process.env.GOOGLE_DRIVE_API_KEY) {
    url.searchParams.set("key", process.env.GOOGLE_DRIVE_API_KEY);
  }

  return fetch(url, {
    headers,
    next: { revalidate: Number(process.env.PORTFOLIO_REVALIDATE_SECONDS ?? 900) },
  });
}

async function mapLimit<T, R>(items: T[], limit: number, mapper: (item: T) => Promise<R>) {
  const results: R[] = [];
  let index = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (index < items.length) {
      const current = index;
      index += 1;
      results[current] = await mapper(items[current]);
    }
  });
  await Promise.all(workers);
  return results;
}
