import { ReactNode } from 'react';
import { Metadata, Viewport } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { ViewTransitions } from 'next-view-transitions';

import Footer from '@/components/footer/Footer';
import Main from '@/components/main/Main';
import Sidebar from '@/components/sidebar/Sidebar';

import { ExpandCollapseContextProvider } from '@/providers/expand-collapse/ExpandCollapseProvider';
import { NavigationContextProvider } from '@/providers/navigation/NavigationProvider';
import { ThemeContextProvider } from '@/providers/theme/ThemeProvider';
import { LanguageProvider } from '@/providers/language/LanguageProvider';

import { cascadiaCodeFont, jetBrainsMonoFont } from '@/fonts/Fonts';

import '@/assets/styles/globals.scss';

export const metadata: Metadata = {
  title: 'Jorman Espinoza',
  description: 'Desarrollador Full Stack',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <ViewTransitions>
      <html lang="es">
        <body
          className={`${jetBrainsMonoFont.variable} ${cascadiaCodeFont.variable}`}
        >
          <GoogleAnalytics gaId="G-SZZ5X56S6P" />
          <LanguageProvider>
            <ThemeContextProvider>
              <ExpandCollapseContextProvider>
                <NavigationContextProvider>
                  <Sidebar />
                  <Main>{children}</Main>
                  <Footer />
                </NavigationContextProvider>
              </ExpandCollapseContextProvider>
            </ThemeContextProvider>
          </LanguageProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
