"use client";
import React, { useEffect, useState } from "react";

const LATEST_MENU = "http://localhost:5000/admin/menu"; // ✅ Fetch latest menu
const API_URL = "http://localhost:5000/admin/menu-edit"; // ✅ Update menu endpoint

const MenuEditor: React.FC = () => {
    const [menu, setMenu] = useState<Record<string, { "price-hf"?: number | null; "price-fl": number, "AVL": boolean }>>({});
    const [loading, setLoading] = useState(true);

    // ✅ Fetch latest menu from backend
    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await fetch(LATEST_MENU);
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

                const data = await response.json();
                if (Array.isArray(data) && data.length > 0 && data[0].menu) {
                    setMenu(data[0].menu); // ✅ Extract menu correctly
                } else {
                    throw new Error("No menu found in DB.");
                }
            } catch (error) {
                console.error("❌ Error fetching menu:", error);
                alert("Failed to load menu.");
            } finally {
                setLoading(false);
            }
        };

        fetchMenu();
    }, []);

    // ✅ Handle price changes dynamically
    const handlePriceChange = (dish: string, type: "price-hf" | "price-fl", value: string) => {
        setMenu((prevMenu) => ({
            ...prevMenu,
            [dish]: {
                ...prevMenu[dish],
                [type]: value === "" ? null : Number(value),
            },
        }));
    };

    // ✅ Toggle Availability (AVL)
    const toggleAvailability = (dish: string) => {
        setMenu((prevMenu) => ({
            ...prevMenu,
            [dish]: {
                ...prevMenu[dish],
                AVL: !prevMenu[dish].AVL, // ✅ Toggle true/false
            },
        }));
    };

    // ✅ Save updated menu to backend
    const saveMenu = async () => {
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ menu }),
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            alert("✅ Menu saved successfully!");
        } catch (error) {
            console.error("❌ Error saving menu:", error);
            alert("Failed to save menu.");
        }
    };

    return (
        <div style={{ padding: "20px" }} className="bg-[#FCA331] flex flex-col items-center w-full h-auto">
            <h2 className="text-7xl w-full text-center">Edit Menu</h2>
            <div className="flex justify-around w-full text-4xl">
                <text>ITEM</text>
                <div className="w-[95vw] flex justify-around">
                    <text>PRICE[HALF/LT]</text>
                    <text>PRICE[FULL/ULT]</text>
                    <text>STATUS</text>
                </div>
            </div>
            {loading ? <p>Loading menu...</p> : (
                Object.entries(menu).map(([dish, details]) => (
                    <div key={dish} style={{ marginBottom: "10px" }} className="w-full bg-[#FCA331]">
                        <div className="flex justify-evenly items-center gap-3">
                            <h3 className="grow">{dish}</h3>
                            <div className="flex w-[80vw] justify-around">
                                <input
                                    type="number"
                                    placeholder="HF/LT Price"
                                    className="mx-2 grow border border-black rounded-2xl w-1/4 p-2"
                                    value={details["price-hf"] ?? ""}
                                    onChange={(e) => handlePriceChange(dish, "price-hf", e.target.value)}
                                />
                                <input
                                    type="number"
                                    placeholder="FL/ULT Price"
                                    className="mx-2 grow border border-black rounded-2xl w-1/4 p-2"
                                    value={details["price-fl"]}
                                    onChange={(e) => handlePriceChange(dish, "price-fl", e.target.value)}
                                />
                                <button onClick={() => toggleAvailability(dish)} className="grow">
                                    <text>Currently</text>
                                    {details.AVL ? "✅Available" : "❌Unavailable"}
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}
            <search className="flex justify-around fixed bottom-10"> 
                <div className="grow"></div>
                <button onClick={saveMenu} className={`border border-black rounded-2xl p-2 bg-black text-[#FCA331]`}>💾 Save Menu</button>
            </search>
        </div>
    );
};

export default MenuEditor;
