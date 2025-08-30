import './globals.css'

export const metadata = {
  title: 'CryptoICO',
  description: 'La tua piattaforma per investimenti in criptovalute',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  )
}
