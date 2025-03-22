// 📌 Carousel.tsx (Reusable Component)
import React from "react";
import { fonts } from "../../../fonts/Next.fonts";

// Define the type for Carousel items
export interface CarouselItem {
    icon: (index: number) => React.ReactNode; // Function that returns JSX
    title: string;
    description: string;
    onClickFunction: () => void;
    btn_text: string;
}

// Define props for Carousel component
interface CarouselProps {
    items: CarouselItem[];
}

// Reusable Carousel Component
const Carousel: React.FC<CarouselProps> = ({ items }) => {
    return (
        <div className="carousel-container">
            {items.map((item, index) => (
                <div key={index} className="h-44 w-full my-3 rounded-lg flex gap-1 -z-30">
                    <svg className="animate animate-pulse flex grow items-center rounded-xl w-full">
                        <defs>
                            <linearGradient id={`grad${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#FCA133" />
                                <stop offset="77%" stopColor="#000000" />
                            </linearGradient>
                        </defs>
                        {/* Render the passed icon function */}
                        {item.icon(index)}
                    </svg>
                    <div className="p-3 grow w-3xl flex flex-col gap-0.5 shadow shadow-amber-500 rounded-lg">
                        <div className="border border-amber-300 bg-[linear-gradient(to_right,#14213d_90%,#FCA133_90%)] p-1 rounded-xl">
                            <text className={`text-[#FCA133] text-xl bg-clip-text w-full font-extrabold tracking-widest ${fonts.permanentMarker}`}>
                                {item.title}
                            </text>
                        </div>
                        <p className="overflow-ellipsis line-clamp-3 leading-6 text-[#FCA133] p-1 text-sm">
                            {item.description}
                        </p>
                        <div className="w-full flex justify-between items-baseline">
                            <div></div>
                            <button
                                onClick={item.onClickFunction}
                                className="border rounded-2xl h-max font-light text-center w-1/2 bg-[#FCA133] text-black p-1"
                            >
                                <span className="text-center">{item.btn_text}</span>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
// Export Carousel Component
export default Carousel;














// import { fonts } from '../../../fonts/Next.fonts';
// import React from 'react'
// import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
// import RamenDiningIcon from '@mui/icons-material/RamenDining';
// import { useView } from '../../../context/View.ctx';

// // Define the type for a single carousel item
// export interface CarouselItem {
//     icon: (index: number) => React.ReactNode; // Function that returns JSX
//     title: string;
//     description: string;
//     onClickFunction: () => void;
// }

// // Define props for Carousel component
// interface CarouselProps {
//     items: CarouselItem[]; // Iterable array of CarouselItem
// }

// // Define an array of carousel items
// const carouselItems: CarouselItem[] = [
//     {
//         icon: (index) => (
//             <RamenDiningIcon
//                 sx={{ fill: `url(#grad${index})`, fontSize: 60 }}
//                 className="p-2"
//             />
//         ),
//         title: "Delicious Ramen",
//         description: "Enjoy the best ramen with rich flavors and spices.",
//         onClickFunction: () => alert("You clicked on Delicious Ramen!"),
//     },
//     {
//         icon: (index) => (
//             <RestaurantMenuIcon
//                 sx={{ fill: `url(#grad${index})`, fontSize: 60 }}
//                 className="p-2"
//             />
//         ),
//         title: "Fine Dining",
//         description: "Experience gourmet dishes with world-class chefs.",
//         onClickFunction: () => alert("You clicked on Fine Dining!"),
//     },
// ];


// // Reusable Carousel Component
// const Carousel: React.FC<CarouselProps> = ({ items }) => {
//     const { view, setView } = useView()

//     return (
//         <search>
//             <div className='h-44 w-full my-3 rounded-lg flex gap-1 -z-30'>
//                 <svg className='flex grow items-center rounded-xl shadow shadow-amber-300 w-full' >
//                     <defs>
//                         <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
//                             <stop offset="0%" stopColor="#FCA133" />
//                             <stop offset="77%" stopColor="#000000" />
//                         </linearGradient>
//                     </defs>
//                     <RamenDiningIcon sx={{
//                         fill: "url(#grad2)",
//                     }} className='' />
//                 </svg>
//                 <div className='p-3 grow w-3xl flex flex-col gap-0.5 shadow shadow-amber-500 rounded-lg'>
//                     <search className='border border-amber-300 bg-[linear-gradient(to_right,#14213d_90%,#FCA133_90%)] p-1 rounded-xl'>
//                         <h1 className={`${fonts.zillaSlab} text-[#FCA133] text-2xl bg-clip-text w-full font-extrabold tracking-widest`}>FOODY</h1>
//                     </search>
//                     <p className={`${fonts.comfortaa} overflow-ellipsis line-clamp-3 leading-6 text-[#FCA133] p-1 text-sm`}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente rerum minima esse labore laborum voluptatem repellat rem ex facere neque tempora officia consectetur deleniti vero, animi debitis atque eveniet eaque!</p>
//                     <search className='w-full flex justify-between items-baseline'>
//                         <div></div>
//                         <button onClick={() => { setView("Menu") }} className='border rounded-2xl h-max text-end w-1/2 bg-[#FCA133] text-black flex items-center p-1 gap-0.5'><span className={`${fonts.oswald} text-end mx-2`}>GET MENU</span><RestaurantMenuIcon className='animate animate-bounce' /></button>
//                     </search>
//                 </div>
//             </div>
//         </search>
//     )
// }

// export default Carousel