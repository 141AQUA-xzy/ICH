import React from "react";
import { ICHHero } from "../ICH.hero";
import CallIcon from '@mui/icons-material/Call';

const services = [
    {
        title: "Tiffin Service",
        description: "Delicious, home-style meals delivered daily...! Our monthly tiffin service (₹3000/month) offers wholesome, balanced food with rotating menus to keep it fresh and satisfying. Perfect for students, working professionals, and families.",
    },
    {
        title: "Birthday Parties & Functions",
        description: "Celebrate life’s special moments with us! Whether it's a birthday bash or a family function, we provide customized catering, beautiful ambiance setups, and top-tier service to make your event memorable.",
    },
    {
        title: "Mass Orders",
        description: "Hosting an event, office lunch, or community gathering ? We handle bulk food orders with ease—hot, fresh, and on-time delivery guaranteed. Customizable menus and unbeatable value for large groups.",
    },
    {
        title: "Advertise On Our Application",
        description: "Partner with us for mutual growth..! We proudly support events, cultural programs, and college fests as sponsors—plus, you can advertise directly on our application to reach thousands of daily users. Let’s grow your visibility while serving great food together.",
    }
];


export const OurServices = () => {
    return (
        <>
            <ICHHero />
            <div className="min-h-screen h-dvh bg-black text-white px-6 w-full">
                <h1 className="text-4xl font-bold text-[#FCA331] mb-12 text-center">Our Services</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="border border-[#FCA331] p-6 rounded-2xl shadow-lg hover:shadow-[#FCA331]/50 transition-shadow"
                        >
                            <h2 className="text-2xl font-semibold text-[#FCA331] mb-4">{service.title}</h2>
                            <p className="mb-6 leading-relaxed">{service.description}</p>
                            <a
                                href="tel:+918770025814"
                                className="inline-block bg-[#FCA331] text-black font-medium py-2 px-4 rounded-xl hover:bg-[#e59427] transition-colors"
                            >
                                Know More{" "}<CallIcon />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}