"use client"
import { useEffect, useState } from "react";
import { useUser } from "../../../public/context/Session.ctx";
import Link from "next/link";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const { user } = useUser()
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch("http://192.168.43.106:5000/client/myOrders", {
                    method: "POST", // ✅ Ensure correct HTTP method
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ customer: user }),
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch orders");
                }

                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h2 className="text-white">My Orders</h2>
            {orders.length === 0 ? (
                <div className="h-dvh w-full flex flex-col items-center justify-center">
                <p className="text-white">No orders found.</p>
                <Link href="/" className="bg-amber-400 rounded-2xl text-black p-2">GO BACK</Link>
                </div>
            ) : (
                <div className="w-full bg-amber-400">
                    {orders.map((order, index) => (
                        <text key={index} className="text-white p-2 rounded-2xl my-2 w-full text-wrap">
                            Order #{index + 1}: {JSON.stringify(order)}
                        </text>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrders;
