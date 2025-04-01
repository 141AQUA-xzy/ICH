"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

// API URLs
const LATEST_MENU = "http://localhost:5000/admin/menu"; // For fetching latest menu

// Context Type
interface MenuContextType {
    menu: Record<string, { "price-hf"?: number | null; "price-fl": number; "AVL": boolean }>;
}

// Create Context
const MenuContext = createContext<MenuContextType | undefined>(undefined);

// Provider Component
export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [menu, setMenu] = useState<Record<string, { "price-hf"?: number | null; "price-fl": number; "AVL": boolean }>>({});

    // Fetch Menu on Mount
    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await fetch(LATEST_MENU);
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

                const data = await response.json();
                if (data.length > 0 && data[0].menu) {
                    setMenu(data[0].menu);
                }
            } catch (error) {
                console.error("❌ Error fetching menu:", error);
            } finally {
            }
        };

        fetchMenu();
    }, []);

    // Update Price

    // Toggle Availability

    // Save Menu to Backend (Optimistic Update)


    return (
        <MenuContext.Provider value={{ menu }}>
            {children}
        </MenuContext.Provider>
    );
};

// Custom Hook to Use Context
export const useMenu = () => {
    const context = useContext(MenuContext);
    if (!context) {
        throw new Error("useMenu must be used within a MenuProvider");
    }
    return context;
};
