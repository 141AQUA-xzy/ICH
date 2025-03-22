import React from 'react'
import { fonts } from '../../../fonts/Next.fonts'
import { useView } from '../../../context/View.ctx'
import { Explore, NightCanteen } from '../../../iterators/Menu.menu'

export const MenuPage = () => {

  const { menu, setMenu } = useView()

  return (
    <search className='h-auto w-full pb-32'>
      <div className="sticky top-0 flex p-2 gap-1 rounded-lg backdrop-blur-3xl z-20">
        <button onClick={() => setMenu("explore")} className={`${fonts.bebasNeue} text-lg tracking-widest text-[#FCA133] grow rounded-lg p-2 flex-1/2 border-b-2 ${menu === "explore" ? "bg-[#FCA133]" : ""} ${menu === "explore" ? "text-black" : ""}`}>EXPLORE</button>
        <button onClick={() => setMenu("night-canteen")} className={`${fonts.bebasNeue} text-lg tracking-widest text-[#FCA133] grow rounded-lg p-2 flex-1/2 border-b-2 ${menu === "night-canteen" ? "bg-[#FCA133]" : ""} ${menu === "night-canteen" ? "text-black" : ""}`}>NIGHT-CANTEEN</button>
      </div>
      {menu === "explore" ? (<Explore />) : menu === "night-canteen" ? (<NightCanteen />) : ""}
    </search>
  )
}
