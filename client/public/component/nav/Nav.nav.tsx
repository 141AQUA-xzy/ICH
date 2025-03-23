import React from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import KitchenIcon from '@mui/icons-material/Kitchen';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import { useView } from '../../context/View.ctx';
import { useCart } from '../../context/Cart.ctx';
import { fonts } from '../../fonts/Next.fonts';

const Nav = () => {
    const { setView, view } = useView()
    const { cartItemCount } = useCart()
    return (
        <nav className={`fixed bottom-0 h-max max-h= w-full flex justify-between items-center border bg-[#FCA311] p-3 px-6 rounded-t-3xl z-50`}>
            <HomeIcon className={`${view === "Home" ? "bg-black" : ""} ${view === "Home" ? "text-[#FCA311]" : ""}`} onClick={() => setView("Home")} sx={{ "&:hover": { transform: "scale(1.5)", transition: "ease 0.5s", background: "black", borderRadius: "20%", color: "#FCA133", padding: "1%", borderBottom: "2px solid black" }, }} />
            <KitchenIcon className={`${view === "Menu" ? "bg-black" : ""} ${view === "Menu" ? "text-[#FCA311]" : ""}`} onClick={() => setView("Menu")} sx={{ "&:hover": { transform: "scale(1.5)", transition: "ease 0.5s", background: "black", borderRadius: "20%", color: "#FCA133", padding: "1%", borderBottom: "2px solid black" }, }} />
            <div className='relative flex flex-col gap-0 h-full max-h-full'>
                <kbd className={`absolute -right-3 px-1 -top-4 ${view === "Order-Bag" ? "bg-black" : "bg-[#FCA331]"} rounded-full ${view === "Order-Bag" ? "text-[#FCA331]" : "text-[#14213d]"}  text-sm ${cartItemCount === 0 ? "hidden" : "block"} flex-1/5 z-50 pointer-events-none font-extrabold ${fonts.montserrat}`}>{cartItemCount}</kbd>
                <ShoppingCartIcon className={`transform ${view === "Order-Bag" ? "bg-black" : ""} grow  ${view === "Order-Bag" ? "text-[#FCA311]" : ""}`} onClick={() => setView("Order-Bag")} sx={{ "&:hover": { transform: "scale(1.5)", transition: "ease 0.5s", background: "black", borderRadius: "20%", color: "#FCA133", padding: "1%", borderBottom: "2px solid black" }, }} />
            </div>
            <MenuIcon className={`${view === "More" ? "bg-black" : ""} ${view === "More" ? "text-[#FCA311]" : ""}`} onClick={() => setView("More")} sx={{ "&:hover": { transform: "scale(1.5)", transition: "ease 0.5s", background: "black", borderRadius: "20%", color: "#FCA133", padding: "1%", borderBottom: "2px solid black" }, }} />
        </nav>
    )
}
export default Nav