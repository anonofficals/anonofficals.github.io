
import { useEffect } from "react";

/**
 * Adds a parallax effect to any element with class .universal-page-bg.
 */
export function useParallaxBackground() {
  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY || window.pageYOffset;
      const bgEls = document.getElementsByClassName("universal-page-bg");
      for (let i = 0; i < bgEls.length; i++) {
        const el = bgEls[i] as HTMLElement;
        el.style.backgroundPosition = `center ${-scrollY * 0.2}px`;
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // set once

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
}
