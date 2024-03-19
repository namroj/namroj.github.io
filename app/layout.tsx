import { ReactNode } from 'react'

import { Metadata } from 'next'

import { GeneralContextProvider } from '@/app/_context/general/general-context-provider'
import Header from '@/app/_components/header/header'
import Sidebar from '@/app/_components/sidebar/sidebar'
import Main from '@/app/_components/main/main'
import Footer from '@/app/_components/footer/footer'

import '@/app/_assets/styles/globals.scss'

export const metadata: Metadata = {
  title: 'Jorman Espinoza',
  description: 'Full Stack Developer'
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang='es'>
      <body>
        <GeneralContextProvider>
          <Header />
          <Sidebar />
          <Main>{children}</Main>
          <Footer />
        </GeneralContextProvider>
      </body>
    </html>
  )
}
