"use client";

import { useState, useEffect } from "react";

export default function DownloadPage() {
  const [downloadAvailable, setDownloadAvailable] = useState<boolean>(false);

  // Fix fetch function type
  const checkForUpdate = async (): Promise<{ version: string } | null> => {
    try {
      const response = await fetch("/api/version");
      if (!response.ok) throw new Error("Failed to fetch version");
      return (await response.json()) as { version: string };
    } catch (error) {
      console.error("Error fetching version:", error);
      return null;
    }
  };

  useEffect(() => {
    checkForUpdate().then((data) => {
      if (data) setDownloadAvailable(true);
    });
  }, []);

  // Fix event type
  const handleDownload = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    window.location.href = "/download/app.apk";
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Download My PWA</h1>
      {downloadAvailable ? (
        <button
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded"
          onClick={handleDownload}
        >
          Download App
        </button>
      ) : (
        <p className="text-gray-500">Checking for updates...</p>
      )}
    </div>
  );
}
