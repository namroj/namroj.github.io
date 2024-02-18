import { Metadata } from 'next'
import { ThemeContextProvider } from '@/app/_context/theme/theme-provider'
import ThemeToggler from '@/app/_components/theme-toggler/theme-toggler'

import './globals.css'

export const metadata: Metadata = {
  title: 'Jorman Espinoza',
  description: 'Full Stack Developer'
}

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="es">
      <body>
        <ThemeContextProvider>
          <ThemeToggler />
          {children}
        </ThemeContextProvider>
      </body>
    </html>
  )
}

export default RootLayout
