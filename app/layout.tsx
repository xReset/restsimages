import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RestsImages.pics - Personal Hub & GIF CDN',
  description: 'Personal online hub with Discord status, projects, and GIF CDN for sharing custom animations.',
  keywords: 'personal website, discord status, gif cdn, projects, portfolio',
  authors: [{ name: 'RestsImages' }],
  openGraph: {
    title: 'RestsImages.pics',
    description: 'Personal online hub with Discord status, projects, and GIF CDN',
    url: 'https://restsimages.pics',
    siteName: 'RestsImages.pics',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'RestsImages.pics',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RestsImages.pics',
    description: 'Personal online hub with Discord status, projects, and GIF CDN',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-discord-darkest">
        {children}
      </body>
    </html>
  )
} 