import { Metadata } from 'next'

import Breadcrumbs, { Breadcrumb } from '@/app/_components/main/breadcrumbs/breadcrumbs'

import { ImBooks } from 'react-icons/im'

export const metadata: Metadata = {
    title: 'Formación | Jorman Espinoza'
}

export default function Formation() {
    const breadcrumbs: Breadcrumb[] = [
        { label: 'Formación', href: '', icon: <ImBooks /> }
    ]

    return (
        <>
            <Breadcrumbs items={breadcrumbs} />

            <h2>Formación</h2>
        </>
    )
}