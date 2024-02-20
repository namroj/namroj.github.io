import { FC } from 'react'
import Link from 'next/link'
import ThemeToggler from '@/app/_components/theme/toggler'

import './header.scss'

const Header: FC = () => {
    return (
        <header>
            <main>
                <div className="identification">
                    <Link href="/"><h1>Jorman Espinoza</h1></Link>
                    <div className="data">
                        [<span><Link href="/">namroj</Link></span>]
                        <h2>Desarrollador Full Stack</h2>
                    </div>
                </div>
                <ThemeToggler />
            </main>
        </header>
    )
}

export default Header