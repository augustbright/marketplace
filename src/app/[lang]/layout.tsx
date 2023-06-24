import './globals.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Inter } from 'next/font/google'
import { Header } from './header.component';
import { Themed } from './themed.component';
import { Locale, i18n } from '../../i18n-config';
import { getDictionary } from '@/get-dictionary';
import { Localization } from './localization.component';
import { Providers } from './providers.component';
import { RootContent } from './root-content';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Marketplace',
  description: 'Trade Easy, Live Better',
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: { lang: Locale }
}) {
  const dictionary = await getDictionary(params.lang);
  return (
    <Providers>
      <html lang={params.lang}>
        <body className={inter.className}>

          <Localization dictionary={dictionary}>
            <Themed>
              <Header />
              <RootContent>
                {children}
              </RootContent>
            </Themed>
          </Localization>

        </body>
      </html>
    </Providers>
  )
}
