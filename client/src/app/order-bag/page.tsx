"use client";
import { useEffect, useState } from "react";
import { useUser } from "../../../public/context/Session.ctx";
import Link from "next/link";
import { useLoading } from "../../../public/context/Loading.ctx";
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import { fonts } from "../../../public/fonts/Next.fonts";
import CallIcon from '@mui/icons-material/Call';
import toast, { Toaster } from "react-hot-toast";
import { Loading } from "../../../public/components/loader/Loading";
import HomeIcon from '@mui/icons-material/Home';
import { useRouter } from "next/navigation";

type CartItem = {
  _id: string;
  itemName: string;
  price: number;
  code: string;
  quantity: number;
};

type Customer = {
  _id: string;
  username: string;
  contact: string;
  location: string;
};

type Order = {
  _id: string;
  cart: CartItem[];
  total: number;
  payment_status: string;
  order_status: string;
  customer: Customer;
  createdAt: string;
  updatedAt: string;
};

const MyOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { user } = useUser();
  const { hideLoading, showLoading, isLoading } = useLoading()

  useEffect(() => {
    if (!user?._id) return;

    const fetchOrders = async () => {
      showLoading()
      try {
        const response = await fetch("http://192.168.43.106:5000/client/myOrders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id: user._id }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrders(data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        hideLoading()
      }
    };

    fetchOrders();
  }, [user]);

const router = useRouter()

  return (
    <div className="p-4 md:p-8 pb-5 h-dvh bg-gradient-to-b from-[rgba(20,33,61,0.3)] to-[rgba(252,163,17,0.4)]">
      {isLoading && <Loading />}
      <h2 className={`${fonts.pressStart2P} text-2xl md:text-3xl font-bold text-black mb-6 text-center rounded-lg bg-[#FCA331] p-2 sticky top-0.5`}><Link href={"/"} onClick={() => showLoading()} className=""><HomeIcon className="mx-2 border rounded-lg" /></Link>My Orders{" "} <DeliveryDiningIcon className="animate-pulse" /></h2>
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <p className="text-white mb-4">No orders found.</p>
          <Link href="/" className="bg-amber-400 text-black px-4 py-2 rounded-lg" onClick={() => {showLoading()
            router.push("/")
          }}>Go Back</Link>
        </div>
      ) : (
        <div className="space-y-2 overflow-auto pb-5">
          {orders.map((order, index) => (
            <div key={order._id} className="bg-white shadow-md rounded-xl p-4">
              <div className="mb-2 flex justify-between items-center">
                <h3 className={`text-xl font-semibold text-gray-800 ${fonts.dancingScript}`}>ORDER #{index + 1}</h3>
                <span className={`text-sm px-3 py-1 rounded-full ${order.order_status === 'APPROVED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {order.order_status}
                </span>
              </div>
              <div className="text-sm text-gray-600 mb-2">
                Placed on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
              </div>
              <div className="divide-y divide-red-200">
                {order.cart.map(item => (
                  <div key={item._id} className="py-2 flex justify-between text-gray-700">
                    <span>{item.itemName} (x{item.quantity})</span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex justify-between font-semibold text-gray-800">
                <span>Total:</span>
                <span>₹{order.total}</span>
              </div>
              <div className="flex justify-between pt-1">
                <div className="mt-2 text-sm text-gray-500">Payment Mode: <code className={`${order.payment_status === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'} p-1 rounded-lg`}>{order.payment_status}</code></div>
              </div>
              <button onClick={async () => {
                showLoading()
                try {
                  const res = await fetch("http://192.168.43.106:5000/client/deleteOrder", {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ _id: order._id }),
                  });
                  const data = await res.json()
                  if (res.ok) {
                    window.location.reload()
                    toast.success(`${data.message}`)
                  }
                } catch (error) {
                  window.location.reload()
                  toast.error("Operation cannot be performed")
                } finally {
                  hideLoading()
                }
              }} className={`${fonts.permanentMarker} w-full h-max p-1 bg-amber-300 mt-3 rounded-lg`}>CANCEL ORDER</button>
            </div>
          ))}
          <div className="fixed right-8 bottom-10">
            <div className="relative flex justify-center items-center">
              <a href="tel:+918770025814" className="absolute animate-ping text-center text-[#FCA331] p-2 rounded-full bg-black grow w-full h-full">
              </a>
              <CallIcon className="text-[#FCA331] bg-black rounded-full" style={{ fontSize: "3rem", padding: "1rem" }} />
            </div>
          </div>
        </div>
      )}
      <Toaster position="bottom-center" />
    </div>
  );
};

export default MyOrders;
