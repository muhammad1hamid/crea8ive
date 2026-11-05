import { NextResponse, type NextRequest } from "next/server";
import qatarRedirects from "@/data/qatar-redirects.json";
import { isSpamPath } from "@/lib/seo-cleanup";
import { SITE_URL } from "@/lib/site-config";

export function proxy(request: NextRequest) {
  // Next cannot execute public PHP. Rewrite the form path before static-file
  // lookup, and prevent PHP source from being returned by the Node runtime.
  let pathname: string;
  try {
    pathname = decodeURIComponent(request.nextUrl.pathname);
  } catch {
    return new NextResponse("Bad Request", { status: 400 });
  }

  const redirects: Record<string, string> = qatarRedirects;
  const target = redirects[pathname] || redirects[`${pathname.replace(/\/+$/, "")}/`];
  if (target) {
    const destination = new URL(target, request.url);
    destination.search = request.nextUrl.search;
    return NextResponse.redirect(destination, 301);
  }

  if (/^\/qa(?:\/|$)/.test(pathname)) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const scriptPath = pathname.replace(/\/+$/, "");
  if (scriptPath === "/enquiries/submit.php") {
    return NextResponse.rewrite(new URL("/api/enquiries/submit/", request.url));
  }

  if (/\.php$/i.test(scriptPath)) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const host = request.headers.get("host")?.toLowerCase().split(":")[0] ?? "";
  const canonicalHost = new URL(SITE_URL).hostname;

  if (host === `www.${canonicalHost}`) {
    const url = request.nextUrl.clone();
    url.hostname = canonicalHost;
    return NextResponse.redirect(url, 308);
  }

  if (isSpamPath(request.nextUrl.pathname)) {
    return new NextResponse("This historical spam URL has been permanently removed from Crea8iv Media.", {
      status: 410,
      headers: {
        "Cache-Control": "public, max-age=3600",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|apple-touch-icon.png|robots.txt|sitemap.xml|rss.xml|feed.xml).*)"],
};
