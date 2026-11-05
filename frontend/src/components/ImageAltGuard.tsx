"use client";

import { useEffect } from "react";

const GENERIC_ALT = "Crea8iv Media digital growth visual";

function titleFromPath(src: string) {
  try {
    const pathname = new URL(src, window.location.href).pathname;
    const filename = pathname.split("/").filter(Boolean).pop() ?? "";
    const name = filename
      .replace(/\.(avif|gif|jpe?g|png|svg|webp)$/i, "")
      .replace(/[-_]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    if (!name || /^image$/i.test(name)) return GENERIC_ALT;
    return `${name.replace(/\b\w/g, (char) => char.toUpperCase())} by Crea8iv Media`;
  } catch {
    return GENERIC_ALT;
  }
}

function fallbackAltFor(image: HTMLImageElement) {
  const explicit =
    image.dataset.alt ||
    image.getAttribute("aria-label") ||
    image.getAttribute("title") ||
    image.closest("[aria-label]")?.getAttribute("aria-label") ||
    image.closest("figure")?.querySelector("figcaption")?.textContent?.trim();

  return explicit?.trim() || titleFromPath(image.currentSrc || image.src);
}

function repairMissingAlt(root: ParentNode = document) {
  root.querySelectorAll("img:not([alt])").forEach((image) => {
    if (image instanceof HTMLImageElement) {
      image.setAttribute("alt", fallbackAltFor(image));
    }
  });
}

export default function ImageAltGuard() {
  useEffect(() => {
    repairMissingAlt();

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLImageElement) {
            if (!node.hasAttribute("alt")) {
              node.setAttribute("alt", fallbackAltFor(node));
            }
            return;
          }

          if (node instanceof HTMLElement) {
            repairMissingAlt(node);
          }
        });
      }
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
