"use client";

import { useEffect, useState } from "react";
import { ICHSvg } from "../../../public/components/ICHHero";

// Define BeforeInstallPromptEvent properly
interface BeforeInstallPromptEvent extends Event {
    prompt: () => void;
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DownloadPage = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [isPWAInstalled, setIsPWAInstalled] = useState(false);

    useEffect(() => {
        const handleBeforeInstallPrompt = (event: Event) => {
            event.preventDefault();
            setDeferredPrompt(event as BeforeInstallPromptEvent); // Cast to correct type
        };
    
        const handleAppInstalled = () => {
            setIsPWAInstalled(true);
            setDeferredPrompt(null);
        };
    
        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt as EventListener);
        window.addEventListener("appinstalled", handleAppInstalled as EventListener);
    
        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt as EventListener);
            window.removeEventListener("appinstalled", handleAppInstalled as EventListener);
        };
    }, []);
    

    // Function to trigger PWA installation
    const installPWA = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choice) => {
                setDeferredPrompt(null);
                console.log(choice.outcome === "accepted" ? "User installed the app" : "User dismissed the installation");
            });
        }
    };

    return (
        <div className="flex flex-col items-center justify-around min-h-screen bg-gray-900 text-white">
        <img src="/assets/emp.png" className="relative w-full h-64 p-0 object-scale-down bg-center"></img>
        <h1 className="text-3xl text-center font-bold mb-4 duration-2000 p-2 bg-gradient-to-b from-[rgba(20,33,61,0.3)] to-[rgba(252,163,17,0.7)] bg-clip-text text-transparent underline">"Indian Curry House-Admin"</h1>
        {isPWAInstalled ? (
            <p className="text-green-400">✅ ICH is already installed!</p>
        ) : deferredPrompt ? (
            <button
                onClick={installPWA}
                className="px-4 py-2 bg-[#FCA331] text-black transform hover:scale-x-120 rounded-lg"
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