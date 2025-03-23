import React from 'react'
import { fonts } from '../../../../fonts/Next.fonts'

interface MainItems {
    title: string,
    price_hf: number | null,
    price_fl: number,
    hfClicked?: () => void,
    ffClicked: () => void,
    img: string
}

export const MainCourse = (props: MainItems) => {
    return (
        <search className='relative flex flex-col'>
            <div className='w-[50vw] h-full m-2 rounded-lg flex flex-col'>
                <h1 className={`${fonts.exo2} text-[#FCA331] pr-1 w-full bg-[linear-gradient(to_right,#14213d_90%,#FCA133_90%)]`}>{props.title}</h1>
                <img loading='lazy' className='object-cover bg-center h-[30vw] rounded-b-lg' src={props.img}></img>
                <div className='flex items-center pt-1'>
                    <button onClick={props.hfClicked} className={`${props.price_hf === null ? "hidden" : "visible"}  border rounded-b-2xl grow text-sm bg-[#FCA331]`}>HF-{" "}<kbd className={`text-xl`}>₹{props.price_hf}</kbd></button>
                    <button onClick={props.ffClicked} className='border rounded-b-2xl grow text-sm bg-[#FCA331]'>{props.price_hf === null ?<text>ADD-{" "}</text> : <text>FL-{" "}</text>}<kbd className='text-xl'>₹{props.price_fl}</kbd></button>
                </div>
            </div>
        </search >
    )
}
export const FusionBites = (props: MainItems) => {
    return (
        <search className='relative flex flex-col'>
            <div className='w-[25vw] h-full m-2 rounded-lg flex flex-col'>
                <h1 className={`${fonts.exo2} text-sm text-[#FCA331] pr-1 w-full bg-[linear-gradient(to_right,#14213d_90%,#FCA133_90%)]`}>{props.title}</h1>
                <img loading='lazy' className='object-cover bg-center h-[30vw] rounded-b-lg' src={props.img}></img>
                <div className='flex flex-col w-full  items-center pt-1'>
                    <button onClick={props.hfClicked} className={`w-full ${props.price_hf === null ? "hidden" : "visible"}  border rounded-lg grow text-sm bg-[#FCA331]`}>HF-{" "}<kbd className={``}>₹{props.price_hf}</kbd></button>
                    <button onClick={props.ffClicked} className='w-full border rounded-lg grow text-sm bg-[#FCA331]'>{props.price_hf === null ?<text>ADD-{" "}</text> : <text>FL-{" "}</text>}<kbd className=''>₹{props.price_fl}</kbd></button>
                </div>
            </div>
        </search >
    )
}