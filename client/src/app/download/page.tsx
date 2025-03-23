"use client";

import { useEffect, useState } from "react";

const DownloadPage = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isPWAInstalled, setIsPWAInstalled] = useState(false);

  useEffect(() => {
    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (event: any) => {
      event.preventDefault(); // Prevent auto-popup
      setDeferredPrompt(event);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Detect if PWA is already installed
    window.addEventListener("appinstalled", () => {
      setIsPWAInstalled(true);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", () => setIsPWAInstalled(true));
    };
  }, []);

  // Function to trigger PWA installation
  const installPWA = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Show install prompt
      deferredPrompt.userChoice.then((choice: any) => {
        if (choice.outcome === "accepted") {
          console.log("User installed the app");
        } else {
          console.log("User dismissed the installation");
        }
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-3xl font-bold">Install Our PWA</h1>
      <p className="text-gray-600 mt-2">Get the best experience by installing our app.</p>

      {isPWAInstalled ? (
        <p className="mt-4 text-green-600">✅ PWA is already installed</p>
      ) : deferredPrompt ? (
        <button
          onClick={installPWA}
          className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700"
        >
          Install App
        </button>
      ) : (
        <p className="mt-4 text-red-500">❌ PWA installation is not supported on this device.</p>
      )}
    </div>
  );
};

export default DownloadPage;

