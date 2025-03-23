"use client";

import { useEffect } from "react";

export default function PWARegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/service-worker.js")
          .then((reg) => console.log("✅ Service Worker registered:", reg))
          .catch((err) => console.log("❌ Service Worker registration failed:", err));
      });
    }
  }, []);

  return null; // No UI needed, just runs the effect
}
