import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

interface CartItemProps {
    itemName: string;
    code: "HF" | "FL" | "LT" | "ULT" | "SL";
    item_price: number;
    quantity: number;
    addOne: () => void;
    removeOne: () => void;
    deleteItem: () => void;
    img:string
}

export const CartItem: React.FC<CartItemProps> = (props: CartItemProps) => {
    return (
        <search className='w-full my-2 flex flex-col'>
            <div className='rounded-t-2xl bg-[linear-gradient(to_left,#14213d_20%,#FCA331_10%)] text-black w-full px-2 flex justify-between items-center'><text className='text-sm'><text>{props.itemName.toUpperCase()}-</text><kbd className='text-center font-extrabold'>[{props.code}]</kbd></text><button className='' onClick={props.deleteItem}><DeleteIcon style={{ color: "red" }} /></button></div>
            <kbd className='text-[#FCA331] bg-[linear-gradient(to_right,#FCA331_5%,#14213d_5%)] text-end text-2xl'>₹ {props.quantity * props.item_price}/-</kbd>
            <img className="h-32 object-cover bg-center rounded-b-2xl" loading='lazy' src={props.img}></img>
            <div className='flex bg-[#FCA331] rounded-2xl'>
                <button onClick={props.removeOne} className='bg-[#14213d] text-[#FCA331] rounded-full text-sm grow text-center'>-</button>
                <text className='text-center flex-1/2 rounded-2xl text-2xl'>{props.quantity}</text>
                <button onClick={props.addOne} className='bg-[#14213d] text-[#FCA331] rounded-full text-sm grow text-center'>+</button>
            </div>
        </search>
    )
}
