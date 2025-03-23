"use client";

import { useEffect, useState } from "react";

const DownloadPage = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [isPWAInstalled, setIsPWAInstalled] = useState(false);

    useEffect(() => {
        const handleBeforeInstallPrompt = (event: any) => {
            event.preventDefault(); // Prevent auto-popup
            setDeferredPrompt(event);
        };

        const handleAppInstalled = () => {
            setIsPWAInstalled(true);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        window.addEventListener("appinstalled", handleAppInstalled);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
            window.removeEventListener("appinstalled", handleAppInstalled);
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
        <div className="flex flex-col items-center justify-center min-h-screen">
            {isPWAInstalled ? (
                <p className="text-lg text-green-500 font-bold">ICH is already installed ✅</p>
            ) : (
                <>
                    <p className="text-lg mb-4">Install our app for a better experience !</p>
                    <button
                        onClick={installPWA}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                        disabled={!deferredPrompt} // Disable if no install prompt available
                    >
                        Install ICH
                    </button>
                </>
            )}
        </div>
    );
};

export default DownloadPage;
