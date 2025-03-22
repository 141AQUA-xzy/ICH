"use client"
import React, { useState } from 'react'
import { io } from 'socket.io-client'
const Orders = () => {
    const socket = io("http://localhost:5000");//Connecting Server-Client by putting backend server URI
    const [data, setData] = useState("")
    socket.on("toAdmin", (data) => {
        console.log(data)
        setData(data)
    })
    return (
        <div>Orders : {data}</div>
    )
}

export default Orders