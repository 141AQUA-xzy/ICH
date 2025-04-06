import React, { useEffect, useState } from 'react'
import { ICHSvg } from '../ICHHero'
import toast, { Toaster } from 'react-hot-toast';
import { useLoading } from '../../context/Loading.ctx';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export const Status = () => {

    const [open, setStatus] = useState();
    const { showLoading, hideLoading } = useLoading()

    const OpenClose = async () => {
        showLoading();
        try {
            const res = await fetch("https://ich-1gjz.onrender.com/admin/grs");
            const data = await res.json(); // ✅ Await this!
            setStatus(data.status);

            if (res.ok) {
                hideLoading()
                toast(`Status Updated to ${data.status ? "OPEN" : "CLOSED"}`, {
                    style: {
                        fontWeight: 600,
                        background: "#FCA331",
                        borderRadius: "25px",
                        zIndex: '9090000000'
                    }
                });
            } else {
                toast.error("Failed to update status");
            }
        } catch (error) {
            toast.error("Error occurred while updating status");
        } finally {
            hideLoading();
        }
    };

    return (
        <search className='h-dvh w-full flex flex-col items-center bg-gradient-to-t from-[rgba(20,33,61,0.3)] to-[rgba(252,163,17,0.4)]'>
            <DotLottieReact
                src="https://lottie.host/ab41b412-4464-4521-9ae8-cb66481335f3/lr92b2bKQB.lottie"
                loop
                autoplay
                className='h-[60vh]'
            />
            <button className='h-10 bg-[#FCA331] text-3xl rounded-lg w-1/2'
                onClick={OpenClose}>{open ? "OPEN" : "CLOSED"}</button>
            <Toaster position='bottom-center' reverseOrder={false} />
        </search>
    )
}
