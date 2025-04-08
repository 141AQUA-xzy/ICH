import { useMenu } from "../../../../context/Menu.ctx";
import { fonts } from "../../../../fonts/Next.fonts";
import React from "react";

// Define props for ThaliItems
interface ThaliItemProps {
    image: string;
    name: string;
}

const ThaliItems: React.FC<ThaliItemProps> = ({ image, name }) => {
    return (
        <div className="h-auto w-full flex flex-col rounded-2xl">
            <img className="" src={image} alt={name} />
            <p className={`${fonts.cinzel} w-full bg-[#14213d] text-[#FCA331] text-center rounded-b-lg`}>{name}</p>
        </div>
    );
};

// Define props for ThaliItems
interface ThaliItemProps {
    image: string;
    name: string;
}

interface ThaliHouseProps {
    title: string;
    items: ThaliItemProps[]; // Array of Thali items
    banner: string; // Main banner image
    prices: {  standard: number | null | undefined; ultimate: number }; // Pricing object
    onStandardClick: () => void; // Function for Standard Thali button
    onUltimateClick: () => void; // Function for Ultimate Thali button
}

const ThaliHouse: React.FC<ThaliHouseProps> = ({ title, items, banner, prices, onStandardClick, onUltimateClick }) => {
    const { menu } = useMenu();
    const standardPrice = menu[title]?.["price-hf"] ?? 0;
    const ultimatePrice = menu[title]?.["price-fl"] ?? 0;
    return (
        <section className="w-dvw h-[50vh] flex relative">
            <h2 className={`absolute z-10 w-full bg-[#FCA331] text-2xl p-2 rounded-t-2xl ${fonts.zillaSlab}`}>
                {title.toUpperCase()}
            </h2>
            <div className="w-1/4 pt-10 bg-inherit rounded-2xl flex flex-col overflow-y-scroll gap-5">
                {items.map((item, index) => (
                    <ThaliItems key={index} image={item.image} name={item.name} />
                ))}
            </div>
            <div className="w-3/4 rounded-2xl flex flex-col justify-between">
                <img className="rounded-b-2xl relative top-10" src={banner} alt="Thali Banner" />
                <div className="flex w-full h-max px-1 pb-2 justify-evenly gap-2">
                    <button onClick={onStandardClick} className="text-sm rounded-lg bg-[#FCA331] grow">
                        ADD STD-<kbd className="text-3xl">₹{standardPrice}</kbd>
                    </button>
                    <button onClick={onUltimateClick} className="text-sm rounded-lg bg-[#FCA331] grow">
                        ADD ULT-<kbd className="text-3xl">₹{ultimatePrice}</kbd>
                    </button>
                </div>
            </div>
        </section>
    );
};
export default ThaliHouse;
