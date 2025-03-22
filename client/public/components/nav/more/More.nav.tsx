import React from 'react'
import { MoreIt } from '../../../iterators/More.menu';
import { MoreIterator } from '../../../iterables/More.iterable';
import { useRouter } from 'next/navigation';
import { useUser } from '../../../context/Session.ctx';
import { useCart } from '../../../context/Cart.ctx';

export const More = () => {
    const { logout } = useUser()
    const { clearCart } = useCart()
    const router = useRouter()
    return (<search className='h-[80vh] w-full backdrop-blur-lg flex justify-center items-center scroll-auto'>
        <section className='h-1/2 w-3/4 rounded-2xl flex flex-col overflow-y-scroll border border-amber-400 p-2'>
            {MoreIterator(router, logout, clearCart).map((item, index) => (
                <MoreIt key={index} title={item.title} icon={item.icon} handleClick={item.handleClick} />
            ))}
        </section>
    </search>)
}
