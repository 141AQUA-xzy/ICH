import React from 'react'
import { useCart } from '../../context/Cart.ctx';
import { SabjiData } from '../../iterables/MainCourse.iterable';
import { useMenu } from '../../context/Menu.ctx';
import toast from 'react-hot-toast';
import { MainCourse } from '../nav/menu/mainCourse/MainCourse';

export const MainCourseOverflow = () => {
    const { addToCart } = useCart()
    const { menu } = useMenu()

    function Toast() {
        toast.success("Item added to cart", {
            duration: 2000,
            style: {
                fontWeight: 600,
            },
        });
    }

    return (
        <search>
             <div className='h-max flex flex-col bg-gradient-to-r from-[rgba(20,33,61,0.3)] to-[rgba(252,163,17,0.4)] grow rounded-2xl overflow-x-scroll'>
            <text className='bg-[#FCA331] text-black sticky left-0 text-center w-full'>RICE</text>
            <div className='w-max h-full flex relative carouselX'>
                {SabjiData.filter((item) => {
                    const entry = menu[item.title];
                    return entry && entry.AVL;
                })
                    .map((item, index) => {
                        const entry = menu[item.title];
                        const price_hf = entry?.["price-hf"] ?? 0;
                        const price_fl = entry?.["price-fl"] ?? 0;

                        return (
                            <MainCourse
                                key={index}
                                img={item.img}
                                title={item.title}
                                price_hf={price_hf}
                                price_fl={price_fl}
                                hfClicked={() => {
                                    Toast()
                                    addToCart({
                                        itemName: item.title,
                                        code: "HF",
                                        quantity: 1,
                                        price: price_hf,
                                        img: item.img,
                                    })
                                }
                                }
                                ffClicked={() => {
                                    addToCart({
                                        itemName: item.title,
                                        code: "FL",
                                        quantity: 1,
                                        price: price_fl,
                                        img: item.img,
                                    })
                                    Toast()
                                }
                                }
                            />
                        );
                    })}
            </div>
        </div>
        <div className='h-max flex flex-col bg-gradient-to-r from-[rgba(20,33,61,0.3)] to-[rgba(252,163,17,0.4)] grow rounded-2xl overflow-x-scroll'>
            <text className='bg-[#FCA331] text-black sticky left-0 text-center w-full'>RICE</text>
            <div className='w-max h-full flex relative carouselX'>
                {SabjiData.filter((item) => {
                    const entry = menu[item.title];
                    return entry && entry.AVL;
                })
                    .map((item, index) => {
                        const entry = menu[item.title];
                        const price_hf = entry?.["price-hf"] ?? 0;
                        const price_fl = entry?.["price-fl"] ?? 0;

                        return (
                            <MainCourse
                                key={index}
                                img={item.img}
                                title={item.title}
                                price_hf={price_hf}
                                price_fl={price_fl}
                                hfClicked={() => {
                                    Toast()
                                    addToCart({
                                        itemName: item.title,
                                        code: "HF",
                                        quantity: 1,
                                        price: price_hf,
                                        img: item.img,
                                    })
                                }
                                }
                                ffClicked={() => {
                                    addToCart({
                                        itemName: item.title,
                                        code: "FL",
                                        quantity: 1,
                                        price: price_fl,
                                        img: item.img,
                                    })
                                    Toast()
                                }
                                }
                            />
                        );
                    })}
            </div>
        </div>
        </search>
    )
}