"use client"
import { useEffect, useState } from "react";
import { HomeNav } from "../../public/components/nav/home/Home.nav";
import { MenuPage } from "../../public/components/nav/menu/Menu.nav";
import OrderBag from "../../public/components/nav/orderbag/OrderBag.nav";
import { More } from "../../public/components/nav/more/More.nav";
import Nav from "../../public/components/nav/Nav.nav";
import { useView } from "../../public/context/View.ctx";
import { useUser } from "../../public/context/Session.ctx";
import { useRouter } from "next/navigation";
import { useLoading } from "../../public/context/Loading.ctx";
import { Loading } from "../../public/components/loader/Loading";
import NearbyOffIcon from '@mui/icons-material/NearbyOff';


export default function Home() {

  const { user } = useUser()
  const { isLoading, showLoading, hideLoading } = useLoading()
  const router = useRouter()
  // const [session, setSession] = useState(localStorage.getItem("session"))

  const [open, setStatus] = useState()

  const resStatus = async () => {
    showLoading()
    try {
      const res = await fetch("https://ich-1gjz.onrender.com/admin/grscode");
      const data = await res.json();
      setStatus(data.status); // ✅ Set state from response
    } catch (error) {
      console.error("Failed to fetch status:", error);
    }finally{
      hideLoading()
    }
  };
  useEffect(() => {
    resStatus();
  }, []);

  useEffect(() => {
    if (user === undefined) return; // ⛔ Wait for user confirmation (strict check)
    showLoading()

    if (user) {
      router.push("/");
      hideLoading()
    } else {
      router.push("/user");
      hideLoading()
    }
  }, [user]); // ✅ Depend on `user`, so it runs again when user state updates

  const { view } = useView()

  return (
    <section className="bg-fixed bg-gradient-to-t from-[rgba(20,33,61,0.3)] to-[rgba(252,163,17,0.4)] p-0.5">
      {!open ? <div className="w-full bg-red-600 fixed z-[100000020200202020] rounded-2xl p-2 bottom-14 animate-pulse flex flex-col"><code><NearbyOffIcon />{" "}CURRENTLY NOT RECEIVING ORDERS</code><address className="text-sm"></address></div> : ""}
      <h1 className="text-3xl font-bold">
      </h1>
      {isLoading && <Loading />}
      {view === "Home" ? (<HomeNav />) : view === "Menu" ? (
        <MenuPage />
      ) : view === "Order-Bag" ? (<OrderBag />) : view === "More" ? (<More />) : view === "Services" ? (<div>Services Section</div>) : view === "Offers" ? (<div>Special Offers</div>) : view === "Collab" && (<div>Collaborate</div>)}
      <Nav />
    </section>
  );
}
