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

interface MainItemU {
  title: string,
  hfClicked?: () => void,
  ffClicked: () => void,
}


export const MainCourse = (props: MainItems) => {

    const { menu } = useMenu(); // Get menu data

    // 🔹 Directly find the item in `menu` using its title (no categories involved)
    const itemDetails = menu[props.title] || null;

    // If item not found, return null to prevent errors
    if (!itemDetails) return null;

    return (
        <search className='relative flex flex-col'>
            <div className='w-[50vw] h-max m-2 rounded-lg flex flex-col'>
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

export const MainCourseCard = ({ title, hfClicked, ffClicked}: MainItemU) => {
    const { menu } = useMenu();
  
    const item = menu[title];
    if (!item) return null;
  
    const hideHalf = item['price-hf'] === null;
  
    return (
      <section className="relative w-dvw px-0.5">
        <div className="h-max w-full rounded-lg flex justify-between items-center gap-1">
          <h1 className={`${fonts.cinzel} text-[#FCA331] px-2 text-left flex-1/2 w-full bg-[#14213d] rounded-lg`}>
            {title}
          </h1>
          <div className="flex items-center pt-1">
            {!hideHalf && (
              <button
                onClick={hfClicked}
                className="border rounded-lg grow text-sm bg-[#FCA331] px-1"
              >
                HF- ₹{item['price-hf']}
              </button>
            )}
            <button
              onClick={ffClicked}
              className="border rounded-lg grow text-sm bg-[#FCA331] px-1"
            >
              {hideHalf ? 'ADD-' : 'FL-'} ₹{item['price-fl']}
            </button>
          </div>
        </div>
      </section>
    );
  };