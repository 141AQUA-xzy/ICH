"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import DvrIcon from "@mui/icons-material/Dvr";
import { useLoading } from "../../../public/context/Loading.ctx";
import { Loading } from "../../../public/components/loader/Loading";
import toast from "react-hot-toast";
import { useCart } from "../../../public/context/Cart.ctx";
import { useUser } from "../../../public/context/Session.ctx";

const PendingApproval = () => {
    const { hideLoading, isLoading, showLoading } = useLoading();
    const { cart, cartTotal } = useCart();
    const { user } = useUser();

    useEffect(() => {
        const ExecuteOrder = async () => {
            try {
                const response = await fetch("http://192.168.43.106:5000/admin/create_order", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        cart,         // ✅ Send cart data
                        customer: user, // ✅ Send customer data
                        total: cartTotal, // ✅ Send total amount
                        payment_status: "PAID",
                        order_status: "PENDING",
                    }),
                });

                if (!response.ok) {
                    throw new Error("Failed to create order");
                }

                await response.json(); // ✅ Parse JSON response if needed
                hideLoading();
            } catch (error: unknown) {
                if (error instanceof Error) {
                    toast.error(`Order failed: ${error.message}`);
                } else {
                    toast.error("Order failed: An unknown error occurred");
                }
            }
        };

        ExecuteOrder(); // ✅ Call the function inside useEffect
    }, []); // ✅ Runs only on mount

    return isLoading ? (
        <Loading />
    ) : (
        <div className="text-white flex flex-col justify-center items-center h-dvh w-full gap-2">
            <kbd>Pending Approval</kbd>
            <Link
                onClick={showLoading} // ✅ Fix: Remove arrow function
                href="/order-bag"
                className="border bg-amber-400 rounded-2xl p-2 text-black"
            >
                <DvrIcon /> {" "} TRACK ORDERS
            </Link>
            <p>You will receive a confirmation call in a while</p>
        </div>
    );
};

export default PendingApproval;
