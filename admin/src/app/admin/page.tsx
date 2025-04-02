"use client";
import { useEffect } from "react";

const requestNotificationPermission = async () => {
    if (!("Notification" in window) || !("serviceWorker" in navigator)) return;

    const permission = await Notification.requestPermission();
    if (permission === "granted") {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: "BGBVq0HDZ04wOeCSLUabwda3FKxQwY5KCmn9-Kkmb4cTJ8WnFoSoWXOCJq9otkrzkqbAWNfk2dq82cjEhGi_NAg",
        });

        await fetch("http://192.168.43.106:5000/admin/subscribe", {
            method: "POST",
            body: JSON.stringify(subscription),
            headers: { "Content-Type": "application/json" },
        });
    }
};

export default function AdminPage() {
    useEffect(() => {
        requestNotificationPermission();
    }, []);

    return <h1 className="text-white">Admin Notifications Enabled</h1>;
}
