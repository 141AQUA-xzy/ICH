"use client";

import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useUser } from "../../context/Session.ctx";
import RateReviewIcon from '@mui/icons-material/RateReview';
import { useView } from "../../context/View.ctx";

const AddReviewPage = () => {
    const { user } = useUser()
    const { setView } = useView()
    const [formData, setFormData] = useState({
        username: user?.username,
        contact: user?.contact,
        _id: user?._id,
        location: user?.location,
        description: "",
    });

    useEffect(() => {
        console.log(user)
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            author: {
                username: formData.username,
                contact: formData.contact,
                _id: formData._id,
                location: formData.location,
            },
            description: formData.description,
        };

        try {
            const res = await fetch("http://192.168.43.106:5000/client/feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                toast.success("Thank you for your feedback..!");
                setFormData({
                    ...formData,
                    description: "",
                });
                setView("REVIEWS")
            } else {
                toast.error("Failed to submit review. Try again later.");
            }
        } catch (error) {
            toast.error("Error submitting review.");
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-black px-6 py-10 text-[#FCA331]">
            <h2 className="text-2xl font-bold text-left mb-6 border-b-4 border-[#FCA331] inline-block w-full">
                <RateReviewIcon /> Share Your Experience...
            </h2>

            <form
                onSubmit={handleSubmit}
                className="max-w-2xl mx-auto bg-[#FCA331] p-6 rounded-xl shadow-md text-black flex flex-col gap-4"
            >
                <textarea
                    name="description"
                    placeholder="Write your review..."
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="rounded-md p-2 min-h-[120px] border-black"
                />
                <button
                    type="submit"
                    className="bg-black text-[#FCA331] font-bold py-2 rounded-md hover:opacity-90 transition"
                >
                    Publish Review
                </button>
            </form>
            <Toaster position="bottom-center" />
        </div>
    );
};

export default AddReviewPage;
