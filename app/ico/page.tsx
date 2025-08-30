'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function IcoPage() {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = {
      projectName: (e.currentTarget.elements.namedItem('projectName') as HTMLInputElement).value,
      website: (e.currentTarget.elements.namedItem('website') as HTMLInputElement).value,
      description: (e.currentTarget.elements.namedItem('description') as HTMLTextAreaElement).value,
      contactEmail: (e.currentTarget.elements.namedItem('contactEmail') as HTMLInputElement).value,
    }

    try {
      const res = await fetch('/api/coinbase/charge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'ico', data: formData })
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Submit Your ICO</h1>
          <p className="text-gray-600 mb-6">List your ICO on our platform for 100 USDC</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">
                Project Name
              </label>
              <input
                type="text"
                id="projectName"
                name="projectName"
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your project name"
              />
            </div>
            
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                Website URL
              </label>
              <input
                type="url"
                id="website"
                name="website"
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="https://yourproject.com"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Project Description
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Describe your project, tokenomics, and vision..."
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Contact Email
              </label>
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="you@example.com"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400"
            >
              {loading ? 'Processing Payment...' : 'Pay 100 USDC'}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
