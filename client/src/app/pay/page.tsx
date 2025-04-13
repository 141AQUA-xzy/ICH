"use client"

import { QRCodeCanvas } from "qrcode.react";
import { useRef, useState } from "react";
import { fonts } from "../../../public/fonts/Next.fonts";
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

    const upiLink = `upi://pay?pa=dragonsofcalifornia@oksbi&pn=Indian_Curry_House&am=${cartTotal}&cu=INR`;
    const qrRef = useRef<HTMLDivElement | null>(null);

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
        showLoading();
        try {
            const response = await fetch("https://ich-1gjz.onrender.com/admin/create_order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    cart,
                    customer: user,
                    total: cartTotal,
                    payment_status: "PAID",
                    order_status: "PENDING",
                }),
            });

            const data = await response.json();
            toast.success(`${data.message}`);
            alert("Placing your promise order, make sure to complete payment");
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
                <h2 className={`text-amber-400 text-xl ${fonts}`}>Scan & Pay : ₹{cartTotal}</h2>
                <div ref={qrRef} className="p-2 rounded-2xl shadow shadow-amber-300">
                    <QRCodeCanvas value={upiLink} size={250} />
                </div>
                <kbd className="text-amber-400">OR</kbd>
                <a
                    href={upiLink}
                    onClick={ExecuteOrder}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-1/2 font-extrabold text-amber-300 text-center rounded-lg text-3xl"
                    style={{ boxShadow: "0px 0px 20px 1px #FCA311" }}
                >
                    PAYING NOW
                </a>
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
                            const res = await fetch("https://ich-1gjz.onrender.com/admin/create_order", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    cart,
                                    customer: user,
                                    total: cartTotal,
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









// "use client"
// import { QRCodeCanvas } from "qrcode.react";
// import { useRef, useState } from "react";
// import { ICHSvg } from "../../../public/components/ICH.hero";
// import { fonts } from "../../../public/fonts/Next.fonts";
// import { useCart } from "../../../public/context/Cart.ctx";
// import { useUser } from "../../../public/context/Session.ctx";
// import { toast, Toaster } from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { Loading } from "../../../public/components/loader/Loading";
// import { useLoading } from "../../../public/context/Loading.ctx";

// const PayQR: React.FC = () => {

//     const { isLoading, showLoading, hideLoading } = useLoading()
//     const router = useRouter()
//     const { cartTotal, cart } = useCart()
//     const { user } = useUser()
//     const [delLocation, setDelLocation] = useState(user?.location)

//     const [modal, setModal] = useState(true)

//     const upiLink = `upi://pay?pa=dragonsofcalifornia@oksbi&pn=Indian_Curry_House&am=${cartTotal}&cu=INR`;

//     // const upiLink = `upi://pay?pa=sudeshsatpute0@okicici&am=${cartTotal}&cu=INR`
//     const qrRef = useRef<HTMLDivElement | null>(null);

//     // Function to Download QR Code
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

//     // Function to Share QR Code
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
//         showLoading()
//         try {
//             const response = await fetch("https://ich-1gjz.onrender.com/admin/create_order", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     cart,         // ✅ Send cart data
//                     customer: { ...user, delLocation }, // ✅ Send customer data
//                     total: cartTotal, // ✅ Send total amount
//                     payment_status: "PAID",
//                     order_status: "PENDING",
//                 }),
//             });

//             if (!response.ok) {
//                 throw new Error("Failed to create order");
//             }

//             const data = await response.json(); // ✅ Parse JSON response if needed
//             alert(`Placing your promise order,make sure to complete payment`)
//             toast.success(`${data.message}`)
//         } catch (error: unknown) {
//             if (error instanceof Error) {
//                 toast.error(`Order failed: ${error.message}`);
//             } else {
//                 toast.error("Order failed: An unknown error occurred");
//             }
//         } finally {
//             hideLoading();
//         }
//     };

//     return (
//         <>
//             <search className="h-dvh flex flex-col items-center justify-center gap-4 bg-gradient-to-t from-[rgba(20,33,61,0.3)] to-[rgba(252,163,17,0.4)]">
//                 {isLoading && <Loading />}
//                 {modal ? <div className="h-dvh w-full backdrop-blur-2xl fixed top-0 flex justify-center items-center">
//                     <search className="h-[70vh] w-1/2 border-amber-300">
//                         <div className="flex justify-around items-center px-1">
//                             <p className={`${fonts.bungeeShade}`}>PLACING ORDER</p>
//                             <h1 className=" bg-black p-2 rounded-full" onClick={() => setModal(false)}>❌</h1>
//                         </div>
//                     </search>
//                 </div> : (
//                     <>
//             <Toaster position="bottom-center" reverseOrder={false} />
//             <div className="absolute top-0 h-24 w-full flex pb-2">
//                 <ICHSvg />
//             </div>
//             <h2 className={`text-amber-400 text-xl ${fonts}`}>Scan & Pay : ₹{cartTotal}</h2>
//             <div ref={qrRef} className="p-2 rounded-2xl shadow shadow-amber-300">
//                 <QRCodeCanvas value={upiLink} size={250} />
//             </div>
//             <kbd className="text-amber-400">OR</kbd>
//             <a href={upiLink} onClick={ExecuteOrder} target="_blank" rel="noopener noreferrer" className="w-1/2 font-extrabold text-amber-300 text-center rounded-lg text-3xl" style={{ boxShadow: "0px 0px 20px 1px #FCA311" }}>PAYING NOW</a>
//             <div>
//                 <button onClick={downloadQR} className="rounded-lg" style={{ marginTop: "10px", padding: "10px", background: "blue", color: "white" }}>
//                     Download QR Code
//                 </button>
//                 <button onClick={shareQR} className="rounded-lg" style={{ marginTop: "10px", marginLeft: "10px", padding: "10px", background: "green", color: "white" }}>
//                     Share QR Code
//                 </button>
//             </div>
//             <kbd className="text-amber-400">OR</kbd>
//             <button className="text-amber-300 border border-amber-300 p-2 rounded-2xl font-extrabold uppercase" onClick={async () => {
//                 showLoading()
//                 await fetch("https://ich-1gjz.onrender.com/admin/create_order", {
//                     method: "POST", // ✅ Make sure this is POST
//                     headers: {
//                         "Content-Type": "application/json" // ✅ Important for JSON data
//                     },
//                     body: JSON.stringify({
//                         cart: cart,         // ✅ Send cart data
//                         customer: { ...user, delLocation },     // ✅ Send customer data
//                         total: cartTotal,    // ✅ Send total amount
//                         payment_status: "POD",
//                         order_status: "PENDING"
//                     })
//                 })
//                     .then(res => res.json())  // ✅ First, parse JSON
//                     .then(data => {
//                         toast.success(`Order placed successfully: ${data.message || "Success"}`);
//                         setTimeout(() => {
//                             router.push("/order-bag")
//                         }, 5000);
//                     })
//                     .catch(error => {
//                         toast.error(`Order failed: ${error.message}`);
//                     }
//                     )
//             }}>Pay on delivery</button>
//         </search>
//                 )
// }



// export default PayQR;
