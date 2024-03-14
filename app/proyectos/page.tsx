import { Metadata } from 'next'

import Breadcrumbs, { Breadcrumb } from '@/app/_components/main/breadcrumbs/breadcrumbs'

import { FaCode } from 'react-icons/fa6'

export const metadata: Metadata = {
    title: 'Proyectos | Jorman Espinoza'
}

export default function Formation() {
    const breadcrumbs: Breadcrumb[] = [
        { label: 'Proyectos', icon: <FaCode /> }
    ]

    return (
        <>
            <Breadcrumbs items={breadcrumbs} />

            <h2>Proyectos</h2>
        </>
    )
}