"use client";

import { useEffect } from "react";

/**
 * Viewport-lazy lottie: WordPressContent renames each <lottie-player>'s src to
 * data-src, and this loader (a) injects the 376KB player script only when the
 * first animation approaches the viewport, and (b) activates each animation
 * individually as it scrolls near. Initializing all animations at page load
 * cost ~7s of mobile main-thread time; now none of it competes with startup.
 */
export default function LottiePlayerLoader() {
  useEffect(() => {
    const players = Array.from(document.querySelectorAll("lottie-player[data-src]"));
    if (players.length === 0) return;

    let injected = false;
    const inject = () => {
      if (injected || document.querySelector("script[data-lottie-player]")) return;
      injected = true;
      const script = document.createElement("script");
      script.src = "/lottie-player.js";
      script.async = true;
      script.setAttribute("data-lottie-player", "");
      document.body.appendChild(script);
    };

    const activate = (el: Element) => {
      inject();
      const src = el.getAttribute("data-src");
      if (src) {
        el.setAttribute("src", src);
        el.removeAttribute("data-src");
      }
    };

    if (typeof window.IntersectionObserver === "function") {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              io.unobserve(entry.target);
              activate(entry.target);
            }
          });
        },
        { rootMargin: "600px 0px" }
      );
      players.forEach((p) => io.observe(p));
      return () => io.disconnect();
    }

    // No IO support: activate everything after the window load event.
    const onLoad = () => players.forEach(activate);
    if (document.readyState === "complete") {
      onLoad();
      return;
    }
    window.addEventListener("load", onLoad, { once: true });
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return null;
}
