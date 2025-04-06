import React from 'react'
import { fonts } from '../../../../fonts/Next.fonts'
import { useMenu } from '../../../../context/Menu.ctx';

interface MainItems {
    title: string,
    price_hf: number | null,
    price_fl: number,
    hfClicked?: () => void,
    ffClicked: () => void,
    img: string
}


export const MainCourse = (props: MainItems) => {

    const { menu } = useMenu(); // Get menu data

    // 🔹 Directly find the item in `menu` using its title (no categories involved)
    const itemDetails = menu[props.title] || null;

    // If item not found, return null to prevent errors
    if (!itemDetails) return null;

    return (
        <search className='relative flex flex-col'>
            <div className='w-[50vw] h-full m-2 rounded-lg flex flex-col'>
                <h1 className={`${fonts.cinzel} text-[#FCA331] pr-1 w-full bg-[linear-gradient(to_right,#14213d_90%,#FCA133_90%)]`}>{props.title}</h1>
                <img loading='lazy' className='object-cover bg-center h-[30vw] rounded-b-lg' src={props.img}></img>
                <div className='flex items-center pt-1'>
                    {/* Half Price Button */}
                    {itemDetails["price-hf"] !== null && (
                        <button
                            onClick={props.hfClicked}
                            className='border rounded-b-2xl grow text-sm bg-[#FCA331]'
                        >
                            HF- ₹{itemDetails["price-hf"]}
                        </button>
                    )}

                    {/* Full Price Button */}
                    <button onClick={props.ffClicked} className='border rounded-b-2xl grow text-sm bg-[#FCA331]'>
                        {itemDetails["price-hf"] === null ? "ADD-" : "FL-"} ₹{itemDetails["price-fl"]}
                    </button>
                </div>
            </div>
        </search >
    )
}
export const FusionBites = (props: MainItems) => {

    const { menu } = useMenu(); // Get menu data

    // 🔹 Directly find the item in `menu` using its title (no categories involved)
    const itemDetails = menu[props.title] || null;

    // If item not found, return null to prevent errors
    if (!itemDetails) return null;

    return (
        <search className='relative flex flex-col'>
            <div className='w-[25vw] h-full m-2 rounded-lg flex flex-col'>
                <h1 className={`${fonts.exo2} text-sm text-[#FCA331] pr-1 w-full bg-[linear-gradient(to_right,#14213d_90%,#FCA133_90%)]`}>{props.title}</h1>
                <img loading='lazy' className='object-cover bg-center h-[30vw] rounded-b-lg' src={props.img}></img>
                <div className='flex flex-col w-full  items-center pt-1'>
                    {/* Half Price Button */}
                    {itemDetails["price-hf"] !== null && (
                        <button
                            onClick={props.hfClicked}
                            className='border rounded-b-2xl grow w-full text-sm bg-[#FCA331]'
                        >
                            HF- ₹{itemDetails["price-hf"]}
                        </button>
                    )}

                    {/* Full Price Button */}
                    <button onClick={props.ffClicked} className='border rounded-b-2xl grow w-full text-sm bg-[#FCA331]'>
                        {itemDetails["price-hf"] === null ? "ADD-" : "FL-"} ₹{itemDetails["price-fl"]}
                    </button>
                </div>
            </div>
        </search >
    )
}