"use client";

import { useEffect, useRef } from "react";
import { Footer } from "@/components/layout/Footer";

const MOBILE_SNAP_MQ = "(max-width: 767px)";
const SNAP_THRESHOLD = 48;

function getScrollMarginTop(el: HTMLElement): number {
  return parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
}

function getPanelScrollTop(container: HTMLElement, panel: HTMLElement): number {
  const containerTop = container.getBoundingClientRect().top;
  const panelTop = panel.getBoundingClientRect().top;
  return container.scrollTop + (panelTop - containerTop);
}

function getTargetScrollTop(container: HTMLElement, el: HTMLElement): number {
  const containerTop = container.getBoundingClientRect().top;
  const elTop = el.getBoundingClientRect().top;
  const scrollMargin = getScrollMarginTop(el);
  return container.scrollTop + (elTop - containerTop) - scrollMargin;
}

export function PageScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const snapDisabledRef = useRef(false);
  const hashNavRef = useRef(false);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const mobileMq = window.matchMedia(MOBILE_SNAP_MQ);
    const isMobile = () => mobileMq.matches;

    const getPanelBounds = () => {
      const panels = container.querySelectorAll<HTMLElement>("[data-snap-panel]");
      const last = panels[panels.length - 1];
      if (!last) return null;

      return {
        lastPanelBottom: last.offsetTop + last.offsetHeight,
      };
    };

    const setSnapEnabled = (enabled: boolean) => {
      if (isMobile()) {
        container.style.scrollSnapType = "none";
        return;
      }
      if (snapDisabledRef.current === !enabled) return;
      snapDisabledRef.current = !enabled;
      container.style.scrollSnapType = enabled ? "y mandatory" : "none";
    };

    const applyMobileMode = () => {
      if (isMobile()) {
        container.style.scrollSnapType = "none";
      } else if (!snapDisabledRef.current) {
        container.style.scrollSnapType = "y mandatory";
      }
    };

    const updateSnap = () => {
      if (isMobile() || hashNavRef.current) return;

      const bounds = getPanelBounds();
      if (!bounds) return;

      const { lastPanelBottom } = bounds;
      const scrollTop = container.scrollTop;
      const viewportHeight = container.clientHeight;

      // Only release snap once we've scrolled past the last panel into contact/footer
      const inFreeScrollZone =
        scrollTop > lastPanelBottom - viewportHeight + SNAP_THRESHOLD;

      setSnapEnabled(!inFreeScrollZone);
    };

    const scrollToHash = (hash: string, smooth: boolean) => {
      if (!hash || hash === "#") return false;

      const el = document.getElementById(hash.slice(1));
      if (!el || !container.contains(el)) return false;

      hashNavRef.current = true;

      const panel = el.closest<HTMLElement>("[data-snap-panel]");
      let top: number;

      if (panel && !isMobile()) {
        top = getPanelScrollTop(container, panel);
        setSnapEnabled(true);
      } else {
        top = getTargetScrollTop(container, el);
        setSnapEnabled(false);
      }

      container.scrollTo({
        top: Math.max(0, top),
        behavior: smooth ? "smooth" : "auto",
      });

      return true;
    };

    let scrollEndTimer: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      updateSnap();
      clearTimeout(scrollEndTimer);
      scrollEndTimer = setTimeout(() => {
        hashNavRef.current = false;
        updateSnap();
      }, 150);
    };

    const onNavClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a[href]");
      if (!anchor || !(anchor instanceof HTMLAnchorElement)) return;

      const href = anchor.getAttribute("href");
      if (!href?.startsWith("#")) return;

      e.preventDefault();

      if (href === "#") {
        hashNavRef.current = true;
        setSnapEnabled(true);
        container.scrollTo({ top: 0, behavior: "smooth" });
        history.pushState(null, "", window.location.pathname);
        return;
      }

      if (scrollToHash(href, true)) {
        history.pushState(null, "", href);
      }
    };

    const onHashChange = () => {
      scrollToHash(window.location.hash, true);
    };

    const onMobileChange = () => {
      applyMobileMode();
      if (!isMobile()) {
        updateSnap();
      }
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateSnap);
    window.addEventListener("hashchange", onHashChange);
    mobileMq.addEventListener("change", onMobileChange);
    document.addEventListener("click", onNavClick);

    if (window.location.hash) {
      requestAnimationFrame(() => {
        scrollToHash(window.location.hash, false);
        hashNavRef.current = false;
        updateSnap();
      });
    }

    applyMobileMode();
    updateSnap();

    return () => {
      clearTimeout(scrollEndTimer);
      container.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateSnap);
      window.removeEventListener("hashchange", onHashChange);
      mobileMq.removeEventListener("change", onMobileChange);
      document.removeEventListener("click", onNavClick);
    };
  }, []);

  return (
    <main id="page-scroll" ref={ref}>
      {children}
      <Footer />
    </main>
  );
}
