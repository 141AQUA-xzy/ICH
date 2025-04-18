// "use client"

// import { QRCodeCanvas } from "qrcode.react";
// import { useRef } from "react";
// import { fonts } from "../../../public/fonts/Next.fonts";
// import { useCart } from "../../../public/context/Cart.ctx";
// import { useUser } from "../../../public/context/Session.ctx";
// import { toast, Toaster } from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { Loading } from "../../../public/components/loader/Loading";
// import { useLoading } from "../../../public/context/Loading.ctx";
// import { ICHSvg } from "../../../public/components/ICH.hero";

// const PayQR: React.FC = () => {

//     const { isLoading, showLoading, hideLoading } = useLoading();
//     const router = useRouter();
//     const { cartTotal, cart } = useCart();
//     const { user } = useUser();

//     const upiLink = `upi://pay?pa=q710949404@ybl&pn=${encodeURIComponent("Indian Curry House")}&am=${cartTotal}&cu=INR`;

//     const qrRef = useRef<HTMLDivElement | null>(null);

//     const downloadQR = () => {
//         if (!qrRef.current) return;
//         const canvas = qrRef.current.querySelector("canvas");
//         if (!canvas) return;

//         const url = canvas.toDataURL("image/png");
//         const link = document.createElement("a");
//         link.href = url;
//         link.download = "UPI_QR_Code.png";
//         link.click();
//     };

//     const shareQR = async () => {
//         if (!qrRef.current) return;
//         const canvas = qrRef.current.querySelector("canvas");
//         if (!canvas) return;

//         const url = canvas.toDataURL("image/png");
//         const blob = await fetch(url).then((res) => res.blob());
//         const file = new File([blob], "Pay_ICH.png", { type: "image/png" });

//         if (navigator.canShare && navigator.canShare({ files: [file] })) {
//             await navigator.share({
//                 title: "Scan to Pay",
//                 text: "Make a UPI payment easily using this QR code.",
//                 files: [file],
//             });
//         } else {
//             alert("Sharing not supported on this device.");
//         }
//     };

//     const ExecuteOrder = async () => {
//         showLoading();
//         try {
//             const response = await fetch("https://restaurantapis.onrender.com/admin/create_order", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                     cart,
//                     customer: user,
//                     total: cartTotal,
//                     payment_status: "PAID",
//                     order_status: "PENDING",
//                 }),
//             });

//             const data = await response.json();
//             toast.success(`${data.message}`);
//             alert("Placing your promise order, make sure to complete payment...else order will not approve.");
//         } catch (error) {
//             toast.error(`Order failed: ${error instanceof Error ? error.message : "An unknown error occurred"}`);
//         } finally {
//             hideLoading();
//         }
//     };

//     return (
//         <>
//             <search className="h-dvh flex flex-col items-center justify-center gap-4 bg-gradient-to-t from-[rgba(20,33,61,0.3)] to-[rgba(252,163,17,0.4)]">
//                 {isLoading && <Loading />}
//                 <Toaster position="bottom-center" reverseOrder={false} />
//                 <div className="absolute top-0 h-24 w-full flex pb-2">
//                     <ICHSvg />
//                 </div>
//                 <h2 className={`text-amber-400 text-xl ${fonts}`}>Scan & Pay : ₹{cartTotal}</h2>
//                 <div
//                     ref={qrRef}
//                     className="bg-white p-6 rounded-xl border-4 border-amber-400 shadow-lg flex flex-col items-center gap-2"
//                     style={{ width: 300 }}
//                 >
//                     <h3 className="text-xl font-bold text-amber-500">Scan & Pay</h3>
//                     <QRCodeCanvas value={upiLink} size={200} />
//                     <p className="text-sm text-gray-600">Indian Curry House</p>
//                     <p className="text-sm font-medium text-gray-800">Amount: ₹{cartTotal}</p>
//                 </div>
//                 <kbd className="text-amber-400">OR</kbd>
//                 <a
//                     href={upiLink}
//                     onClick={ExecuteOrder}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="w-1/2 font-extrabold text-amber-300 text-center rounded-lg text-3xl"
//                     style={{ boxShadow: "0px 0px 20px 1px #FCA311" }}
//                 >
//                     PAYING NOW
//                 </a>
//                 <div>
//                     <button
//                         onClick={downloadQR}
//                         className="rounded-lg mt-2 p-2 bg-blue-600 text-white"
//                     >
//                         Download QR Code
//                     </button>
//                     <button
//                         onClick={shareQR}
//                         className="rounded-lg mt-2 ml-2 p-2 bg-green-600 text-white"
//                     >
//                         Share QR Code
//                     </button>
//                 </div>
//                 <kbd className="text-amber-400">OR</kbd>
//                 <button
//                     className="text-amber-300 border border-amber-300 p-2 rounded-2xl font-extrabold uppercase"
//                     onClick={async () => {
//                         showLoading();
//                         try {
//                             const res = await fetch("https://restaurantapis.onrender.com/admin/create_order", {
//                                 method: "POST",
//                                 headers: { "Content-Type": "application/json" },
//                                 body: JSON.stringify({
//                                     cart,
//                                     customer: user,
//                                     total: cartTotal,
//                                     payment_status: "POD",
//                                     order_status: "PENDING",
//                                 }),
//                             });
//                             const data = await res.json();
//                             toast.success(`Order placed: ${data.message}`);
//                             setTimeout(() => router.push("/order-bag"), 5000);
//                         } catch (error) {
//                             toast.error(`Order failed: ${error}`);
//                         } finally {
//                             hideLoading();
//                         }
//                     }}
//                 >
//                     Pay on delivery
//                 </button>

//                 <Toaster position="bottom-center" reverseOrder={false} />
//             </search>
//         </>
//     );
// };

// export default PayQR;



"use client"

import { QRCodeCanvas } from "qrcode.react";
import { useRef, useState, useEffect } from "react";
import { useCart } from "../../../public/context/Cart.ctx";
import { useUser } from "../../../public/context/Session.ctx";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loading } from "../../../public/components/loader/Loading";
import { useLoading } from "../../../public/context/Loading.ctx";
import { ICHSvg } from "../../../public/components/ICH.hero";

const PayQR: React.FC = () => {
    const { isLoading, showLoading, hideLoading } = useLoading();
    const router = useRouter();
    const { cartTotal, cart } = useCart();
    const { user } = useUser();
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
    const [payNowDisabled, setPayNowDisabled] = useState(true);
    const [timerActive, setTimerActive] = useState(true);
    const [storedCartTotal, setStoredCartTotal] = useState(0);
    const [countdown, setCountdown] = useState(12); // 12-second countdown

    // Store cartTotal in sessionStorage when it changes
    useEffect(() => {
        if (cartTotal > 0) {
            sessionStorage.setItem('cartTotal', cartTotal.toString());
            setStoredCartTotal(cartTotal);
        }
    }, [cartTotal]);

    // Retrieve cartTotal from sessionStorage on component mount
    useEffect(() => {
        const savedCartTotal = sessionStorage.getItem('cartTotal');
        if (savedCartTotal) {
            setStoredCartTotal(parseFloat(savedCartTotal));
        }
    }, []);

    const upiLink = `upi://pay?pa=dragonsofcalifornia@oksbi&pn=${encodeURIComponent("Indian Curry House")}&am=${storedCartTotal || cartTotal}&cu=INR`;
    const qrRef = useRef<HTMLDivElement | null>(null);

    // 5-minute countdown timer
    useEffect(() => {
        if (!timerActive) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setTimerActive(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timerActive]);

    // 12-second delay for PAY NOW button
    useEffect(() => {
        const countdownInterval = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(countdownInterval);
                    setPayNowDisabled(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(countdownInterval);
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const downloadQR = () => {
        if (!qrRef.current) return;
        const canvas = qrRef.current.querySelector("canvas");
        if (!canvas) return;

        const url = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = url;
        link.download = "UPI_QR_Code.png";
        link.click();
    };

    const shareQR = async () => {
        if (!qrRef.current) return;
        const canvas = qrRef.current.querySelector("canvas");
        if (!canvas) return;

        const url = canvas.toDataURL("image/png");
        const blob = await fetch(url).then((res) => res.blob());
        const file = new File([blob], "Pay_ICH.png", { type: "image/png" });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
                title: "Scan to Pay",
                text: "Make a UPI payment easily using this QR code.",
                files: [file],
            });
        } else {
            alert("Sharing not supported on this device.");
        }
    };

    const ExecuteOrder = async () => {
        if (payNowDisabled) return; // Prevent execution during countdown
        
        showLoading();
        try {
            const response = await fetch("https://restaurantapis.onrender.com/admin/create_order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    cart,
                    customer: user,
                    total: storedCartTotal || cartTotal,
                    payment_status: "PAID",
                    order_status: "PENDING",
                }),
            });

            const data = await response.json();
            toast.success(`${data.message}`);
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                  new Notification("Order Placed!", {
                    body: "Your order has been received.",
                  });
                }
              });
            alert("Placing your promise order, make sure to complete payment...else order will not approve.Checkout your orders");
        } catch (error) {
            toast.error(`Order failed: ${error instanceof Error ? error.message : "An unknown error occurred"}`);
        } finally {
            hideLoading();
        }
    };

    return (
        <>
            <search className="h-dvh flex flex-col items-center justify-center gap-4 bg-gradient-to-t from-[rgba(20,33,61,0.3)] to-[rgba(252,163,17,0.4)]">
                {isLoading && <Loading />}
                <Toaster position="bottom-center" reverseOrder={false} />
                <div className="absolute top-0 h-24 w-full flex pb-2">
                    <ICHSvg />
                </div>
                <div
                    ref={qrRef}
                    className="bg-white p-6 rounded-xl border-4 border-amber-400 shadow-lg flex flex-col items-center gap-2"
                    style={{ width: 300 }}
                >
                    <h3 className="text-xl font-bold text-amber-500">Scan & Pay</h3>
                    <QRCodeCanvas value={upiLink} size={200} />
                    <p className="text-sm text-gray-600">Indian Curry House</p>
                    <p className="text-sm font-medium text-gray-800">Amount: ₹{storedCartTotal || cartTotal}</p>
                {/* QR Code Validity Timer */}
                <div className="text-red-500 font-bold text-lg">
                    {timerActive ? (
                        `QR Valid for: ${formatTime(timeLeft)}`
                    ) : (
                        <span className="text-red-600">QR Code Expired! Refresh page to generate new one</span>
                    )}
                </div>
                </div>
                
                <kbd className="text-amber-400">OR</kbd>
                
                {/* PAY NOW button with proper 12s delay */}
                <button
                    onClick={ExecuteOrder}
                    disabled={payNowDisabled}
                    className={`w-1/2 font-extrabold text-amber-300 text-center rounded-lg text-3xl ${
                        payNowDisabled ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    style={{ boxShadow: "0px 0px 20px 1px #FCA311" }}
                >
                    {payNowDisabled ? `Preparing... (${countdown}s)` : "PAY NOW"}
                </button>
                
                <div>
                    <button
                        onClick={downloadQR}
                        className="rounded-lg mt-2 p-2 bg-blue-600 text-white"
                    >
                        Download QR Code
                    </button>
                    <button
                        onClick={shareQR}
                        className="rounded-lg mt-2 ml-2 p-2 bg-green-600 text-white"
                    >
                        Share QR Code
                    </button>
                </div>
                
                <kbd className="text-amber-400">OR</kbd>
                
                <button
                    className="text-amber-300 border border-amber-300 p-2 rounded-2xl font-extrabold uppercase"
                    onClick={async () => {
                        showLoading();
                        try {
                            const res = await fetch("https://restaurantapis.onrender.com/admin/create_order", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    cart,
                                    customer: user,
                                    total: storedCartTotal || cartTotal,
                                    payment_status: "POD",
                                    order_status: "PENDING",
                                }),
                            });
                            const data = await res.json();
                            toast.success(`Order placed: ${data.message}`);
                            setTimeout(() => router.push("/order-bag"), 5000);
                        } catch (error) {
                            toast.error(`Order failed: ${error}`);
                        } finally {
                            hideLoading();
                        }
                    }}
                >
                    Pay on delivery
                </button>

                <Toaster position="bottom-center" reverseOrder={false} />
            </search>
        </>
    );
};

export default PayQR;