"use client";
import React, { useEffect, useState } from "react";
import { fonts } from "../../assets/fonts/Fonts";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useLoading } from "../../context/Loading.ctx";
const LATEST_MENU = "https://restaurant-apis-za52.onrender.com/admin/menu";
const API_URL = "https://restaurant-apis-za52.onrender.com/admin/menu-edit";

const MenuEditor: React.FC = () => {

    const [menu, setMenu] = useState<Record<string, { "price-hf"?: number | null; "price-fl": number, "AVL": boolean }>>({});
    const [loading, setLoading] = useState(true);
    const { showLoading, hideLoading } = useLoading()

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await fetch(LATEST_MENU);
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

                const data = await response.json();
                if (Array.isArray(data) && data.length > 0 && data[0].menu) {
                    setMenu(data[0].menu);
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

    const handlePriceChange = (dish: string, type: "price-hf" | "price-fl", value: string) => {
        setMenu((prevMenu) => ({
            ...prevMenu,
            [dish]: {
                ...prevMenu[dish],
                [type]: value === "" ? null : Number(value),
            },
        }));
    };

    const toggleAvailability = (dish: string) => {
        setMenu((prevMenu) => ({
            ...prevMenu,
            [dish]: {
                ...prevMenu[dish],
                AVL: !prevMenu[dish].AVL,
            },
        }));
    };

    const saveMenu = async () => {
        showLoading()
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
        } finally {
            hideLoading()
        }
    };

    return (
        <search className="h-dvh w-full bg-[#FCA331]">
            <div className="p-4 bg-[#FCA331] flex flex-col w-dvw pb-20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-lg md:text-2xl font-semibold text-center sticky top-5">
                    <h1 className={`${fonts.dancingScript} text-2xl w-full bg-black text-[#FCA331] rounded-2xl p-1`}><AppRegistrationIcon className="animate-bounce" />{" "}MENU CARD-<code className="text-sm">{Object.keys(menu).length}</code></h1>
                </div>

                {loading ? (
                    <p className="text-center mt-4 text-xl font-semibold">Loading menu...</p>
                ) : (
                    Object.entries(menu).map(([dish, details]) => (
                        <div key={dish} className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 border-b py-2">
                            <div className="flex justify-between">
                                <div></div>
                                <h3 className={`${fonts.cinzel} text-[#000000] w-max bg-gradient-to-t from-[rgba(20,33,61,0.3)] to-[rgba(252,163,17,0.4)] text-lg md:text-xl font-semibold p-1 rounded-lg`}>{dish}</h3>
                            </div>
                            <div className="flex items-center gap-1">
                                <code className="bg-black text-[#FCA331] w-max rounded-lg text-sm p-2">HF/LT</code>
                                <input
                                    type="number"
                                    className="p-2 border rounded-md text-center grow"
                                    placeholder="HF/LT Price"
                                    value={details["price-hf"] ?? ""}
                                    onChange={(e) => handlePriceChange(dish, "price-hf", e.target.value)}
                                />
                            </div>
                            <div className="flex items-center gap-1">
                                <code className="bg-black text-[#FCA331] w-max rounded-lg text-sm p-2">FL/ULT</code>
                                <input
                                    type="number"
                                    className={`p-2 border rounded-md text-center grow ${fonts.exo2}`}
                                    placeholder="FL/ULT Price"
                                    value={details["price-fl"]}
                                    onChange={(e) => handlePriceChange(dish, "price-fl", e.target.value)}
                                />
                            </div>

                            <button onClick={() => toggleAvailability(dish)} className={`p-2 rounded-md bg-black ${fonts.changa} ${details.AVL ? "text-green-300" : "text-red-500"}`}>
                                {details.AVL ? "AVAILABLE ✓" : "UNAVAILABLE ✕"}
                            </button>
                        </div>
                    ))
                )}
                <div className="fixed bottom-5 left-0 w-full flex justify-center">
                    <button onClick={saveMenu} className="p-3 text-lg font-semibold rounded-lg bg-black text-[#FCA331] shadow-lg">
                        💾 Save Menu
                    </button>
                </div>
            </div>
        </search>
    );
};

export default MenuEditor;











// "use client";
// import React, { useEffect, useState } from "react";

// const LATEST_MENU = "https://restaurant-apis-za52.onrender.com/admin/menu"; // ✅ Fetch latest menu
// const API_URL = "https://restaurant-apis-za52.onrender.com/admin/menu-edit"; // ✅ Update menu endpoint

// const MenuEditor: React.FC = () => {
//     const [menu, setMenu] = useState<Record<string, { "price-hf"?: number | null; "price-fl": number, "AVL": boolean }>>({});
//     const [loading, setLoading] = useState(true);

//     // ✅ Fetch latest menu from backend
//     useEffect(() => {
//         const fetchMenu = async () => {
//             try {
//                 const response = await fetch(LATEST_MENU);
//                 if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//                 const data = await response.json();
//                 if (Array.isArray(data) && data.length > 0 && data[0].menu) {
//                     setMenu(data[0].menu); // ✅ Extract menu correctly
//                 } else {
//                     throw new Error("No menu found in DB.");
//                 }
//             } catch (error) {
//                 console.error("❌ Error fetching menu:", error);
//                 alert("Failed to load menu.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchMenu();
//     }, []);

//     // ✅ Handle price changes dynamically
//     const handlePriceChange = (dish: string, type: "price-hf" | "price-fl", value: string) => {
//         setMenu((prevMenu) => ({
//             ...prevMenu,
//             [dish]: {
//                 ...prevMenu[dish],
//                 [type]: value === "" ? null : Number(value),
//             },
//         }));
//     };

//     // ✅ Toggle Availability (AVL)
//     const toggleAvailability = (dish: string) => {
//         setMenu((prevMenu) => ({
//             ...prevMenu,
//             [dish]: {
//                 ...prevMenu[dish],
//                 AVL: !prevMenu[dish].AVL, // ✅ Toggle true/false
//             },
//         }));
//     };

//     // ✅ Save updated menu to backend
//     const saveMenu = async () => {
//         try {
//             const response = await fetch(API_URL, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ menu }),
//             });

//             if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//             alert("✅ Menu saved successfully!");
//         } catch (error) {
//             console.error("❌ Error saving menu:", error);
//             alert("Failed to save menu.");
//         }
//     };

//     return (
//         <div style={{ padding: "20px" }} className="bg-[#FCA331] flex flex-col w-[100vw] h-dvh overscroll-auto">
//             <h2 className="text-7xl w-full text-center">Edit Menu</h2>
//             <div className="flex justify-around w-full text-4xl">
//                 <text>ITEM</text>
//                 <div className="w-[95vw] flex justify-around">
//                     <text>PRICE[HALF/LT]</text>
//                     <text>PRICE[FULL/ULT]</text>
//                     <text>STATUS</text>
//                 </div>
//             </div>
//             {loading ? <p>Loading menu...</p> : (
//                 Object.entries(menu).map(([dish, details]) => (
//                     <div key={dish} style={{ marginBottom: "10px" }} className="w-full bg-[#FCA331]">
//                         <div className="flex gap-3">
//                             <h3 className="grow">{dish}</h3>
//                             <div className="flex w-[80vw] justify-around items-center">
//                                 <input
//                                     type="number"
//                                     placeholder="HF/LT Price"
//                                     className="mx-2 grow border border-black rounded-2xl w-[100px] p-2"
//                                     value={details["price-hf"] ?? ""}
//                                     onChange={(e) => handlePriceChange(dish, "price-hf", e.target.value)}
//                                 />
//                                 <input
//                                     type="number"
//                                     placeholder="FL/ULT Price"
//                                     className=" mx-2 grow border border-black rounded-2xl w-[100px] p-2"
//                                     value={details["price-fl"]}
//                                     onChange={(e) => handlePriceChange(dish, "price-fl", e.target.value)}
//                                 />
//                                 <button onClick={() => toggleAvailability(dish)} className="grow">
//                                     <text>Currently</text>
//                                     {details.AVL ? "✅Available" : "❌Unavailable"}
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 ))
//             )}
//             <search className="flex justify-around fixed bottom-10">
//                 <div className="grow"></div>
//                 <button onClick={saveMenu} className={`border border-black rounded-2xl p-2 bg-black text-[#FCA331]`}>💾 Save Menu</button>
//             </search>
//         </div>
//     );
// };

// export default MenuEditor;