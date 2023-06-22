import './globals.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Inter } from 'next/font/google'
import { Header } from './[lang]/header.component';
import { Themed } from './[lang]/themed.component';
import { Locale, i18n } from '../i18n-config';
import { getDictionary } from '@/get-dictionary';
import { Localization } from './[lang]/localization.component';
import { AuthProvider } from './[lang]/auth.component';

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
  console.log('render root layout')
  // const dictionary = await getDictionary(params.lang);
  // console.log('dictionary', dictionary);
  return (
    <AuthProvider>
      <html lang={params.lang}>
        <body className={inter.className}>

          {/* <Localization dictionary={dictionary}> */}
          {/* <Themed> */}
          <Header />
          {children}
          {/* </Themed> */}
          {/* </Localization> */}

        </body>
      </html>
    </AuthProvider>
  )
}
