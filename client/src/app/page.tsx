"use client"
import { useEffect } from "react";
import { io } from "socket.io-client";
import { HomeNav } from "../../public/components/nav/home/Home.nav";
import { MenuPage } from "../../public/components/nav/menu/Menu.nav";
import OrderBag from "../../public/components/nav/orderbag/OrderBag.nav";
import { More } from "../../public/components/nav/more/More.nav";
import Nav from "../../public/components/nav/Nav.nav";
import { useView } from "../../public/context/View.ctx";
import { useUser } from "../../public/context/Session.ctx";
import { useRouter } from "next/navigation";

export default function Home() {

  const { user } = useUser()
  const router = useRouter()
  // const [session, setSession] = useState(localStorage.getItem("session"))

  useEffect(() => {
    if (!user) {
      router.push("/user")
    }
  }, [])

  const { view } = useView()

  const socket = io("http://localhost:5000");//Connecting Server-Client by putting backend server URI

  useEffect(() => {
    socket.on("client", (data) => {
      console.log(data)
    })
    socket.on("message", (data) => {
      console.log(data.message)
    })
    socket.emit("message", { message: "Client to Server" })

    // Cleanup function to remove event listeners on component unmount
    // return () => {
    //   socket.off("client");
    //   socket.off("message");
    // };
  }, [])

  return (
    <section className="bg-fixed bg-gradient-to-t from-[rgba(20,33,61,0.3)] to-[rgba(252,163,17,0.4)] p-0.5">
      {view === "Home" ? (<HomeNav />) : view === "Menu" ? (
        <MenuPage />
      ) : view === "Order-Bag" ? (<OrderBag />) : view === "More" ? (<More />) : view === "Services" ? (<div>Services Section</div>) : view === "Offers" ? (<div>Special Offers</div>) : view === "Collab" && (<div>Collaborate</div>)}
      <Nav />
    </section>
  );
}
