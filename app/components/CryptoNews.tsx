'use client'
import { useState, useEffect } from 'react'
import Parser from 'rss-parser'

interface NewsItem {
  title: string
  link: string
  pubDate: string
  contentSnippet?: string
}

export default function CryptoNews() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchNews() {
      try {
        const parser = new Parser()
        // Using a CORS proxy to avoid CORS issues
        const feed = await parser.parseURL('https://cors-anywhere.herokuapp.com/https://cryptonews.com/news/feed/')
        
        setNews(feed.items.slice(0, 10) as NewsItem[])
      } catch (error) {
        console.error('Error fetching news:', error)
        // Fallback news data
        setNews([
          {
            title: 'Bitcoin Reaches New All-Time High',
            link: '#',
            pubDate: new Date().toISOString(),
            contentSnippet: 'Bitcoin has reached a new all-time high, surpassing $100,000 for the first time in history.'
          },
          {
            title: 'Ethereum 2.0 Launch Date Confirmed',
            link: '#',
            pubDate: new Date().toISOString(),
            contentSnippet: 'The Ethereum Foundation has confirmed the launch date for Ethereum 2.0, set for next month.'
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
      </div>
    )
  }

  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Latest Crypto News</h2>
      <div className="space-y-6">
        {news.map((item, index) => (
          <article key={index} className="border-b border-gray-100 pb-6 last:border-0">
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {item.title}
              </a>
            </h3>
            <p className="text-gray-500 text-sm mb-2">
              {new Date(item.pubDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <p className="text-gray-700">{item.contentSnippet}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
