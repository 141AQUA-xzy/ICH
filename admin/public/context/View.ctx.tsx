"use client"
import { createContext, useContext, useState, ReactNode } from "react";

// Define the context type
interface ViewContextType {
    view: string;
    setView: (view: string) => void;
}

// Create context with default values
const ViewContext = createContext<ViewContextType | undefined>(undefined);

export function ViewProvider({ children }: { children: ReactNode }) {
    const [view, setView] = useState("PENDING"); // Default view
    return (
        <ViewContext.Provider value={{ view, setView }}>
            {children}
        </ViewContext.Provider>
    );
}

// Custom hook for easy usage
export function useView() {
    const context = useContext(ViewContext);
    if (!context) {
        throw new Error("useView must be used within a ViewProvider");
    }
    return context;
}
