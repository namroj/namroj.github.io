import { ReactNode } from 'react';
import { Metadata } from 'next';
import Head from 'next/head';
import { ViewTransitions } from 'next-view-transitions';

import Footer from '@/components/footer/Footer';
import Main from '@/components/main/Main';
import Sidebar from '@/components/sidebar/Sidebar';
import GoogleAnalytics from '@/app/google-analytics';

import { ExpandCollapseContextProvider } from '@/providers/expand-collapse/ExpandCollapseProvider';
import { NavigationContextProvider } from '@/providers/navigation/NavigationProvider';
import { ThemeContextProvider } from '@/providers/theme/ThemeProvider';

import { cascadiaCodeFont, jetBrainsMonoFont } from '@/fonts/Fonts';

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
      <Head>
        <GoogleAnalytics />
      </Head>
      <body
        className={`${jetBrainsMonoFont.variable} ${cascadiaCodeFont.variable}`}
      >
      <ThemeContextProvider>
        <ExpandCollapseContextProvider>
          <NavigationContextProvider>
            <Sidebar />
            <Main>{children}</Main>
            <Footer />
          </NavigationContextProvider>
        </ExpandCollapseContextProvider>
      </ThemeContextProvider>
      </body>
      </html>
    </ViewTransitions>
  );
}
