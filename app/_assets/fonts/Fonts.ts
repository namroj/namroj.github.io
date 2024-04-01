import { JetBrains_Mono } from 'next/font/google'
import localFont from 'next/font/local'

const jetBrainsMonoFont = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--jetBrainsMonoFont',
})

const cascadiaCodeFont = localFont({
  src: './cascadia-code/CascadiaCode.woff2',
  variable: '--cascadiaCodeFont',
})

export { jetBrainsMonoFont, cascadiaCodeFont }
