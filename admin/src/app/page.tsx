"use client"
import { useEffect, useState } from "react";
// import { io } from "socket.io-client";
import { ICHHero } from "../../public/components/ICHHero";
import RefreshIcon from '@mui/icons-material/Refresh';
import toast, { Toaster } from "react-hot-toast";
import { useLoading } from "../../public/context/Loading.ctx";
import { Loading } from "../../public/loaders/Loading";
import OrderBlock, { OrderProps } from "../../public/components/OrderBlock";

export default function Home() {

  const [orders, setOrder] = useState<OrderProps[]>([]);

  const { hideLoading, isLoading, showLoading } = useLoading()

  // const socket = io("http://localhost:5000");


  // useEffect(() => {
  //   socket.on("admin", (data) => {
  //     console.log(data)
  //   })
  //   socket.on("message", (data) => {
  //     console.log(data.message)
  //   })
  //   //Listening to client message coming through server
  //   socket.on("server->admin", (data) => {
  //     console.log(data)
  //   })
  // }, [])

  useEffect(() => {
    showLoading()
    const fetchOrders = async () => {
      try {
        const response = await fetch("https://ich-1gjz.onrender.com/admin/order-book", {
          method: "GET", // ✅ Use POST if sending user details
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          toast.error("Failed to fetch orders")
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrder(data); // ✅ Update state with fetched orders
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

  return (isLoading ? <Loading /> :
    <search className={`px-1 bg-gradient-to-t from-[rgba(20,33,61,0.3)] to-[rgba(252,163,17,0.4)] h-dvh w-full pb-[80vh]`}>
      <ICHHero />
      <div className="flex gap-0.5 sticky top-16">
        <button className={`grow border border-[#FCA331] rounded-lg`}>Orders<kbd className={`${orders.length === 0 ? "hidden" : "block"} text-2xl font-extrabold`}>🤖</kbd></button>
        <button className={`grow border border-[#FCA331] rounded-lg`}>Approved</button>
      </div>
      <div className="mt-1 h-[80vh] w-full border p-1 rounded-lg overflow-x-scroll text-black">
        {/* {JSON.stringify(orders)} */}
        <div className="bg-transparent h-auto w-full flex flex-col gap-2">
          {orders
            .filter((item) => item.order_status !== "APPROVED")
            .map((item, index) => (
              <OrderBlock order={item} key={index} />
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
        <RefreshIcon className="bg-black rounded-full fixed right-5 bottom-12 cursor-pointer transition-transform duration-200 hover:scale-125"
          sx={{ color: "green", fontSize: "2rem" }} />
      </search>
      <Toaster position="bottom-center" reverseOrder={false} />
    </search>
  );
}
