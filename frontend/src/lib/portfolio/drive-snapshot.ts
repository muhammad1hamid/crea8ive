import "server-only";

import { buildPortfolioProject } from "./classifier";
import type { DriveFile } from "./types";

const FOLDER_MIME = "application/vnd.google-apps.folder";

type SnapshotFolder = {
  id: string;
  name: string;
  createdTime: string;
  modifiedTime: string;
  children: Array<{
    id: string;
    name: string;
    createdTime: string;
    modifiedTime: string;
  }>;
};

export const extractedDriveRoot = {
  id: "1KttI3P2RbU03nafvL6xztIiuDKUgF3Uk",
  name: "Portfolio",
  url: "https://drive.google.com/drive/folders/1KttI3P2RbU03nafvL6xztIiuDKUgF3Uk?usp=sharing",
  extractedAt: "2026-06-29T07:40:00+05:00",
} as const;

const snapshotFolders: SnapshotFolder[] = [
  {
    id: "1wTgt-inRpkL-HrsjXfY2xE4ef9HS0Hex",
    name: "Dibaj Fabrics & Tailors",
    createdTime: "2026-06-27T20:08:49.022Z",
    modifiedTime: "2026-06-27T20:08:49.022Z",
    children: [
      folder("1w1VxkBDwp7nGN6PRo-VVr07FTkGIyzKZ", "Portfolio Highlights", "2026-06-27T20:09:13.699Z"),
      folder("15FWcg9C0__KOc-liazWwU8Jmp7AhBLKN", "Website", "2026-06-27T20:09:13.697Z"),
      folder("1fAqFaS73mkFcGPImFQG6iXpRp8jZgOg_", "Results", "2026-06-27T20:09:13.697Z"),
      folder("1KhU0M3iyY6K17_0n4NL0iQ6hY_HE3jOl", "Short Videos", "2026-06-27T20:09:13.693Z"),
      folder("1pFesJUMjAN07e3VGP93Sm08ZVdqOM5c9", "Search Optimization", "2026-06-27T20:09:13.693Z"),
      folder("1GKPF3v6seHMtGOGZUPMF2OQOPw-GvdjF", "Client Feedback", "2026-06-27T20:09:13.693Z"),
      folder("1f963iBuslVFKXDauyj9wILuN8qMA9HNf", "Google Business", "2026-06-27T20:09:13.690Z"),
      folder("1XzVnLi9-aymtumpoBUud_eVOcZLwO7_a", "Social Media", "2026-06-27T20:09:13.689Z"),
      folder("1_GiDwfhikM9LqFlTRf2PHwnOtkEiCh4h", "Meta Ads", "2026-06-27T20:09:13.686Z"),
      folder("1fDC_CB_ycy-mlhKlBaLF4kx89kAoyN7s", "Branding", "2026-06-27T20:09:13.683Z"),
    ],
  },
  {
    id: "1hw1OAokDeMehNcSwrqyKwaBd7ERFlNis",
    name: "Desi Ghiza",
    createdTime: "2026-06-27T20:06:10.385Z",
    modifiedTime: "2026-06-27T20:06:10.385Z",
    children: [
      folder("1U8BYM2R8frBQTafLbZ11_8zeeObWyH_h", "Search Optimization", "2026-06-27T20:07:54.600Z"),
      folder("1H9GeL7UV1wgbPAKPdkqZX_4UbcMaCBAZ", "Social Media", "2026-06-27T20:07:54.597Z"),
      folder("1czStzsBNhM-REKCBs1xor-AxhHQ8Hwuh", "Google Business", "2026-06-27T20:07:54.597Z"),
      folder("1_BxzKDC_grKMrZOUVMcPpINDOchrA52D", "Portfolio Highlights", "2026-06-27T20:07:54.588Z"),
      folder("1PF7BOmSw09BN06HmuQBNVKJvOg0yEJ4e", "Results", "2026-06-27T20:07:54.588Z"),
      folder("13LRNxgH8b2FhshPZBS-fqr2eSaGetRJU", "Website", "2026-06-27T20:07:54.587Z"),
      folder("1dAgQgp_Px4BFeh68XQJQdPSs3vL6Abkh", "Branding", "2026-06-27T20:07:54.586Z"),
      folder("10oCH_0tDNtrXhztuLCrNzqi4nnY2niMR", "Client Feedback", "2026-06-27T20:07:54.584Z"),
      folder("1mORBirW4JOLHi4nn4PiBZ29lnFhUrbya", "Short Videos", "2026-06-27T20:07:54.584Z"),
      folder("1X89q2Rf1GhhL2KeCR8TwR5Nv8u7V-bZp", "Meta Ads", "2026-06-27T20:07:54.582Z"),
    ],
  },
  {
    id: "1imp_yWqOE5xOTzHtuR_kokEEUmKE5hGK",
    name: "Lumino Dental & Aesthetics",
    createdTime: "2026-06-27T20:05:20.107Z",
    modifiedTime: "2026-06-27T20:05:20.107Z",
    children: [
      folder("1UnUJ2XQWcQlu7-K_mBSOiaPMVmYhsjA1", "Short Videos", "2026-06-27T20:08:21.008Z"),
      folder("1RGoGKoaFUAt9432yychZx3p084QLjk7r", "Website", "2026-06-27T20:08:20.997Z"),
      folder("1zb32ITf7MGM0fsIAro4P3CPYpcdGe2Wt", "Search Optimization", "2026-06-27T20:08:20.993Z"),
      folder("1qA3RkCkLs_BSH6NIrznXphU1q6zpEnYk", "Google Business", "2026-06-27T20:08:20.992Z"),
      folder("1kAi9EmHKrsZLNPoMtkfRTQACaOJAiqfY", "Social Media", "2026-06-27T20:08:20.991Z"),
      folder("1T7M2XkZC1CRU4QnxVeFAFVPcCGfTHemg", "Meta Ads", "2026-06-27T20:08:20.986Z"),
      folder("1NcM0Qbkb6VBaeT85-7uIWKKL79WsqASA", "Client Feedback", "2026-06-27T20:08:20.986Z"),
      folder("1FHsAa_-Fty-7H-WPmXZ7xXQfg0A13TB7", "Portfolio Highlights", "2026-06-27T20:08:20.985Z"),
      folder("1TnIr3jq5hZ57q-y4dZyeNILL1OYmuW9s", "Branding", "2026-06-27T20:08:20.982Z"),
      folder("1quVsCVXw99xR5Dfmbc_XX9BGZnOOPfj6", "Results", "2026-06-27T20:08:20.982Z"),
    ],
  },
  {
    id: "1RR8m2nZClLWzpHETB9L1pSJrmd23tRvz",
    name: "DAC Clinic",
    createdTime: "2026-06-27T19:43:45.735Z",
    modifiedTime: "2026-06-27T19:43:45.735Z",
    children: [
      folder("1VBEJRMs0n-L85tCZQXUQzsJy-ikhs_3p", "Meta Ads", "2026-06-27T20:07:47.665Z"),
      folder("1Y4ve9g7xPMZJe-3gp8kQ3HQdJdcjQOUP", "Google Business", "2026-06-27T20:07:47.662Z"),
      folder("1QRFGZPzx4gZ9Lp3LD1jntWw9CkV2SpI6", "Search Optimization", "2026-06-27T20:07:47.662Z"),
      folder("1paGELWeKzuxTT8I1Y3pDMYgtMCWaG8Zg", "Social Media", "2026-06-27T20:07:47.656Z"),
      folder("1vYwAsjILJKQ4bQ_2JG7Bs1vGAFYOSSKs", "Branding", "2026-06-27T20:07:47.653Z"),
    ],
  },
  {
    id: "1vyS-dJnbIiXSFwSMRdv1XN0eEmJXrCzV",
    name: "Crea8iv Media",
    createdTime: "2026-06-27T19:41:52.741Z",
    modifiedTime: "2026-06-27T19:41:52.741Z",
    children: [
      folder("1xlmjJRvturzdxKJBS47yoFWlE2GpHRuh", "Website", "2026-06-27T20:07:39.983Z"),
      folder("1W6wNvnmi_TsWU9jeMfTqqvA2Yq4K9V4V", "Portfolio Highlights", "2026-06-27T20:07:39.981Z"),
      folder("1LbOrCGA8n05UPQM0Ly1mwEgvIEUxJqDL", "Social Media", "2026-06-27T20:07:39.979Z"),
      folder("1yl4QlgrTyOc9nHVhewXuUIK6YosPLMpE", "Branding", "2026-06-27T20:07:39.973Z"),
      folder("1NN8nvISJjbDjivxM9hR8DabMNkAW9K7x", "Search Optimization", "2026-06-27T20:07:39.973Z"),
      folder("1ZW5rnL0KR-y5n_rRlgl_Ebc3DVZly_FT", "Short Videos", "2026-06-27T20:07:39.971Z"),
      folder("1GqJRsyBYX__xVnHJH-09YSYRNYfpt5FA", "Client Feedback", "2026-06-27T20:07:39.965Z"),
      folder("1y8Bdg1y8V6mamDeDQujN_E8n4JRBSk_h", "Meta Ads", "2026-06-27T20:07:39.965Z"),
      folder("1GI2RG6m4AvK9_RjN0eGi1bTAwrswLAwp", "Google Business", "2026-06-27T20:07:39.965Z"),
      folder("1ZoLyRpBnN-GPXw2IvqkAhFPDACQdnPLM", "Results", "2026-06-27T20:07:39.948Z"),
    ],
  },
  {
    id: "1P0wejCYRsZ61izdeopgUEPdG7V1Z-K8u",
    name: "The Smile Xperts",
    createdTime: "2026-06-27T19:41:44.161Z",
    modifiedTime: "2026-06-27T19:41:44.161Z",
    children: [
      folder("1XKVIMgI76nvDTmLrspqXGYOE9TflW2Nu", "Search Optimization", "2026-06-27T20:08:28.318Z"),
      folder("1jl2i06MgZqe9Z5Er62plYU34BpBxH3ya", "Website", "2026-06-27T20:08:28.305Z"),
      folder("16TENX-k1k91kZFA7Fpj9DNXDilgYcCXR", "Google Business", "2026-06-27T20:08:28.298Z"),
      folder("1hDRJGU-VXa2lRfHhNNTNj3LRQ3hN7OA0", "Social Media", "2026-06-27T20:08:28.289Z"),
      folder("14OmrC-k5dh4LCw9gl9pQDp54H5w7JnNc", "Meta Ads", "2026-06-27T20:08:28.286Z"),
      folder("1GaQwb2R3BVpYxbSQUcCGCQ746IyzmlNn", "Short Videos", "2026-06-27T20:08:28.286Z"),
      folder("1WHeErFcyBJVlVLTInZsiP0t8HDwPcSTK", "Portfolio Highlights", "2026-06-27T20:08:28.284Z"),
      folder("1H0vWt2Y54UW8JaQ6uBzsKjHb53FJhkzQ", "Branding", "2026-06-27T20:08:28.281Z"),
      folder("1LheoCtwRDTNog2cO_XowNmtcM1rizOPP", "Results", "2026-06-27T20:08:28.277Z"),
    ],
  },
  {
    id: "15_kjTwegxy9VOLfrS6aaDloIvSjh3lnq",
    name: "CO3 Premium Liquid Shop",
    createdTime: "2026-06-27T19:41:39.798Z",
    modifiedTime: "2026-06-27T19:41:39.798Z",
    children: [
      folder("1MrrBoORSKl_dstr7Bb85mA-75fl5jKN6", "Google Business Graph", "2026-06-27T20:07:27.984Z", "2026-06-29T06:55:13.464Z"),
      folder("10clSksAzGrmTy-07hW8qhcfc9yrYWiq7", "Short Videos", "2026-06-27T20:07:27.996Z"),
      folder("1okp6AWiyGAyNgzoNQvM_YYBr6Ipu7QRg", "Social Media", "2026-06-27T20:07:27.987Z"),
      folder("1zkvtwISkGOZvuoNCmjP8EWmtm4VhNnlM", "Branding", "2026-06-27T20:07:27.981Z"),
    ],
  },
  {
    id: "1BFXek110Za6JsfApxKLN2UlKrW2XWLpi",
    name: "HN Architects",
    createdTime: "2026-06-27T19:41:36.428Z",
    modifiedTime: "2026-06-27T19:41:36.428Z",
    children: [
      folder("1Boxnbn5D1vwxV0W7brm4b21Ukb8DnEZE", "Google Business Performance", "2026-06-27T19:44:35.956Z", "2026-06-27T20:30:44.503Z"),
      folder("18V0DS-hWsQJZC_Y5kU6uJMYYVgD4XKzA", "Social Media", "2026-06-27T19:43:56.035Z", "2026-06-27T20:08:13.849Z"),
      folder("1-Dvm0PL_lPqBSh4h35mtNjFqgPsizuNG", "Short Videos", "2026-06-27T19:44:16.795Z", "2026-06-27T20:08:13.849Z"),
      folder("1jPpg_w-BYIEa3r7Q3ZONHA_Vv_LygGSx", "Branding", "2026-06-27T19:43:52.064Z", "2026-06-27T20:08:13.849Z"),
      folder("1QOn7xrAdYsDh52hDuCztT_AZcWdlgsPE", "Meta Ads", "2026-06-27T19:44:20.571Z", "2026-06-27T20:08:13.849Z"),
    ],
  },
  {
    id: "1FQUG-S-4CODtImvcx3xG7wcAjXhSu5Ah",
    name: "Home Studio Interiors",
    createdTime: "2026-06-27T19:41:30.083Z",
    modifiedTime: "2026-06-27T19:41:30.083Z",
    children: [
      folder("17eumQqHd4AA355RFLvP6NOMYNtihzkK_", "Client Feedback", "2026-06-27T19:43:32.548Z"),
      folder("1mh9l7n68xwByD5rugfT-iyxUdFYDxHF_", "Google Business", "2026-06-27T19:42:49.308Z"),
      folder("1M-YAN1So5Ek_49oklJiC0pAss4xW1-qM", "Meta Ads", "2026-06-27T19:42:38.597Z"),
      folder("1R4Yym6HBysOAMS5t1uvzgD1pwf2zfiRo", "Short Videos", "2026-06-27T19:42:35.063Z"),
      folder("1ILAAHSGfDVultGoDEOAu8duXTtBExfg4", "Social Media", "2026-06-27T19:42:05.876Z"),
      folder("1ATMuxKcXOU9tPkUo3xZnPB1Ye0Cs26Eb", "Branding", "2026-06-27T19:42:01.769Z"),
    ],
  },
];

export function getSnapshotPortfolioProjects() {
  return snapshotFolders
    .map((snapshot) => {
      const folderFile = toDriveFolder(snapshot.id, snapshot.name, snapshot.createdTime, snapshot.modifiedTime);
      const children = snapshot.children.map((child) => toDriveFolder(child.id, child.name, child.createdTime, child.modifiedTime));
      return buildPortfolioProject(folderFile, children);
    })
    .sort((a, b) => (b.createdTime ?? "").localeCompare(a.createdTime ?? ""));
}

function folder(id: string, name: string, createdTime: string, modifiedTime = createdTime) {
  return { id, name, createdTime, modifiedTime };
}

function toDriveFolder(id: string, name: string, createdTime: string, modifiedTime: string): DriveFile {
  return {
    id,
    name,
    mimeType: FOLDER_MIME,
    webViewLink: `https://drive.google.com/drive/folders/${id}`,
    createdTime,
    modifiedTime,
  };
}
