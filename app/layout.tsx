import { ReactNode } from 'react';
import { Metadata } from 'next';
import { ViewTransitions } from 'next-view-transitions';

import { ThemeContextProvider } from '@/providers/theme/ThemeProvider';
import { ExpandCollapseContextProvider } from '@/providers/expand-collapse/ExpandCollapseProvider';

import Sidebar from '@/components/sidebar/Sidebar';
import Main from '@/components/main/Main';
import Footer from '@/components/footer/Footer';

import { cascadiaCodeFont, jetBrainsMonoFont } from '@/fonts/Fonts';
import '@/assets/styles/globals.scss';
import { NavigationContextProvider } from '@/providers/navigation/NavigationProvider';

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
          <NavigationContextProvider>
            <Sidebar />
            <Main>
              {children}
            </Main>
            <Footer />
          </NavigationContextProvider>
        </ExpandCollapseContextProvider>
      </ThemeContextProvider>
      </body>
      </html>
    </ViewTransitions>
  );
}