"use client"
import React from 'react'
import Carousel, { CarouselItem } from './Carousel.home'
import { ICHHero, ICHSvg } from '../../ICH.hero'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import { useView } from '../../../context/View.ctx';
import { fonts } from '../../../fonts/Next.fonts';
import { useUser } from '../../../context/Session.ctx';
import { useLoading } from '../../../context/Loading.ctx';
import { DotLottieReact, DotLottieWorkerReact } from '@lottiefiles/dotlottie-react';
import CallIcon from '@mui/icons-material/Call';
import { Loading } from '../../loader/Loading';

export const HomeNav = () => {

    const { isLoading } = useLoading()
    const { menu, setView, setMenu, view } = useView()
    const { user } = useUser()
    // Define an array of carousel items
    const carouselItems: CarouselItem[] = [
        {
            icon: (index) => (
                <RamenDiningIcon
                    sx={{ fill: `url(#grad${index})`, fontSize: 60 }}
                    className="p-2"
                />
            ),
            title: "FOODY",
            description: "Enjoy the best ramen with rich flavors and spices.Enjoy the best ramen with rich flavors and spices.Enjoy the best ramen with rich flavors and spices.Enjoy the best ramen with rich flavors and spices.",
            onClickFunction: () => {
                setView("Menu")
                setMenu("explore")
            },
            btn_text: "Get Menu"
        },
        {
            icon: (index) => (
                <RestaurantMenuIcon
                    sx={{ fill: `url(#grad${index})`, fontSize: 60 }}
                    className="p-2"
                />
            ),
            title: "OUR SERVICES",
            description: "Experience gourmet dishes with world-class chefs.Experience gourmet dishes with world-class chefs.",
            onClickFunction: () => {
                setView("Services")
            },
            btn_text: "View More"
        },
        {
            icon: (index) => (
                <StorefrontIcon
                    sx={{ fill: `url(#grad${index})`, fontSize: 60 }}
                    className="p-2"
                />
            ),
            title: "NIGHT CANTEEN",
            description: "Experience gourmet dishes with world-class chefs.Experience gourmet dishes with world-class chefs.",
            onClickFunction: () => {
                setView("Menu")
                setMenu("night-canteen")
            },
            btn_text: "Find Details"
        },
        {
            icon: (index) => (
                <CardGiftcardIcon
                    sx={{ fill: `url(#grad${index})`, fontSize: 60 }}
                    className="p-2"
                />
            ),
            title: "SPECIAL OFFERS",
            description: "Experience gourmet dishes with world-class chefs.Experience gourmet dishes with world-class chefs.",
            onClickFunction: () => setView("Offers"),
            btn_text: "View Offers"
        },
        {
            icon: (index) => (
                <FolderSharedIcon
                    sx={{ fill: `url(#grad${index})`, fontSize: 60 }}
                    className="p-2"
                />
            ),
            title: "COLLABORATE",
            description: "Experience gourmet dishes with world-class chefs.Experience gourmet dishes with world-class chefs.",
            onClickFunction: () => setView("Collab"),
            btn_text: "Connect Now"
        },
    ];

    return (
        <div className="h-auto w-full p-1 pb-[70vh]">
            {isLoading && <Loading />}
            <ICHHero />
            <div className="h-dvh w-full rounded-lg p-1 relative">
                <div className="h-1/5 w-full rounded-xl relative top-0 overflow-x-scroll shadow shadow-amber-500">
                    <ICHSvg />
                    <div className="w-max flex h-full absolute carousel">
                        {user && (<search className="h-full w-dvw grow rounded-2xl flex bg-[#FCA133] gap-0.5">
                            <div className='bg-[#FCA133] flex flex-1/3 items-center justify-center border-2 border-transparent border-r-black p-5'>
                                <DotLottieReact
                                    src="https://lottie.host/61073d06-bd8e-44cf-a5f6-7d4769c5640e/4L149ndG1u.lottie"
                                    loop
                                    autoplay
                                    className=''
                                />
                            </div>
                            <div className='rounded-lg p-2 flex-1/2 flex flex-col gap-2 justify-center relative grow'>
                                <code className={`${fonts.cinzel} w-full text-2xl`}>{user?.username}</code>
                                <kbd className='w-full text-lg'>+91<kbd className=''>{user?.contact}</kbd></kbd>
                                <address className='w-full text-sm line-clamp-1'>{user?.location}</address>
                            </div>
                        </search>)}
                        <search className="h-full w-dvw grow bg-black rounded-2xl flex">
                            <DotLottieWorkerReact
                                src="https://lottie.host/b867da4c-a520-4743-9c62-c1d7d99263e1/SsmP8Q3GH8.lottie"
                                loop
                                autoplay
                                className='grow bg-[#ffd6ff]'
                            />
                            <div className='bg-[#ffd6ff] grow flex flex-col p-2'>
                                <code className={`text-sm`}>GET</code>
                                <code className={`text-2xl`}>Sponsorship Benefits</code>
                                <a className={`p-1 rounded-2xl bg-black text-[#ffd6ff] w-max`} href='tel:+918770025814'>Get Details<CallIcon /></a>
                            </div>
                        </search>
                    </div>
                </div>
                <Carousel items={carouselItems} />
            </div>
        </div>
    )
}
