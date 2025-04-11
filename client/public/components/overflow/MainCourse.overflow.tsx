"use client";

import React, { useEffect } from "react";
import { useCart } from "../../context/Cart.ctx";
import { MainCourseSabjiData } from "../../iterables/MainCourse.iterable";
import { useMenu } from "../../context/Menu.ctx";
import toast from "react-hot-toast";
import { MainCourseCard } from "../nav/menu/mainCourse/MainCourse";

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
        <section>
            <div className="flex flex-col gap-2 h-dvh w-full overflow-scroll">
                <text className='bg-[#FCA331] text-black sticky top-0 z-50 text-center w-full rounded-t-lg'>SABJI</text>
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
                                    img: "/assets/chef.png",
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
                                    img: "/assets/chef.png",
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
