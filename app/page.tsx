import { fetchCryptoNews } from "../lib/rss";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Home() {
  const news = await fetchCryptoNews();
  const banners = await prisma.banner.findMany({ where: { status: "approved" } });

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">CryptoICO News</h1>

      {banners.length > 0 && (
        <div className="mb-6">
          {banners.map(b => (
            <img key={b.id} src={b.imageUrl} alt="Banner" className="w-full mb-2 rounded" />
          ))}
        </div>
      )}

      <div className="space-y-4">
        {news.map((n,i) => (
          <a key={i} href={n.link} target="_blank" rel="noopener noreferrer" className="block p-4 border rounded hover:bg-gray-50">
            <h2 className="font-bold">{n.title}</h2>
            <p className="text-sm text-gray-500">{n.source} - {new Date(n.pubDate).toLocaleString()}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
