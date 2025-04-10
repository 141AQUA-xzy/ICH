"use client"
import { QRCodeCanvas } from "qrcode.react";
import { useRef } from "react";
import { ICHSvg } from "../../../public/components/ICH.hero";
import { fonts } from "../../../public/fonts/Next.fonts";
import { useCart } from "../../../public/context/Cart.ctx";
import { useUser } from "../../../public/context/Session.ctx";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loading } from "../../../public/components/loader/Loading";
import { useLoading } from "../../../public/context/Loading.ctx";

const PayQR: React.FC = () => {

    const { isLoading, showLoading } = useLoading()
    const router = useRouter()
    const { cartTotal, cart } = useCart()
    const { user } = useUser()

    const callbackUrl = encodeURIComponent("https://ich-client.vercel.app/pending");
    const upiLink = `upi://pay?pa=dragonsofcalifornia@oksbi&pn=Indian_Curry_House&am=${cartTotal}&cu=INR&url=${callbackUrl}`;

    // const upiLink = `upi://pay?pa=sudeshsatpute0@okicici&am=${cartTotal}&cu=INR`
    const qrRef = useRef<HTMLDivElement | null>(null);

    // Function to Download QR Code
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

    // Function to Share QR Code
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
    return (
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
            <a href={upiLink} target="_blank" rel="noopener noreferrer" className="w-1/2 font-extrabold text-amber-300 text-center rounded-lg text-3xl" style={{ boxShadow: "0px 0px 20px 1px #FCA311" }}>PAY NOW</a>
            <div>
                <button onClick={downloadQR} className="rounded-lg" style={{ marginTop: "10px", padding: "10px", background: "blue", color: "white" }}>
                    Download QR Code
                </button>
                <button onClick={shareQR} className="rounded-lg" style={{ marginTop: "10px", marginLeft: "10px", padding: "10px", background: "green", color: "white" }}>
                    Share QR Code
                </button>
            </div>
            <kbd className="text-amber-400">OR</kbd>
            <button className="text-amber-300 border border-amber-300 p-2 rounded-2xl font-extrabold uppercase" onClick={async () => {
                showLoading()
                await fetch("https://ich-1gjz.onrender.com/admin/create_order", {
                    method: "POST", // ✅ Make sure this is POST
                    headers: {
                        "Content-Type": "application/json" // ✅ Important for JSON data
                    },
                    body: JSON.stringify({
                        cart: cart,         // ✅ Send cart data
                        customer: user,     // ✅ Send customer data
                        total: cartTotal,    // ✅ Send total amount
                        payment_status: "POD",
                        order_status: "PENDING"
                    })
                })
                    .then(res => res.json())  // ✅ First, parse JSON
                    .then(data => {
                        toast.success(`Order placed successfully: ${data.message || "Success"}`);
                        setTimeout(() => {
                            router.push("/order-bag")
                        }, 5000);
                    })
                    .catch(error => {
                        toast.error(`Order failed: ${error.message}`);
                    }
                    )
            }}>Pay on delivery</button>
        </search>
    );
};

export default PayQR;
