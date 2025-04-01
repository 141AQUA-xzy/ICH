"use client";

import React, { useEffect, useState } from "react";
import "./user.css";
import { useUser } from "../../../public/context/Session.ctx";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import { Loading } from "../../../public/components/loader/Loading";
import { useLoading } from "../../../public/context/Loading.ctx";
import { io } from "socket.io-client";
import { useView } from "../../../public/context/View.ctx";

const Page = () => {

    const socket = io("http://localhost:5000");

    const [ip, setIp] = useState<string | null>(null);

    useEffect(() => {
        const fetchIP = async () => {
            try {
                const response = await fetch("https://api64.ipify.org?format=json");
                const data = await response.json();
                setIp(data.ip);
            } catch (error) {
                console.error("Failed to fetch IP address:", error);
            }
        };

        fetchIP();
    }, [])

    const { login, user } = useUser();
    const {setView} = useView()

    const router = useRouter();

    const { isLoading, hideLoading, showLoading } = useLoading()

    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [location, setLocation] = useState("");

    useEffect(() => {
        showLoading()
    }, [])

    // Redirect if user is already logged in
    useEffect(() => {
        if (user) {
            showLoading()
            router.push("/");
        }
        hideLoading()
    }, [user, router]);

    // Validation function for Indian numbers
    const isValidIndianNumber = (phone: string | number): boolean => {
        const indianNumberRegex = /^[6-9]\d{9}$/;
        return indianNumberRegex.test(phone.toString());
    };

    // Toast function for notifications
    const Toast = (message: string, icon: string) => {
        toast.success(message, {
            duration: 4000,
            style: {
                fontWeight: 600,
                background: "#FCA331",
                borderRadius: "25px",
                zIndex:'9090000000'
            },
            icon,
        });
    };

    // Handle login function
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent form reload

        if (!name || !contact || !location) return Toast("Fill Out First !!", "🤖");

        if (isValidIndianNumber(contact)) {
            login({ username:name, contact, location ,ip,_id:null});
            setView("Home")
            socket.emit("client->server", { name, contact, location, ip})
            Toast(`You are now a member DB`, "🎆");
            router.push("/");
        } else {
            return Toast(`Incorrect Credentials`, "📨");
        }
    };

    return (isLoading ? <Loading /> : (
        <section className="bg-[linear-gradient(140deg,rgb(252,163,17)_70%,rgb(20,33,61)_10%)]">
            <Toaster position="bottom-center" reverseOrder={false} />
            <div className="h-dvh w-full flex flex-col items-center">
                <div className="w-max h-max mt-2">
                    <div className="perspective-distant gap-2 h-max border border-black rounded-lg w-max py-2 text-center tracking-widest text-2xl flex items-center justify-center bg-[linear-gradient(350deg,rgb(252,163,17)_80%,rgb(20,33,61)_20%)] text-transparent bg-clip-text mix-blend-difference">
                        <img
                            className="perspective-distant h-20 w-20 transform-3d banner rounded-full border-4 border-[rgb(252,163,17)]"
                            src="/assets/banner.jpeg"
                            alt="Indian Curry House"
                        />
                        <div className="flex flex-col">
                            <span className="text-sm rounded-lg w-full font-extrabold border-2 border-black underline uppercase">
                                Indian Curry House
                            </span>
                            <span className="text-[7px]">YOUR ONLINE KITCHEN</span>
                        </div>
                    </div>
                </div>

                <form
                    className="p-7 my-8 rounded-2xl gradient-border shadow-2xl shadow-[#14213d]"
                    onSubmit={handleLogin}
                >
                    <fieldset>
                        <legend className="text-[#14213d]">Name</legend>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            className="border border-black text-black font-extrabold p-2 m-2 rounded-lg"
                        />

                        <legend className="text-[#14213d]">Contact</legend>
                        <input
                            onChange={(e) => setContact(e.target.value)}
                            type="tel"
                            className="border border-black text-[#14213d] p-2 m-2 rounded-lg"
                        />

                        <legend className="text-[#14213d]">Location</legend>
                        <input
                            onChange={(e) => setLocation(e.target.value)}
                            type="text"
                            className="border border-black text-[#14213d] p-2 m-2 rounded-lg"
                        />
                    </fieldset>

                    <button
                        type="submit"
                        className="border border-[#14213d] bg-[#14213d] rounded-full p-2 mt-6 relative left-1/2 transform -translate-x-1/2 text-balance text-[#fca311] text-sm font-extrabold"
                    >
                        CONNECT KITCHEN
                    </button>
                </form>
            </div>
        </section>
    )
    );
};

export default Page;
