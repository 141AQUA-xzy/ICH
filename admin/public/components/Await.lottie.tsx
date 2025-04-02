import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import React from 'react'

export const Await = () => {
    return (
        <>
            <DotLottieReact
                src="https://lottie.host/27deefec-6a9a-465b-9142-638e5d5a7b2a/qq2YFLopR9.lottie"
                loop
                autoplay
                className="w-1/2"
            />
            <div className="flex flex-col justify-center items-center">
                <kbd className={`text-2xl font-extrabold text-[#FCA331] bg-black rounded-lg p-1`}>COMING SOON</kbd>
                <kbd className="text-sm text-balance text-black">WITH</kbd>
                <kbd className="text-lg font-extralight text-black">NEW ORDERS</kbd>
            </div>
        </>
    )
}
