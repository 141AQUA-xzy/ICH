"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
    prompt: () => void;
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DownloadPage = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [isPWAInstalled, setIsPWAInstalled] = useState(false);

    useEffect(() => {
        const handleBeforeInstallPrompt = (event: BeforeInstallPromptEvent) => {
            event.preventDefault(); // Prevent auto-popup
            setDeferredPrompt(event);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        window.addEventListener("appinstalled", () => {
            setIsPWAInstalled(true);
            setDeferredPrompt(null);
        });

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
            window.removeEventListener("appinstalled", () => setIsPWAInstalled(true));
        };
    }, []);

    // Function to trigger PWA installation
    const installPWA = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choice) => {
                setDeferredPrompt(null);
                if (choice.outcome === "accepted") {
                    console.log("User installed the app");
                } else {
                    console.log("User dismissed the installation");
                }
            });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h1 className="text-2xl font-bold mb-4">Install ICH</h1>

            {isPWAInstalled ? (
                <p className="text-green-400">✅ ICH is already installed!</p>
            ) : deferredPrompt ? (
                <button
                    onClick={installPWA}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                >
                    Install App
                </button>
            ) : (
                <p className="text-gray-400">Installation is not available</p>
            )}
        </div>
    );
};

export default DownloadPage;



// "use client";

// import { useState, useEffect } from "react";

// // Define BeforeInstallPromptEvent manually
// interface BeforeInstallPromptEvent extends Event {
//   prompt: () => Promise<void>;
//   userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
// }

// export default function DownloadPage() {
//   const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
//   const [isInstalled, setIsInstalled] = useState<boolean>(false);

//   useEffect(() => {
//     const handleBeforeInstallPrompt = (event: Event) => {
//       event.preventDefault();
//       setInstallPrompt(event as BeforeInstallPromptEvent);
//     };

//     window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    
//     return () => {
//       window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
//     };
//   }, []);

//   const handleInstall = async () => {
//     if (installPrompt) {
//       await installPrompt.prompt();
//       const choice = await installPrompt.userChoice;
//       if (choice.outcome === "accepted") {
//         console.log("PWA installed");
//         setIsInstalled(true);
//       }
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <h1 className="text-2xl font-bold">Install My PWA</h1>

//       {isInstalled ? (
//         <p className="text-green-500">App is already installed!</p>
//       ) : installPrompt ? (
//         <button
//           className="mt-4 px-6 py-2 bg-blue-500 text-white rounded"
//           onClick={handleInstall}
//         >
//           Install App
//         </button>
//       ) : (
//         <p className="text-gray-500">App installation not available</p>
//       )}
//     </div>
//   );
// }
