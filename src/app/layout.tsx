import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lasting Buys | Products That Last Forever',
  description: 'Get daily recommendations for products that never break.',
  icons: {
    icon: '/favicon.png',
    // You can also add these for mobile devices
    apple: '/apple-icon.png',
    shortcut: '/favicon.png'
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}