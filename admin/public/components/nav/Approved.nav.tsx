import React, { useEffect, useState } from 'react'
import { ICHHero } from '../ICHHero';
import { Await } from '../Await.lottie';
import { useLoading } from '../../context/Loading.ctx';
import { OrderProps, PlacedBlock } from '../OrderBlock';
import toast, { Toaster } from 'react-hot-toast';
import RefreshIcon from '@mui/icons-material/Refresh';
import CheckIcon from '@mui/icons-material/Check';
import { fonts } from '../../assets/fonts/Fonts';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import { QRCodeCanvas } from 'qrcode.react';
export const Approved = () => {
    const [orders, setOrder] = useState<OrderProps[]>([]);
    const { showLoading, hideLoading } = useLoading()

    useEffect(() => {
        showLoading()
        const fetchOrders = async () => {
            try {
                const response = await fetch("https://ich-1gjz.onrender.com/admin/stated_order", {
                    method: "POST", // ✅ Use POST if sending user details
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ order_status: "APPROVED" })
                });

                if (!response.ok) {
                    toast.error("Failed to fetch orders")
                    throw new Error("Failed to fetch orders");
                }

                const data = await response.json();
                setOrder(data.orders);
                hideLoading()
            } catch (error: unknown) {
                if (error instanceof Error) {
                    toast.error(`Error fetching orders: ${error.message}`);
                } else {
                    toast.error("Error fetching orders: Unknown error");
                }
            }
        };
        fetchOrders();
    }, []); // ✅ Runs once on component mount

    return (
        <search className={`px-1 bg-gradient-to-t from-[rgba(20,33,61,0.3)] to-[rgba(252,163,17,0.4)] w-full`}>
            <ICHHero />
            <h1 className={`${fonts.dancingScript} text-center w-full h-max p-2 text-2xl bg-[#FCA331] rounded-lg`}>APPROVED ORDERS{" "}<DeliveryDiningIcon style={{ color: "black" }} className='animate animate-bounce' /></h1>
            <div className={`${orders.length === 0 && "overflow-hidden"} mt-1 h-[76vh] w-full border p-1 rounded-lg overflow-x-auto text-black pb-20 ${orders.length === 0 && "pb-0"}`}>
                {orders.length === 0 && <div className="h-dvh w-full bg-inherit text-white flex flex-col items-center">
                    <Await />
                </div>}
                {/* {JSON.stringify(orders)} */}
                <div className="bg-transparent h-auto w-full flex flex-col gap-2">
                    {orders.map((item, index) => (
                        <PlacedBlock order={item} key={index} />
                    ))}

                </div>
            </div>
            <search className="" onClick={() => {
                toast("Updating Orders...", {
                    duration: 4000,
                    style: {
                        background: "#FCA331",
                        color: "black",
                        fontWeight: "bold",
                        boxShadow: "0px 0px 50px 0px #FCA331"
                    },
                });
                window.location.reload()
            }}>
                <RefreshIcon className="bg-black rounded-full fixed right-5 bottom-12 cursor-pointer transition-transform duration-200 hover:scale-125 border-2 border-amber-400"
                    sx={{ color: "orange", fontSize: "2rem" }} />
            </search>
            <Toaster position="bottom-center" reverseOrder={false} />
        </search>
    )
}
