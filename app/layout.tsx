import { ReactNode } from 'react'

import { Metadata } from 'next'

import { ThemeContextProvider } from '@/app/_context-providers/theme/ThemeProvider'
import { ExpandCollapseContextProvider } from '@/app/_context-providers/expand-collapse/ExpandCollapseProvider'

import Header from '@/app/_components/header/header'
import Sidebar from '@/app/_components/sidebar/sidebar'
import Main from '@/app/_components/main/main'
import Footer from '@/app/_components/footer/footer'

import '@/app/_assets/styles/globals.scss'

export const metadata: Metadata = {
  title: 'Jorman Espinoza',
  description: 'Desarrollador Full Stack'
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang='es'>
      <body>
        <ThemeContextProvider>
          <ExpandCollapseContextProvider>
            <Header />
            <Sidebar />
            <Main>{children}</Main>
            <Footer />
          </ExpandCollapseContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  )
}
