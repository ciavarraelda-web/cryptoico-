import './globals.css'

export const metadata = {
  title: 'CryptoICO - Crypto News & Advertising Platform',
  description: 'Real-time cryptocurrency news and advertising platform for ICOs and banner ads',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">{children}</body>
    </html>
  )
}
