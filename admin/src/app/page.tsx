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

export default function Home() {

  const { isLoading } = useLoading();
  const { view } = useView()

  return (
    <search className="md:hidden">
      {isLoading && <Loading />}
      <Menu />
      {view === "PENDING" ? <Orders /> : view === "APPROVED" ? <Approved /> : view === "EDITMENU" ? <MenuEditor /> : view === "OPEN/CLOSE" ? <Status /> : view === "HISTORY" && <History />}
    </search>
  );
}
