"use client";

import { useState, useEffect } from "react";

export default function DownloadPage() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (installPrompt) {
      await installPrompt.prompt();
      const choice = await installPrompt.userChoice;
      if (choice.outcome === "accepted") {
        console.log("PWA installed");
        setIsInstalled(true);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Install ICH</h1>

      {isInstalled ? (
        <p className="text-green-500">App is already installed!</p>
      ) : installPrompt ? (
        <button
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded"
          onClick={handleInstall}
        >
          Install App
        </button>
      ) : (
        <p className="text-gray-500">App installation not available</p>
      )}
    </div>
  );
}
