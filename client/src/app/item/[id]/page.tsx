"use client"
import { io } from "socket.io-client";

export default function Page({ params }: { params: { id: string } }) {
  const socket = io("http://localhost:5000");//Connecting Server-Client by putting backend server URI

  function toServer() {
    socket.emit("toServer", "From router")
  }

  return (<><h1>ID: {params.id}</h1>
    <button onClick={toServer} className="border m-5">To Server</button>
  </>
  );

}