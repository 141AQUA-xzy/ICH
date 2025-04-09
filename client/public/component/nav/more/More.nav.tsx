import React from 'react'
import { MoreIt } from '../../../iterators/More.menu';
import { MoreIterator } from '../../../iterables/More.iterable';
import { useRouter } from 'next/navigation';
import { useUser } from '../../../context/Session.ctx';
import { useCart } from '../../../context/Cart.ctx';
import { useLoading } from '../../../context/Loading.ctx';
import { useView } from '../../../context/View.ctx';

export const More = () => {
    const { logout, user } = useUser()
    const { setView } = useView()
    const { clearCart } = useCart()
    const { showLoading, hideLoading } = useLoading()
    const router = useRouter()
  
    return (<search className='h-[80vh] w-full backdrop-blur-lg flex justify-center items-center scroll-auto'>
        <section className='h-1/2 w-3/4 rounded-2xl flex flex-col overflow-y-scroll border border-amber-400 p-2'>
            {MoreIterator(router, showLoading, hideLoading, logout, clearCart, setView, user?._id??undefined ).map((item, index) => (
                <MoreIt key={index} title={item.title} icon={item.icon} handleClick={item.handleClick} />
            ))}
        </section>
    </search>)
}
