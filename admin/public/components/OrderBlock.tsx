import React from "react";
import CallIcon from '@mui/icons-material/Call';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import toast from "react-hot-toast";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { format, formatDistanceToNow } from "date-fns";
import { useLoading } from "../context/Loading.ctx";
import { useView } from "../context/View.ctx";

export interface CartItem {
    itemName: string;
    price: number;
    code: "LT" | "ULT" | "HF" | "FL" | "SL";
    quantity: number;
}

export interface OrderProps {
    customer: {
        username: string;
        contact: string;
        location: string;
    };
    cart: CartItem[];
    total: number;
    payment_status?: "PAID" | "POD";
    order_status?: string;
    createdAt: Date,
    _id: string
}

export const OrderBlock: React.FC<{ order: OrderProps }> = ({ order }) => {
    const { showLoading, hideLoading } = useLoading()
    const createdAt = new Date(order.createdAt);
    const now = new Date();
    const diffInDays = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
    return (
        <div className="p-4 pb-0 bg-white shadow-md rounded-lg">
            {order._id}
            <div className="flex justify-between">
                <h3 className="text-lg font-bold text-gray-800">
                    Order for: {order.customer.username}
                </h3>
                <kbd className={`rounded-lg animate-bounce px-1 ${order.order_status === "PENDING" && "bg-[#ffc6ff]"}`}>{order.order_status}</kbd>
            </div>
            <p className="text-sm text-gray-600">
                <LocationOnIcon /> {order.customer.location} | 📞 {order.customer.contact}
            </p>
            <div className="mt-2">
                {order.cart.map((item, index) => (
                    <div key={index} className="flex justify-between border-b py-1">
                        <span className="font-medium">{item.itemName}</span>
                        <span className="text-sm">[{item.code}]x<code className="text-lg">{item.quantity}</code></span>
                        <span className="font-semibold">₹{item.price * item.quantity}</span>
                    </div>
                ))}
            </div>
            <div className="mt-2 text-right">
                <p className={`text-sm ${order.payment_status === "PAID" && "text-green-600"} ${order.payment_status === "POD" && "text-red-600"}`}>
                    <EventAvailableIcon /> {order.payment_status || "Pending"}
                </p>
                <p className="font-semibold text-lg">Total: ₹{order.total}</p>
                {/* <p className="text-sm text-gray-500">{order.order_status || "Processing"}</p> */}
            </div>
            <div className="flex flex-col w-full justify-center gap-1">
                <a href={`tel:+91${order.customer.contact}`} className="bg-black text-[#FCA331] grow p-1 text-center rounded-lg"><CallIcon />VERIFY CALL</a>
                <div className="flex gap-2">
                    <button onClick={async () => {
                        showLoading()
                        try {
                            const response = await fetch("https://ich-1gjz.onrender.com/admin/set_order_status", {
                                method: "PUT",  // ✅ Use POST (or PATCH) to modify data
                                headers: {
                                    "Content-Type": "application/json",  // ✅ Tell server you're sending JSON
                                },
                                body: JSON.stringify({ orderId: order._id, status: "DECLINED" })  // ✅ Correctly send order ID
                            });

                            const data = await response.json(); // ✅ Parse response JSON
                            toast.success("Order Declined !")
                            window.location.reload()
                            hideLoading()
                            if (!response.ok) {
                                hideLoading()
                                toast.error(data.error)
                                throw new Error(data.error || "Failed to approve order");
                            }
                        } catch (error) {
                            hideLoading()
                            toast.error("Error Approving Order")
                        }
                    }} className="grow text-center rounded-lg bg-black text-red-600 p-1">DECLINE{" "}✕</button>

                    <button onClick={async () => {
                        showLoading()
                        try {
                            const response = await fetch("https://ich-1gjz.onrender.com/admin/set_order_status", {
                                method: "PUT",  // ✅ Use POST (or PATCH) to modify data
                                headers: {
                                    "Content-Type": "application/json",  // ✅ Tell server you're sending JSON
                                },
                                body: JSON.stringify({ orderId: order._id, status: "APPROVED" })  // ✅ Correctly send order ID
                            });

                            const data = await response.json(); // ✅ Parse response JSON
                            toast.success("Order Approved !")
                            window.location.reload()
                            if (!response.ok) {
                                toast.error(data.error)
                                throw new Error(data.error || "Failed to approve order");
                            }

                        } catch (error) {
                            toast.error("Error Approving Order")
                        } finally {
                            hideLoading()
                        }

                    }} className="grow text-black bg-[#95d5b2] text-center rounded-lg"><DoneOutlineIcon />APPROVE{" "}</button>
                </div>
            </div>
            <div className="flex justify-between items-center p-1">
                <search></search>
                <address className="text-sm">{diffInDays <= 7
                    ? formatDistanceToNow(createdAt, { addSuffix: true })
                    : format(createdAt, "MMM d, yyyy")}</address>
            </div>
        </div>
    );
};

export const BookBlock: React.FC<{ order: OrderProps }> = ({ order }) => {
    const createdAt = new Date(order.createdAt);
    const now = new Date();
    const diffInDays = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
            <div className="flex justify-between">
                <h3 className="text-lg font-bold text-gray-800">
                    Order for: {order.customer.username}
                </h3>
                <kbd className={`rounded-lg animate-bounce px-1 ${order.order_status === "PENDING" ? "bg-[#ffc6ff]" : order.order_status === "APPROVED" ? "bg-[#fca331]" : order.order_status === "DELIVERED" ? "bg-green-400" : order.order_status === "DECLINED" && "bg-red-500"}`}>{order.order_status}</kbd>
            </div>
            <p className="text-sm text-gray-600">
                <LocationOnIcon /> {order.customer.location} | 📞 {order.customer.contact}
            </p>
            <div className="mt-2">
                {order.cart.map((item, index) => (
                    <div key={index} className="flex justify-between border-b py-1">
                        <span className="font-medium">{item.itemName}</span>
                        <span className="text-sm">[{item.code}]x<code className="text-lg">{item.quantity}</code></span>
                        <span className="font-semibold">₹{item.price * item.quantity}</span>
                    </div>
                ))}
            </div>
            <div className="mt-2 text-right">
                <p className={`text-sm ${order.payment_status === "PAID" && "text-green-600"} ${order.payment_status === "POD" && "text-red-600"}`}>
                    <EventAvailableIcon /> {order.payment_status || "Pending"}
                </p>
                <p className="font-semibold text-lg">Total: ₹{order.total}</p>
                {/* <p className="text-sm text-gray-500">{order.order_status || "Processing"}</p> */}
            </div>
            <div className="flex flex-col w-full justify-center gap-1">
                <a href={`tel:+91${order.customer.contact}`} className="bg-black text-[#FCA331] grow p-1 text-center rounded-lg"><CallIcon />QUERY CALL</a>
            </div>
            <div className="flex justify-between">
                <div></div>
                <address className="text-sm pt-1">{diffInDays <= 7
                    ? formatDistanceToNow(createdAt, { addSuffix: true })
                    : format(createdAt, "MMM d, yyyy")}</address>
            </div>
        </div>
    );
};

export const PlacedBlock: React.FC<{ order: OrderProps }> = ({ order }) => {

    const { showLoading, hideLoading } = useLoading()
    const {setView } = useView()

    const createdAt = new Date(order.createdAt);
    const now = new Date();
    const diffInDays = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);

    return (
        <div className="p-4 pb-0 bg-white shadow-md rounded-lg">
            <div className="flex justify-between">
                <h3 className="text-lg font-bold text-gray-800">
                    Order for: {order.customer.username}
                </h3>
                <kbd className={`rounded-lg animate-bounce px-1 ${order.order_status === "APPROVED" && "bg-[#fca331]"}`}>{order.order_status}</kbd>


            </div>
            <p className="text-sm text-gray-600">
                <LocationOnIcon /> {order.customer.location} | 📞 {order.customer.contact}
            </p>
            <div className="mt-2">
                {order.cart.map((item, index) => (
                    <div key={index} className="flex justify-between border-b py-1">
                        <span className="font-medium">{item.itemName}</span>
                        <span className="text-sm">[{item.code}]x<code className="text-lg">{item.quantity}</code></span>
                        <span className="font-semibold">₹{item.price * item.quantity}</span>
                    </div>
                ))}
            </div>
            <div className="mt-2 text-right">
                <p className={`text-sm ${order.payment_status === "PAID" && "text-green-600"} ${order.payment_status === "POD" && "text-red-600"}`}>
                    <EventAvailableIcon /> {order.payment_status || "Pending"}
                </p>
                <p className="font-semibold text-lg">Total: ₹{order.total}</p>
                {/* <p className="text-sm text-gray-500">{order.order_status || "Processing"}</p> */}
            </div>
            <div className="flex flex-col w-full justify-center gap-1">
                <button onClick={async () => {
                    showLoading()
                    try {
                        const response = await fetch("https://ich-1gjz.onrender.com/admin/set_order_status", {
                            method: "PUT",  // ✅ Use POST (or PATCH) to modify data
                            headers: {
                                "Content-Type": "application/json",  // ✅ Tell server you're sending JSON
                            },
                            body: JSON.stringify({ orderId: order._id, status: "DECLINED" })  // ✅ Correctly send order ID
                        });

                        const data = await response.json(); // ✅ Parse response JSON
                        window.location.reload()
                        toast.success("Order Declined !")
                        setView("APPROVED")
                        if (!response.ok) {
                            hideLoading()
                            toast.error(data.error)
                            throw new Error(data.error || "Failed to approve order");
                        }
                    } catch (error) {
                        toast.error("Error Approving Order")
                    } finally {
                        hideLoading()
                        setView("APPROVED")
                    }

                }} className="grow text-center rounded-lg bg-red-400 text-black p-1">DECLINE{" "}</button>

                <a href={`tel:+91${order.customer.contact}`} className="bg-black text-[#FCA331] grow p-1 text-center rounded-lg"><CallIcon />DELIVERY CALL</a>
                <button onClick={async () => {
                    showLoading()
                    try {
                        const response = await fetch("https://ich-1gjz.onrender.com/admin/set_order_status", {
                            method: "PUT",  // ✅ Use POST (or PATCH) to modify data
                            headers: {
                                "Content-Type": "application/json",  // ✅ Tell server you're sending JSON
                            },
                            body: JSON.stringify({ orderId: order._id, status: "DELIVERED" })  // ✅ Correctly send order ID
                        });

                        const data = await response.json(); // ✅ Parse response JSON
                        toast.success("Order Delivered !")
                        window.location.reload()
                        hideLoading()
                        if (!response.ok) {
                            hideLoading()
                            toast.error(data.error)
                            throw new Error(data.error || "Failed to Update");
                        }
                    } catch (error) {
                        hideLoading()
                        toast.error("Error Updating Order")
                    }
                }} className="grow text-black bg-[#95d5b2] text-center rounded-lg p-1"><DoneOutlineIcon />{" "}DELIVERED</button>
            </div>
            <div className="flex justify-between items-center p-1">
                <search></search>
                <address className="text-sm">{diffInDays <= 7
                    ? formatDistanceToNow(createdAt, { addSuffix: true })
                    : format(createdAt, "MMM d, yyyy")}</address>
            </div>
        </div>
    );
};