import { Metadata } from 'next'
import { GeneralContextProvider } from '@/app/_context/general/general-context-provider'

import Header from './_components/header/header'
import Sidebar from './_components/sidebar/sidebar'
import Main from './_components/main/main'
import Footer from './_components/footer/footer'

import '@/app/_assets/styles/globals.scss'

export const metadata: Metadata = {
  title: 'Jorman Espinoza',
  description: 'Full Stack Developer'
}

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="es">
      <body>
        <GeneralContextProvider>
          <Header />
          <Sidebar />
          <Main>
            {children}
          </Main>
          <Footer />
        </GeneralContextProvider>
      </body>
    </html >
  )
}

export default RootLayout
