import Link from 'next/link'
import React from 'react'

const LayoutRoute = () => {
    return (
        <div>
            <h1>From Menu</h1>
            <Link href="/item/123">Item[id]</Link>
            <Link href="/home">Home</Link>
        </div>
    )
}

export default LayoutRoute