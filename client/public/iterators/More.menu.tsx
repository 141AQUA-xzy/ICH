import React from 'react'
import { fonts } from '../fonts/Next.fonts';
import { Toaster } from 'react-hot-toast';

interface MoreProps {
    title: string;
    icon: React.ElementType; // ✅ Stores the component reference (not JSX)
    handleClick: () => void;
  }

export const MoreIt:React.FC<MoreProps> = (props:MoreProps) => {
    return (
        <search>
            <Toaster position="bottom-center" reverseOrder={false} />
            <div className='flex items-center'>
                <props.icon sx={{ fontSize: "200%", color: "#FCA331" }} />
                <button onClick={props.handleClick} className={`text-left bg-[#14213d] ${fonts.pressStart2P} w-full p-2 my-1 rounded-lg text-[#FCA331]`}>{props.title}</button>
            </div>
        </search>
    )
}
