"use client";

import React, { useEffect } from "react";
import { useCart } from "../../context/Cart.ctx";
import { MainCourseSabjiData, RaitaTitles, RotiParathaTitles, SaladTitles } from "../../iterables/MainCourse.iterable";
import { useMenu } from "../../context/Menu.ctx";
import toast from "react-hot-toast";
import { MainCourseCard } from "../nav/menu/mainCourse/MainCourse";
import { chineseStarterMenuTitles, pastaMenuTitles, wokChineseMenuTitles } from "../../iterables/FusionBites";

export const MainCourseOverflow = () => {
    const { addToCart } = useCart();
    const { menu } = useMenu();

    function Toast() {
        toast.success("Item added to cart", {
            duration: 2000,
            style: {
                fontWeight: 600,
            },
        });
    }

    useEffect(() => {
        console.log("Menu loaded:", menu);
    }, [menu]);

    // Ensure menu is loaded before rendering
    if (!menu || Object.keys(menu).length === 0) {
        return <p className="text-white text-center p-4 h-dvh w-full bg-[#FCA331]">Loading menu...</p>;
    }

    return (
        <section className="overflow-hidden shadow-sm shadow-amber-300 flex flex-col gap-3">
            <div className="flex flex-col gap-2 h-[30vh] w-dvw overflow-scroll pb-1">
                <text className='bg-[#FCA331] text-black sticky top-0 z-10 text-center w-full rounded-t-lg'>SABJI</text>
                {MainCourseSabjiData.map((item) => {
                    const matchedKey = Object.keys(menu).find(
                        (key) => key.toLowerCase().trim() === item.toLowerCase().trim()
                    );

                    if (!matchedKey) {
                        return null;
                    }

                    const itemData = menu[matchedKey];
                    if (!itemData.AVL) return null; // Skip if not available

                    return (
                        <MainCourseCard
                            key={item}
                            title={matchedKey}
                            hfClicked={() => {
                                addToCart({
                                    itemName: item,
                                    code: "HF",
                                    quantity: 1,
                                    price: itemData["price-hf"] ?? 0,
                                    img: "/assets/emp.png",
                                })
                                Toast()
                            }
                            }
                            ffClicked={() => {
                                addToCart({
                                    itemName: item,
                                    code: "FL",
                                    quantity: 1,
                                    price: itemData["price-fl"],
                                    img: "/assets/emp.png",
                                })
                                Toast()
                            }
                            }
                        />
                    );
                })}
            </div>
            <div className="flex flex-col gap-2 h-[30vh] w-dvw overflow-scroll pb-1">
                <text className='bg-[#FCA331] text-black sticky top-0 z-10 text-center w-full rounded-t-lg'>ROTI/PARATHA</text>
                {RotiParathaTitles.map((item) => {
                    const matchedKey = Object.keys(menu).find(
                        (key) => key.toLowerCase().trim() === item.toLowerCase().trim()
                    );

                    if (!matchedKey) {
                        return null;
                    }

                    const itemData = menu[matchedKey];
                    if (!itemData.AVL) return null; // Skip if not available

                    return (
                        <MainCourseCard
                            key={item}
                            title={matchedKey}
                            hfClicked={() => {
                                addToCart({
                                    itemName: item,
                                    code: "HF",
                                    quantity: 1,
                                    price: itemData["price-hf"] ?? 0,
                                    img: "/assets/emp.png",
                                })
                                Toast()
                            }
                            }
                            ffClicked={() => {
                                addToCart({
                                    itemName: item,
                                    code: "FL",
                                    quantity: 1,
                                    price: itemData["price-fl"],
                                    img: "/assets/emp.png",
                                })
                                Toast()
                            }
                            }
                        />
                    );
                })}
            </div>
            <div className="flex flex-col gap-2 h-max max-h-[30vh] w-dvw overflow-scroll pb-1">
                <text className='bg-[#FCA331] text-black sticky top-0 z-10 text-center w-full rounded-t-lg'>RAITA</text>
                {RaitaTitles.map((item) => {
                    const matchedKey = Object.keys(menu).find(
                        (key) => key.toLowerCase().trim() === item.toLowerCase().trim()
                    );

                    if (!matchedKey) {
                        return null;
                    }

                    const itemData = menu[matchedKey];
                    if (!itemData.AVL) return null; // Skip if not available

                    return (
                        <MainCourseCard
                            key={item}
                            title={matchedKey}
                            hfClicked={() => {
                                addToCart({
                                    itemName: item,
                                    code: "HF",
                                    quantity: 1,
                                    price: itemData["price-hf"] ?? 0,
                                    img: "/assets/emp.png",
                                })
                                Toast()
                            }
                            }
                            ffClicked={() => {
                                addToCart({
                                    itemName: item,
                                    code: "FL",
                                    quantity: 1,
                                    price: itemData["price-fl"],
                                    img: "/assets/emp.png",
                                })
                                Toast()
                            }
                            }
                        />
                    );
                })}
            </div>
            <div className="flex flex-col gap-2 h-max w-dvw overflow-scroll pb-1">
                <text className='bg-[#FCA331] text-black sticky top-0 z-10 text-center w-full rounded-t-lg'>SALAD</text>
                {SaladTitles.map((item) => {
                    const matchedKey = Object.keys(menu).find(
                        (key) => key.toLowerCase().trim() === item.toLowerCase().trim()
                    );

                    if (!matchedKey) {
                        return null;
                    }

                    const itemData = menu[matchedKey];
                    if (!itemData.AVL) return null; // Skip if not available

                    return (
                        <MainCourseCard
                            key={item}
                            title={matchedKey}
                            hfClicked={() => {
                                addToCart({
                                    itemName: item,
                                    code: "HF",
                                    quantity: 1,
                                    price: itemData["price-hf"] ?? 0,
                                    img: "/assets/emp.png",
                                })
                                Toast()
                            }
                            }
                            ffClicked={() => {
                                addToCart({
                                    itemName: item,
                                    code: "FL",
                                    quantity: 1,
                                    price: itemData["price-fl"],
                                    img: "/assets/emp.png",
                                })
                                Toast()
                            }
                            }
                        />
                    );
                })}
            </div>
        </section>
    );
};

export const FusionBitesOverflow = () => {
    const { addToCart } = useCart();
    const { menu } = useMenu();

    function Toast() {
        toast.success("Item added to cart", {
            duration: 2000,
            style: {
                fontWeight: 600,
            },
        });
    }

    useEffect(() => {
        console.log("Menu loaded:", menu);
    }, [menu]);

    // Ensure menu is loaded before rendering
    if (!menu || Object.keys(menu).length === 0) {
        return <p className="text-white text-center p-4 h-dvh w-full bg-[#FCA331]">Loading menu...</p>;
    }

    return (
        <section className="overflow-hidden shadow-sm shadow-amber-300 flex flex-col gap-3">
            <div className="flex flex-col gap-2 h-[30vh] w-dvw overflow-scroll pb-1">
                <text className='bg-[#FCA331] text-black sticky top-0 z-10 text-center w-full rounded-t-lg'>WOK CHINESE</text>
                {wokChineseMenuTitles.map((item) => {
                    const matchedKey = Object.keys(menu).find(
                        (key) => key.toLowerCase().trim() === item.toLowerCase().trim()
                    );

                    if (!matchedKey) {
                        return null;
                    }

                    const itemData = menu[matchedKey];
                    if (!itemData.AVL) return null; // Skip if not available

                    return (
                        <MainCourseCard
                            key={item}
                            title={matchedKey}
                            hfClicked={() => {
                                addToCart({
                                    itemName: item,
                                    code: "HF",
                                    quantity: 1,
                                    price: itemData["price-hf"] ?? 0,
                                    img: "/assets/emp.png",
                                })
                                Toast()
                            }
                            }
                            ffClicked={() => {
                                addToCart({
                                    itemName: item,
                                    code: "FL",
                                    quantity: 1,
                                    price: itemData["price-fl"],
                                    img: "/assets/emp.png",
                                })
                                Toast()
                            }
                            }
                        />
                    );
                })}
            </div>
            <div className="flex flex-col gap-2 h-max w-dvw overflow-scroll pb-1 mx-2">
                <text className='bg-[#FCA331] text-black sticky top-0 z-10 text-center w-full rounded-t-lg'>PASTA</text>
                {pastaMenuTitles.map((item) => {
                    const matchedKey = Object.keys(menu).find(
                        (key) => key.toLowerCase().trim() === item.toLowerCase().trim()
                    );

                    if (!matchedKey) {
                        return null;
                    }

                    const itemData = menu[matchedKey];
                    if (!itemData.AVL) return null; // Skip if not available

                    return (
                        <MainCourseCard
                            key={item}
                            title={matchedKey}
                            hfClicked={() => {
                                addToCart({
                                    itemName: item,
                                    code: "HF",
                                    quantity: 1,
                                    price: itemData["price-hf"] ?? 0,
                                    img: "/assets/emp.png",
                                })
                                Toast()
                            }
                            }
                            ffClicked={() => {
                                addToCart({
                                    itemName: item,
                                    code: "FL",
                                    quantity: 1,
                                    price: itemData["price-fl"],
                                    img: "/assets/emp.png",
                                })
                                Toast()
                            }
                            }
                        />
                    );
                })}
            </div>
            <div className="flex flex-col gap-2 h-max max-h-[30vh] w-dvw overflow-scroll pb-1">
                <text className='bg-[#FCA331] text-black sticky top-0 z-10 text-center w-full rounded-t-lg'>CHINESE STARTER</text>
                {chineseStarterMenuTitles.map((item) => {
                    const matchedKey = Object.keys(menu).find(
                        (key) => key.toLowerCase().trim() === item.toLowerCase().trim()
                    );

                    if (!matchedKey) {
                        return null;
                    }

                    const itemData = menu[matchedKey];
                    if (!itemData.AVL) return null; // Skip if not available

                    return (
                        <MainCourseCard
                            key={item}
                            title={matchedKey}
                            hfClicked={() => {
                                addToCart({
                                    itemName: item,
                                    code: "HF",
                                    quantity: 1,
                                    price: itemData["price-hf"] ?? 0,
                                    img: "/assets/emp.png",
                                })
                                Toast()
                            }
                            }
                            ffClicked={() => {
                                addToCart({
                                    itemName: item,
                                    code: "FL",
                                    quantity: 1,
                                    price: itemData["price-fl"],
                                    img: "/assets/emp.png",
                                })
                                Toast()
                            }
                            }
                        />
                    );
                })}
            </div>
        </section>
    );
};