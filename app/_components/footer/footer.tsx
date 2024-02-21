import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import nextJsLogo from '@/app/_assets/icons/next.png'

import './footer.scss'

const Footer: FC = () => {
    return (
        <footer>
            <span>© 2024 | por <Link href="/">namroj</Link> mediante{' '}</span>
            <a href="https://nextjs.org/" target="_blank">
                <Image
                    src={nextJsLogo}
                    alt="Next.js"
                    width={25}
                    height={25}
                    priority
                />
            </a>
        </footer>
    )
}

export default Footer