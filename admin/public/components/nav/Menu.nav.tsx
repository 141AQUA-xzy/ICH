import React, { useState } from 'react'
import CheckIcon from '@mui/icons-material/Check';
import { useView } from '../../context/View.ctx';
import FilterFramesIcon from '@mui/icons-material/FilterFrames';
import ReorderIcon from '@mui/icons-material/Reorder';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
export const Menu = () => {

    const { setView, view } = useView()

    return (
        <search className={`fixed top-[62%] right-2 h-[23vh] w-14 bg-[#FCA331] overflow-scroll border-2 rounded-full border-amber-300 z-50`}>
            <div className='h-[35vh] flex flex-col justify-around items-center bg-black'>
                <FilterFramesIcon
                    style={{ color: "orange", fontSize: "40px" }}
                    onClick={() => setView("PENDING")}
                    className={`animate cursor-pointer transition-all duration-300  rounded-full p-2 ${view === "PENDING" && "animate-pulse border-e-blue-400 border-4"}`} />
                <CheckIcon
                    style={{ color: "orange", fontSize: "40px" }}
                    onClick={() => setView("APPROVED")}
                    className={`animate cursor-pointer transition-all duration-300  rounded-full p-2 ${view === "APPROVED" && "animate-pulse border-e-blue-400 border-4"}`} />
                <ReorderIcon
                    style={{ color: "orange", fontSize: "40px" }}
                    onClick={() => setView("EDITMENU")}
                    className={`animate cursor-pointer transition-all duration-300  rounded-full p-2 ${view === "EDITMENU" && "animate-pulse border-e-blue-400 border-4"}`} />
                <ToggleOnIcon
                    style={{ color: "orange", fontSize: "40px" }}
                    onClick={() => setView("OPEN/CLOSE")}
                    className={`animate cursor-pointer transition-all duration-300  rounded-full p-2 ${view === "OPEN/CLOSE" && "animate-pulse border-e-blue-400 border-4"}`} />
                <ManageHistoryIcon
                    style={{ color: "orange", fontSize: "40px" }}
                    onClick={() => setView("HISTORY")}
                    className={`animate cursor-pointer transition-all duration-300  rounded-full p-2 ${view === "HISTORY" && "animate-pulse border-e-blue-400 border-4"}`} />
            </div>
        </search>
    )
}
