'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function BannerPage() {
  const [loading, setLoading] = useState(false)
  const [duration, setDuration] = useState(3)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = {
      imageUrl: (e.currentTarget.elements.namedItem('imageUrl') as HTMLInputElement).value,
      targetUrl: (e.currentTarget.elements.namedItem('targetUrl') as HTMLInputElement).value,
      duration
    }

    try {
      const res = await fetch('/api/coinbase/charge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'banner', data: formData })
      })

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const result = await res.json()

      if (result.url) {
        window.location.href = result.url
      } else {
        throw new Error('No URL returned from API')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred during payment. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-indigo-600">CryptoICO</Link>
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
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Advertise With Us</h1>
          <p className="text-gray-600 mb-6">Promote your project with a banner ad on our platform</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                Banner Image URL
              </label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="https://example.com/banner.png"
              />
              <p className="text-xs text-gray-500 mt-1">Recommended size: 728x90 pixels</p>
            </div>
            
            <div>
              <label htmlFor="targetUrl" className="block text-sm font-medium text-gray-700 mb-1">
                Destination URL
              </label>
              <input
                type="url"
                id="targetUrl"
                name="targetUrl"
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="https://yourproject.com"
              />
            </div>
            
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                Duration
              </label>
              <select 
                id="duration"
                value={duration} 
                onChange={e => setDuration(Number(e.target.value))} 
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value={3}>3 days - 100 USDC</option>
                <option value={7}>7 days - 150 USDC</option>
              </select>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-md">
              <p className="text-blue-800 font-medium">You will be charged: {duration === 3 ? '100' : '150'} USDC</p>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-md hover:bg-green-700 disabled:bg-green-400"
            >
              {loading ? 'Processing Payment...' : `Pay ${duration === 3 ? 100 : 150} USDC`}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
