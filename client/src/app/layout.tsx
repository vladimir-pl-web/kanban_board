import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.scss";
import { APP_NAME } from '@/constants/seo.constants'
import { Providers } from "./providers";
import{Toaster} from 'sonner'

const zen = Noto_Sans({
	subsets: ['cyrillic', 'latin'],
	weight: ['300', '400', '500', '600', '700'],
	display: 'swap',
	variable: '--font-zen',
	style: ['normal']
})

export const metadata: Metadata = {
  title: {
		default: APP_NAME,
		template: `%s | ${APP_NAME}`
	},
  description: "Plan your time!!!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={zen.className}>
        <Providers>
        {children}
        <Toaster 
        theme='light'
        position= 'bottom-right'
        duration={1500}
        />
        </Providers>

        </body>
    </html>
  );
}
