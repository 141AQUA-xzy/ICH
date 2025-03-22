import { BorderAll } from "@mui/icons-material";
import React from "react";
import CallIcon from '@mui/icons-material/Call';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import toast from "react-hot-toast";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
export interface CartItem {
    itemName: string;
    price: number;
    code: "LT" | "ULT" | "HF" | "FL" | "SL";
    quantity: number;
}

export interface OrderProps {
    customer: {
        name: string;
        contact: string;
        location: string;
    };
    cart: CartItem[];
    total: number;
    payment_status?: string;
    order_status?: string;
    _id: string
}

const OrderBlock: React.FC<{ order: OrderProps }> = ({ order }) => {
    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
            <h3 className="text-lg font-bold text-gray-800">
                Order for: {order.customer.name}
            </h3>
            <p className="text-sm text-gray-600">
                📍 {order.customer.location} | 📞 {order.customer.contact}
            </p>
            <div className="mt-2">
                {order.cart.map((item, index) => (
                    <div key={index} className="flex justify-between border-b py-1">
                        <span className="font-medium">{item.itemName}-[{item.code}]</span>
                        <span className="text-sm">x{item.quantity}</span>
                        <span className="font-semibold">₹{item.price * item.quantity}</span>
                    </div>
                ))}
            </div>
            <div className="mt-2 text-right">
                <p className={`text-sm ${order.payment_status === "PAID" ? "text-green-600" : "text-red-600"}`}>
                    <EventAvailableIcon /> {order.payment_status || "Pending"}
                </p>
                <p className="font-semibold text-lg">Total: ₹{order.total}</p>
                {/* <p className="text-sm text-gray-500">{order.order_status || "Processing"}</p> */}
            </div>
            <div className="flex w-full justify-center items-center gap-1">
                <a href={`tel:+91${order.customer.contact}`} className="grow border text-center rounded-lg"><CallIcon />VERIFY CALL</a>
                <button onClick={async () => {
                    try {
                        const response = await fetch("http://192.168.43.106:5000/admin/set_order_status", {
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

                        console.log("Order Approved:", data);
                    } catch (error) {
                        toast.error("Error Approving Order")
                        console.error("Error approving order:", error);
                    }
                }} className="grow border text-center rounded-lg"><DoneOutlineIcon />APPROVED{" "}</button>
            </div>
        </div>
    );
};

export default OrderBlock;
