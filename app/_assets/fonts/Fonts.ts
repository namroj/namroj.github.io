import { JetBrains_Mono as jetBrainsMono } from 'next/font/google';
import localFont from 'next/font/local';

const jetBrainsMonoFont = jetBrainsMono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--jetBrainsMonoFont',
});

const cascadiaCodeFont = localFont({
  src: './cascadia-code/CascadiaCode.woff2',
  variable: '--cascadiaCodeFont',
});

export { jetBrainsMonoFont, cascadiaCodeFont };
