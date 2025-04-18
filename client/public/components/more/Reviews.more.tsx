"use client";

import React, { useEffect, useState } from "react";
import { ICHHero } from "../ICH.hero";
import { Loading } from "../loader/Loading";
import { fonts } from "../../fonts/Next.fonts";
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import { useView } from "../../context/View.ctx";
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';
import { useUser } from "../../context/Session.ctx";
import toast, { Toaster } from "react-hot-toast";
import { differenceInDays, format, formatDistanceToNow } from "date-fns";

interface Review {
    _id: string;
    description: string;
    author: {
        username: string;
        contact: string;
        _id: string;
        location: string;
    };
    createdAt: Date
}

const ReviewsPage = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const { user } = useUser()
    const [loading, setLoading] = useState(true);
    const { setView } = useView()

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch("https://restaurantapis.onrender.com/client/reviews"); // Replace with your endpoint
                const data = await response.json();
                setReviews(data);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);


    const DeleteReview = async (_id: string) => {
        setLoading(true)
        try {
            const response = await fetch(`https://restaurantapis.onrender.com/admin/delete-review/${_id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            }); // Replace with your endpoint
            const data = await response.json();
            if (response.ok) {
                toast.success(`${data.message}`)
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
        } finally {
            window.location.reload()
            setLoading(false);
            setView("Reviews")
        }
    };

    return (
        <search className="bg-gradient-to-b from-[rgba(20,33,61,0.3)] to-[rgba(252,163,17,0.4)]">
            <div onClick={() => {
                setView("AddReview")
            }} className="fixed right-3 bottom-24 z-50">
                <div className="relative flex justify-center items-center">
                    <a className="absolute animate-ping text-center text-[#FCA331] p-2 rounded-full bg-black grow w-full h-full"></a>
                    <AddToQueueIcon className="text-[#FCA331] bg-black rounded-full" style={{ fontSize: "3rem", padding: "1rem" }} />
                </div>
            </div>
            <search className="sticky top-0 z-50">
                <ICHHero />
                <h1 className={`${fonts.cinzel} rounded-lg w-full text-3xl text-center mb-4 p-2 bg-[#FCA331] inline-block text-black`}>
                    Customer Reviews
                </h1>
            </search>
            <div className="relative min-h-screen px-6 text-[#FCA331] rounded-lg overflow-auto pb-16">
                {reviews.length === 0 && <p className="sticky top-0">No reviews found.</p>}
                {loading ? (
                    <Loading />
                ) : (
                    <div className="grid gap-4 max-w-4xl mx-auto pb-20 pt-2">
                        {reviews.map((review) => (
                            <div
                                key={review._id}
                                className="bg-[#FCA331] text-black rounded-xl shadow-lg p-4 pb-0.5"
                            >
                                <p className="text-lg italic mb-3">"{review.description}"</p>
                                <div className="text-md font-semibold text-right text-black">
                                    – {review.author.username}
                                </div>
                                <address className="text-sm text-right text-black">
                                    {review.author.location}
                                </address>
                                {user?._id === review.author._id && <button onClick={() => DeleteReview(review._id)} className={`${fonts.luckiestGuy} flex justify-center items-center w-full bg-black text-red-500 rounded-lg px-1.5`}>DELETE REVIEW {" "}<FolderDeleteIcon className="animate-bounce ml-1" /></button>}
                                <div className="flex justify-between">
                                    <div></div>
                                    <span className="text-sm">
                                        {differenceInDays(new Date(), new Date(review.createdAt)) <= 3
                                            ? formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })  // e.g., "2 days ago"
                                            : format(new Date(review.createdAt), "do MMM yyyy, hh:mm a")            // e.g., "10th Apr 2025, 05:45 PM"
                                        }
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )
                }
            </div>
            <Toaster position="bottom-center" reverseOrder={false} />
        </search>
    );
};

export default ReviewsPage;
