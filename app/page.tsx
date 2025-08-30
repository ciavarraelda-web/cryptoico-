import CryptoNews from './components/CryptoNews'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">CryptoICO</h1>
          <nav className="flex space-x-4">
            <Link href="/" className="text-indigo-600 hover:text-indigo-800 font-medium">
              News
            </Link>
            <Link href="/ico" className="text-indigo-600 hover:text-indigo-800 font-medium">
              Submit ICO
            </Link>
            <Link href="/banner" className="text-indigo-600 hover:text-indigo-800 font-medium">
              Advertise
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Crypto News & Advertising Platform</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest cryptocurrency news and promote your ICO or banner ads to our audience.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Link href="/ico" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg">
              Submit ICO - 100 USDC
            </Link>
            <Link href="/banner" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg">
              Advertise Banner
            </Link>
          </div>
        </div>

        <CryptoNews />
      </main>

      <footer className="bg-white mt-12 py-8 border-t">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2023 CryptoICO. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
