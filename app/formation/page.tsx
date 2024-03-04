import Breadcrumbs, { BreadcrumbItem } from '@/app/_components/main/breadcrumbs/breadcrumbs'

import { IoSchoolSharp } from 'react-icons/io5'

export default function Formation() {
    const breadcrumbs: BreadcrumbItem[] = [
        { label: 'Formación', href: '', icon: <IoSchoolSharp /> }
    ]

    return (
        <>
            <Breadcrumbs items={breadcrumbs} />

            <h2>Formación</h2>
        </>
    )
}