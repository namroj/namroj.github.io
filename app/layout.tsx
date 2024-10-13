import { ReactNode } from 'react';

import { Metadata } from 'next';
import { ViewTransitions } from 'next-view-transitions';

import { ThemeContextProvider } from '@/providers/theme/ThemeProvider';
import { ExpandCollapseContextProvider } from '@/providers/expand-collapse/ExpandCollapseProvider';

import Header from '@/components/header/Header';
import Sidebar from '@/components/sidebar/Sidebar';
import Main from '@/components/main/Main';
import Footer from '@/components/footer/Footer';

import { jetBrainsMonoFont, cascadiaCodeFont } from '@/fonts/Fonts';
import '@/assets/styles/globals.scss';

export const metadata: Metadata = {
  title: 'Jorman Espinoza',
  description: 'Desarrollador Full Stack',
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <ViewTransitions>
      <html lang="es">
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <body
          className={`${jetBrainsMonoFont.variable} ${cascadiaCodeFont.variable}`}
        >
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
    </ViewTransitions>
  );
}
