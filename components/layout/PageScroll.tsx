"use client";

import { useEffect, useRef } from "react";
import { Footer } from "@/components/layout/Footer";

const MOBILE_SNAP_MQ = "(max-width: 767px)";

export function PageScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const snapDisabledRef = useRef(false);
  const freedRef = useRef(false);

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
        lastPanelTop: last.offsetTop,
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
      if (isMobile()) return;

      const bounds = getPanelBounds();
      if (!bounds) return;

      const { lastPanelTop, lastPanelBottom } = bounds;
      const scrollTop = container.scrollTop;
      const viewBottom = scrollTop + container.clientHeight;

      // Near or past the bottom of the last snap panel — release for contact/footer
      const nearContact = viewBottom >= lastPanelBottom - 48;

      if (nearContact) {
        freedRef.current = true;
        setSnapEnabled(false);
        return;
      }

      if (freedRef.current && scrollTop > lastPanelTop) {
        // Scrolling up from contact through the service area panel
        setSnapEnabled(false);
        return;
      }

      if (scrollTop <= lastPanelTop) {
        freedRef.current = false;
        setSnapEnabled(true);
      }
    };

    const disableSnap = () => {
      freedRef.current = true;
      setSnapEnabled(false);
    };

    const onNavClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a[href]");
      if (!anchor || !(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.getAttribute("href") === "#contact") {
        disableSnap();
      }
    };

    const freeScrollEl = container.querySelector<HTMLElement>("[data-free-scroll]");
    let observer: IntersectionObserver | undefined;

    if (freeScrollEl) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (isMobile()) return;
          if (entry.isIntersecting) {
            disableSnap();
          }
        },
        { root: container, threshold: 0 },
      );
      observer.observe(freeScrollEl);
    }

    const onMobileChange = () => {
      applyMobileMode();
      if (!isMobile()) {
        updateSnap();
      }
    };

    container.addEventListener("scroll", updateSnap, { passive: true });
    window.addEventListener("resize", updateSnap);
    mobileMq.addEventListener("change", onMobileChange);
    document.addEventListener("click", onNavClick);

    if (window.location.hash === "#contact") {
      disableSnap();
    }

    applyMobileMode();
    updateSnap();

    return () => {
      container.removeEventListener("scroll", updateSnap);
      window.removeEventListener("resize", updateSnap);
      mobileMq.removeEventListener("change", onMobileChange);
      document.removeEventListener("click", onNavClick);
      observer?.disconnect();
    };
  }, []);

  return (
    <main id="page-scroll" ref={ref}>
      {children}
      <Footer />
    </main>
  );
}
