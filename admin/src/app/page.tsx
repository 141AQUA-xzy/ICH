"use client";
import { useLoading } from "../../public/context/Loading.ctx";
import { Orders } from "../../public/components/nav/Orders.nav";
import { Menu } from "../../public/components/nav/Menu.nav";
import { useView } from "../../public/context/View.ctx";
import { Approved } from "../../public/components/nav/Approved.nav";
import { Status } from "../../public/components/nav/Status.nav";
import MenuEditor from "../../public/components/nav/EditMenu.nav";
import { History } from "../../public/components/nav/History.nav";
import { Loading } from "../../public/loaders/Loading";
import { useEffect, useState } from "react";
import ReviewsPage from "../../public/components/nav/Reviews.nav";

export default function Home() {

  const { view } = useView()
  
  const { isLoading, showLoading, hideLoading } = useLoading()
  const [open, setStatus] = useState<boolean | null>(null); // start with null to wait for API
  const [showBanner, setShowBanner] = useState(false);

  const resStatus = async () => {
    showLoading()
    try {
      const res = await fetch("https://restaurant-apis-za52.onrender.com/admin/grscode");
      const data = await res.json();
      setStatus(data.status); // ✅ Set state from response
    } catch (error) {
      console.error("Failed to fetch status:", error);
    } finally {
      hideLoading()
    }
  };

  useEffect(() => {
    resStatus();
  }, []);
  
  useEffect(() => {
    if (open !== null) {
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 3000); // 3 seconds
  
      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <search className="md:hidden">
          {showBanner && !open && (
        <div className="opacity-100 w-full bg-red-600 fixed z-[100000020200202020] rounded-2xl p-2 bottom-2 animate-pulse flex justify-center items-center">
          <code>"NEW DAY,NEW SPIRIT"-PLEASE OPEN</code>
        </div>
      )}
      {isLoading && <Loading />}
      <Menu />
      {view === "PENDING" ? <Orders /> : view === "APPROVED" ? <Approved /> : view === "EDITMENU" ? <MenuEditor /> : view === "OPEN/CLOSE" ? <Status /> : view === "HISTORY" ? <History /> : view === "REVIEWS" && <ReviewsPage />}
    </search>
  );
}
