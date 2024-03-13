import { Metadata } from 'next'

import Breadcrumbs, { Breadcrumb } from '@/app/_components/main/breadcrumbs/breadcrumbs'

import { LuMessagesSquare } from 'react-icons/lu'

export const metadata: Metadata = {
    title: 'Jorman Espinoza | Contacto'
}

export default function Fonts() {
    const breadcrumbs: Breadcrumb[] = [
        { label: 'Contacto', icon: <LuMessagesSquare /> }
    ]

    return (
        <>
            <Breadcrumbs items={breadcrumbs} />

            <h2>Contacto</h2>

            <p><a href="mailto:espinoza.dev@gmail.com" target="_blank">espinoza.dev@gmail.com</a></p>
            <p><a href="https://wa.me/+5491127910154" target="_blank">+54 9 11 27910154</a></p>
        </>
    )
}