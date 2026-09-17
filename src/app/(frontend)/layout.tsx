import { Archivo, Archivo_Black } from 'next/font/google'
import React from 'react'

import { Header } from '@/components/Header'
import { Providers } from '@/components/Providers'

import './globals.scss'

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-archivo',
})

const archivoBlack = Archivo_Black({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-archivo-black',
})

export const metadata = {
  description: 'Camisas de time para todo o Brasil.',
  title: 'Ramos Store',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="pt-BR" className={`${archivo.variable} ${archivoBlack.variable}`}>
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
