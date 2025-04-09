"use client"

import React, { useState } from 'react';
import { ICHHero, ICHSvg } from '../components/ICH.hero';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import { fonts } from '../fonts/Next.fonts';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import ThaliHouse from '../components/nav/menu/thaliHouse/ThaliHouse';
import { useCart } from '../context/Cart.ctx';
import { MainCourse } from '../components/nav/menu/mainCourse/MainCourse';
import { mainCourseDalData, mainCourseRiceData } from '../iterables/MainCourse.iterable';
import { chineseRiceMenu, chineseStarterMenu, momoMenu, pastaMenu, wokChineseMenu } from '../iterables/FusionBites';
import CallIcon from '@mui/icons-material/Call';
import { Toaster, toast } from "react-hot-toast";
import { useMenu } from '../context/Menu.ctx';

export const Explore = () => {

  const { menu } = useMenu()

  // Define data dynamically
  const studentThaliData = {
    title: "Student Thali",
    banner: "/assets/ThaliHouse/student-thali.png",
    items: [
      { image: "/assets/ThaliHouse/roti.png", name: "Roti" },
      { image: "/assets/ThaliHouse/seasonal-sabji.png", name: "Seasonable Sabji" },
      { image: "/assets/ThaliHouse/dal.png", name: "Dal" },
      { image: "/assets/ThaliHouse/rice.png", name: "Rice" },
      { image: "/assets/ThaliHouse/salad.png", name: "Salad" },
    ],
    prices: { standard: menu["Student Thali"]["price-hf"],
      ultimate: menu["Student Thali"]["price-fl"], },
  };

  const standardThaliData = {
    title: "Standard Thali",
    banner: "/assets/ThaliHouse/standard-thali.png",
    items: [
      { image: "/assets/ThaliHouse/roti.png", name: "Roti" },
      { image: "/assets/ThaliHouse/seasonal-sabji.png", name: "Seasonable Sabji 1" },
      { image: "/assets/ThaliHouse/seasonal-sabji2.png", name: "Seasonable Sabji 2" },
      { image: "/assets/ThaliHouse/dal.png", name: "Dal" },
      { image: "/assets/ThaliHouse/jeera-rice.png", name: "Jeera Rice" },
      { image: "/assets/ThaliHouse/salad.png", name: "Salad" },
    ],
    prices: {
      standard: menu["Standard Thali"]["price-hf"],
      ultimate: menu["Standard Thali"]["price-fl"],
    },
  };

  const executiveThaliData = {
    title: "Executive Thali",
    banner: "/assets/ThaliHouse/executive-thali.png",
    items: [
      { image: "/assets/ThaliHouse/butter-roti.png", name: "Butter Roti" },
      { image: "/assets/ThaliHouse/seasonal-sabji.png", name: "Seasonable Sabji 1" },
      { image: "/assets/ThaliHouse/seasonal-sabji.png", name: "Seasonable Sabji 2" },
      { image: "/assets/ThaliHouse/papad.png", name: "Papad" },
      { image: "/assets/ThaliHouse/paneer-sabji.png", name: "Paneer Sabji" },
      { image: "/assets/ThaliHouse/dal.png", name: "Dal" },
      { image: "/assets/ThaliHouse/jeera-rice.png", name: "Jeera Rice" },
      { image: "/assets/ThaliHouse/salad.png", name: "Salad" },
    ],
    prices: { standard: menu["Executive Thali"]["price-hf"],
      ultimate: menu["Executive Thali"]["price-fl"], },
  };

  const premiumThaliData = {
    title: "Premium Thali",
    banner: "/assets/ThaliHouse/premium-thali.png",
    items: [
      { image: "/assets/ThaliHouse/butter-roti.png", name: "Butter Roti" },
      { image: "/assets/ThaliHouse/seasonal-sabji.png", name: "Seasonable Sabji 1" },
      { image: "/assets/ThaliHouse/seasonal-sabji2.png", name: "Seasonable Sabji 2" },
      { image: "/assets/ThaliHouse/paneer-sabji.png", name: "Paneer Sabji" },
      { image: "/assets/ThaliHouse/dal-tadka.png", name: "Dal Tadka" },
      { image: "/assets/ThaliHouse/jeera-rice.png", name: "Jeera Rice" },
      { image: "/assets/ThaliHouse/salad.png", name: "Salad" },
      { image: "/assets/ThaliHouse/papad.png", name: "Papad" },
      { image: "/assets/ThaliHouse/raita.png", name: "Raita" },
      { image: "/assets/ThaliHouse/sweet.png", name: "Sweet" },
    ],
    prices: { standard: menu["Premium Thali"]["price-hf"],
      ultimate: menu["Premium Thali"]["price-fl"], },
  };

  const { addToCart } = useCart()

  function Toast() {
    toast.success("Item added to cart", {
      duration: 2000,
      style: {
        fontWeight: 600,
      },
    });
  }
  // Function to handle Standard Thali click
  const handleStandardClick = (title: string, price: number, code: "LT", img: string) => {
    addToCart({ itemName: title, price: price, code: code, quantity: 1, img }); // ✅ Correct way to pass values
    Toast()
  };
  // Function to handle Ultimate Thali click
  const handleUltimateClick = (title: string, price: number, code: "ULT", img: string) => {
    addToCart({ itemName: title, price: price, code: code, quantity: 1, img }); // ✅ Correct way to pass values
    Toast()
  };

  const [assist, setAssist] = useState<number>(0);

  return (
    <search className='h-auto'>
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className={`h-dvh w-full backdrop-blur-2xl fixed top-0 z-50 transition-all ease duration-1000 ${assist ? "visible" : "hidden"}`}>
        <div className={`h-1/2 w-3/4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/3  rounded-2xl flex flex-col items-center gap-1`}>
          {/* <button className='border h-2'></button> */}
          <ICHHero />
          <div className='h-full rounded-2xl w-full bg-gradient-to-t from-[rgba(20,33,61,0.3)] to-[rgba(252,163,17,0.4)] flex flex-col gap-2 p-2 overflow-y-scroll'>
            <div className='flex-1 bg-[#FCA331] rounded-2xl flex flex-col justify-center p-1'>
              <text className={`text-3xl text-center w-full ${fonts.luckiestGuy}`}>MASS ORDERS</text>
              <p className='text-sm p-2 pt-0 text-center'>We offer bulk orders for parties, events, and corporate needs with customized options and special pricing. Contact us now for inquiries, personalized assistance, and seamless ordering.
                Let’s serve you better...!</p>
              <a href="tel:+918770025814" className='rounded-lg bg-[#14213d] text-[#FCA331] text-center'> <CallIcon />{" "}ENQUIRE NOW</a>
            </div>
            <div className='flex-1 bg-[#FCA331] rounded-2xl flex flex-col justify-center p-1'>
              <text className={`text-3xl text-center w-full ${fonts.luckiestGuy}`}>SPONSORSHIP OPPORTUNITIES</text>
              <p className='text-sm p-2 pt-0 text-center'>Becoming a sponsor allows you to leverage collaboration benefits such as increased brand exposure, audience engagement, networking opportunities, trust-building, and long-term profitability through strategic alliances, event promotions, and community-driven marketing efforts.</p>
              <a href="tel:+918770025814" className='rounded-lg bg-[#14213d] text-[#FCA331] text-center'> <CallIcon />{" "}ENQUIRE NOW</a>
            </div>
          </div>
        </div>
      </div>
      <div onClick={() => setAssist(assist === 0 ? 1 : 0)} style={{ boxShadow: "0px 0px 30px orange", zIndex: 1000 }} className={`rounded-full bg-[#14213d] h-12 w-12 fixed bottom-14 left-1/2 transform -translate-x-1/2 shadow-lg shadow-white`}>
        <ICHSvg />
      </div>
      {/* THALI HOUSE */}
      <section className='h-auto w-full border flex flex-col gap-1 mb-6'>
        <div className='w-full h-auto bg-[linear-gradient(to_right,#FCA133_84%,#14213d_84%)] p-2 rounded-xl flex justify-between items-center'>
          <code className={`${fonts.luckiestGuy} text-2xl font-extrabold tracking-widest`}><FoodBankIcon sx={{ fontSize: "200%" }} className='animate animate-bounce' />{" "}THALI HOUSE </code>
          <div className='relative h-12 w-12'>
            <ICHSvg />
          </div>
        </div>
        <div className='h-[50vh] bg-gradient-to-r from-[rgba(20,33,61,0.3)] to-[rgba(252,163,17,0.4)] grow rounded-2xl overflow-x-scroll'>
          <div className='w-max h-full flex gap-5 carouselX'>
            {menu["Student Thali"]?.AVL && (
              <ThaliHouse
                {...studentThaliData}
                onStandardClick={() => handleStandardClick(studentThaliData.title, studentThaliData.prices.standard ?? 0, "LT", studentThaliData.banner)}
                onUltimateClick={() => handleUltimateClick(studentThaliData.title, studentThaliData.prices.ultimate, "ULT", studentThaliData.banner)}
              />)}
            {menu["Standard Thali"]?.AVL && (
              <ThaliHouse
                {...standardThaliData}
                onStandardClick={() => handleStandardClick(standardThaliData.title, standardThaliData.prices.standard ?? 0, "LT", standardThaliData.banner)}
                onUltimateClick={() => handleUltimateClick(standardThaliData.title, standardThaliData.prices.ultimate, "ULT", standardThaliData.banner)}
              />
            )}
            {menu["Executive Thali"]?.AVL && (
              <ThaliHouse
                {...executiveThaliData}
                onStandardClick={() => handleStandardClick(executiveThaliData.title, executiveThaliData.prices.standard ?? 0, "LT", executiveThaliData.banner)}
                onUltimateClick={() => handleUltimateClick(executiveThaliData.title, executiveThaliData.prices.ultimate, "ULT", executiveThaliData.banner)}
              />)}
            {menu["Premium Thali"]?.AVL && (
              <ThaliHouse
                {...premiumThaliData}
                onStandardClick={() => handleStandardClick(premiumThaliData.title, premiumThaliData.prices.standard ?? 0, "LT", premiumThaliData.banner)}
                onUltimateClick={() => handleUltimateClick(premiumThaliData.title, premiumThaliData.prices.ultimate, "ULT", premiumThaliData.banner)}
              />)}
          </div>
        </div>
      </section>
      {/* MAIN COURSE */}
      <section className='h-auto w-full border flex flex-col gap-1 mb-6'>
        <div className='w-full h-auto bg-[linear-gradient(to_right,#FCA133_84%,#14213d_84%)] p-2 rounded-xl flex justify-between items-center'>
          <code className={`${fonts.luckiestGuy} text-2xl font-extrabold tracking-widest`}><BakeryDiningIcon sx={{ fontSize: "200%" }} className='animate animate-bounce' />{" "}MAIN COURSE </code>
          <div className='relative h-12 w-12'>
            <ICHSvg />
          </div>
        </div>
        <div className='h-max flex flex-col bg-gradient-to-r from-[rgba(20,33,61,0.3)] to-[rgba(252,163,17,0.4)] grow rounded-2xl overflow-x-scroll'>
          <text className='bg-[#FCA331] text-black sticky left-0 text-center w-full'>DAL</text>
          <div className='w-max h-full flex relative carouselX'>
            {mainCourseDalData
              .filter((item) => {
                const entry = menu[item.title];
                return entry && entry.AVL;
              })
              .map((item, index) => {
                const entry = menu[item.title];
                const price_hf = entry?.["price-hf"] ?? 0;
                const price_fl = entry?.["price-fl"] ?? 0;

                return (
                  <MainCourse
                    key={index}
                    img={item.img}
                    title={item.title}
                    price_hf={price_hf}
                    price_fl={price_fl}
                    hfClicked={() =>{
                      addToCart({
                        itemName: item.title,
                        code: "HF",
                        quantity: 1,
                        price: price_hf,
                        img: item.img,
                      })
                      Toast()
                    }
                    }
                    ffClicked={() =>{
                      addToCart({
                        itemName: item.title,
                        code: "FL",
                        quantity: 1,
                        price: price_fl,
                        img: item.img,
                      })
                    Toast()}
                    }
                  />
                );
              })}

          </div>
        </div>
        <div className='h-max flex flex-col bg-gradient-to-r from-[rgba(20,33,61,0.3)] to-[rgba(252,163,17,0.4)] grow rounded-2xl overflow-x-scroll'>
          <text className='bg-[#FCA331] text-black sticky left-0 text-center w-full'>RICE</text>
          <div className='w-max h-full flex relative carouselX'>
            {mainCourseRiceData.filter((item) => {
              const entry = menu[item.title];
              return entry && entry.AVL;
            })
              .map((item, index) => {
                const entry = menu[item.title];
                const price_hf = entry?.["price-hf"] ?? 0;
                const price_fl = entry?.["price-fl"] ?? 0;

                return (
                  <MainCourse
                    key={index}
                    img={item.img}
                    title={item.title}
                    price_hf={price_hf}
                    price_fl={price_fl}
                    hfClicked={() =>{
                      Toast()
                      addToCart({
                        itemName: item.title,
                        code: "HF",
                        quantity: 1,
                        price: price_hf,
                        img: item.img,
                      })}
                    }
                    ffClicked={() =>{
                      addToCart({
                        itemName: item.title,
                        code: "FL",
                        quantity: 1,
                        price: price_fl,
                        img: item.img,
                      })
                      Toast()}
                    }
                  />
                );
              })}
          </div>
        </div>
        {/* <MainCourseOverflow /> */}
      </section>
      {/* FUSION-BITES-DONE */}
      <section className='h-auto w-full border flex flex-col gap-1'>
        <div className='w-full h-auto bg-[linear-gradient(to_right,#FCA133_84%,#14213d_84%)] p-2 rounded-xl flex justify-between items-center'>
          <code className={`${fonts.luckiestGuy} text-2xl font-extrabold tracking-widest`}><FastfoodIcon sx={{ fontSize: "180%", margin: "2px" }} className='animate animate-bounce' />{" "}FUSION-BITES</code>
          <div className='relative h-12 w-12'>
            <ICHSvg />
          </div>
        </div>
        <div className='h-max relative flex flex-col bg-gradient-to-r from-[rgba(20,33,61,0.3)] to-[rgba(252,163,17,0.4)] grow rounded-2xl overflow-x-scroll'>
          <text className='bg-[#FCA331] text-black sticky left-0 text-center w-full'>MOMOS</text>
          <div className='w-max h-full flex relative carouselX'>
            {momoMenu.filter((item) => {
              const entry = menu[item.title];
              return entry && entry.AVL;
            })
              .map((item, index) => {
                const entry = menu[item.title];
                const price_hf = entry?.["price-hf"] ?? 0;
                const price_fl = entry?.["price-fl"] ?? 0;

                return (
                  <MainCourse
                    key={index}
                    img={item.img}
                    title={item.title}
                    price_hf={price_hf}
                    price_fl={price_fl}
                    hfClicked={() =>
                      addToCart({
                        itemName: item.title,
                        code: "HF",
                        quantity: 1,
                        price: price_hf,
                        img: item.img,
                      })
                    }
                    ffClicked={() =>
                      addToCart({
                        itemName: item.title,
                        code: "FL",
                        quantity: 1,
                        price: price_fl,
                        img: item.img,
                      })
                    }
                  />
                );
              })}
          </div>
        </div>
        <div className='h-max relative flex flex-col bg-gradient-to-r from-[rgba(20,33,61,0.3)] to-[rgba(252,163,17,0.4)] grow rounded-2xl overflow-x-scroll'>
          <text className='bg-[#FCA331] text-black sticky left-0 text-center w-full'>CHINESE RICE</text>
          <div className='w-max h-full flex relative carouselX'>
            {chineseRiceMenu.filter((item) => {
              const entry = menu[item.title];
              return entry && entry.AVL;
            })
              .map((item, index) => {
                const entry = menu[item.title];
                const price_hf = entry?.["price-hf"] ?? 0;
                const price_fl = entry?.["price-fl"] ?? 0;

                return (
                  <MainCourse
                    key={index}
                    img={item.img}
                    title={item.title}
                    price_hf={price_hf}
                    price_fl={price_fl}
                    hfClicked={() =>
                      addToCart({
                        itemName: item.title,
                        code: "HF",
                        quantity: 1,
                        price: price_hf,
                        img: item.img,
                      })
                    }
                    ffClicked={() =>
                      addToCart({
                        itemName: item.title,
                        code: "FL",
                        quantity: 1,
                        price: price_fl,
                        img: item.img,
                      })
                    }
                  />
                );
              })}
          </div>
        </div>
        <div className='h-max relative flex flex-col bg-gradient-to-r from-[rgba(20,33,61,0.3)] to-[rgba(252,163,17,0.4)] grow rounded-2xl overflow-x-scroll'>
          <text className='bg-[#FCA331] text-black sticky left-0 text-center w-full'>WOK CHINESE</text>
          <div className='w-max h-full flex relative carouselX'>
            {wokChineseMenu.filter((item) => {
              const entry = menu[item.title];
              return entry && entry.AVL;
            })
              .map((item, index) => {
                const entry = menu[item.title];
                const price_hf = entry?.["price-hf"] ?? 0;
                const price_fl = entry?.["price-fl"] ?? 0;

                return (
                  <MainCourse
                    key={index}
                    img={item.img}
                    title={item.title}
                    price_hf={price_hf}
                    price_fl={price_fl}
                    hfClicked={() =>
                      addToCart({
                        itemName: item.title,
                        code: "HF",
                        quantity: 1,
                        price: price_hf,
                        img: item.img,
                      })
                    }
                    ffClicked={() =>
                      addToCart({
                        itemName: item.title,
                        code: "FL",
                        quantity: 1,
                        price: price_fl,
                        img: item.img,
                      })
                    }
                  />
                );
              })}
          </div>
        </div>
        <div className='h-max relative flex flex-col bg-gradient-to-r from-[rgba(20,33,61,0.3)] to-[rgba(252,163,17,0.4)] grow rounded-2xl overflow-x-scroll'>
          <text className='bg-[#FCA331] text-black sticky left-0 text-center w-full'>PASTA</text>
          <div className='w-max h-full flex relative carouselX'>
            {pastaMenu.filter((item) => {
              const entry = menu[item.title];
              return entry && entry.AVL;
            })
              .map((item, index) => {
                const entry = menu[item.title];
                const price_hf = entry?.["price-hf"] ?? 0;
                const price_fl = entry?.["price-fl"] ?? 0;

                return (
                  <MainCourse
                    key={index}
                    img={item.img}
                    title={item.title}
                    price_hf={price_hf}
                    price_fl={price_fl}
                    hfClicked={() =>
                      addToCart({
                        itemName: item.title,
                        code: "HF",
                        quantity: 1,
                        price: price_hf,
                        img: item.img,
                      })
                    }
                    ffClicked={() =>
                      addToCart({
                        itemName: item.title,
                        code: "FL",
                        quantity: 1,
                        price: price_fl,
                        img: item.img,
                      })
                    }
                  />
                );
              })}
          </div>
        </div>
        <div className='h-max relative flex flex-col bg-gradient-to-r from-[rgba(20,33,61,0.3)] to-[rgba(252,163,17,0.4)] grow rounded-2xl overflow-x-scroll'>
          <text className='bg-[#FCA331] text-black sticky left-0 text-center w-full'>CHINESE STARTER</text>
          <div className='w-max h-full flex relative carouselX'>
            {chineseStarterMenu.filter((item) => {
              const entry = menu[item.title];
              return entry && entry.AVL;
            })
              .map((item, index) => {
                const entry = menu[item.title];
                const price_hf = entry?.["price-hf"] ?? 0;
                const price_fl = entry?.["price-fl"] ?? 0;

                return (
                  <MainCourse
                    key={index}
                    img={item.img}
                    title={item.title}
                    price_hf={price_hf}
                    price_fl={price_fl}
                    hfClicked={() =>
                      addToCart({
                        itemName: item.title,
                        code: "HF",
                        quantity: 1,
                        price: price_hf,
                        img: item.img,
                      })
                    }
                    ffClicked={() =>
                      addToCart({
                        itemName: item.title,
                        code: "FL",
                        quantity: 1,
                        price: price_fl,
                        img: item.img,
                      })
                    }
                  />
                );
              })}
          </div>
        </div>
      </section>
    </search>
  )
}



export const NightCanteen = () => {

  return (
    <search className='text-black rounded-2xl h-[80vh] bg-[#FCA331] flex justify-center items-center'>
      <text>
        Coming Soon...  </text>
    </search>
  )
}