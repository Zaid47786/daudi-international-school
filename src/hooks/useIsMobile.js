import { useState, useEffect } from "react";

// Detect mobile devices (≤768px) without layout thrashing.
// Returns true immediately on mobile based on initial window size.
let _cached = null;

export function useIsMobile() {
  const getVal = () => {
    if (typeof window === "undefined") return false;
    return window.innerWidth <= 768;
  };

  const [isMobile, setIsMobile] = useState(() => {
    if (_cached !== null) return _cached;
    _cached = getVal();
    return _cached;
  });

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const handler = (e) => {
      _cached = e.matches;
      setIsMobile(e.matches);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isMobile;
}