import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dice Roller',
  description: 'A simple and fun dice rolling application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        {children}
      </body>
    </html>
  )
}