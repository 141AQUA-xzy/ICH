"use client";
import { useEffect } from "react";
import { useLoading } from "../../public/context/Loading.ctx";
import { Orders } from "../../public/components/nav/Orders.nav";

export default function Home() {

  const { isLoading } = useLoading();

  return (
    <Orders />
  );
}
