import Parser from "rss-parser";
const parser = new Parser();

export async function fetchCryptoNews() {
  const feeds = [
    "https://cointelegraph.com/rss",
    "https://www.coindesk.com/arc/outboundfeeds/rss/",
    "https://news.bitcoin.com/feed/"
  ];

  let news: any[] = [];

  for (const url of feeds) {
    try {
      const feed = await parser.parseURL(url);
      feed.items.forEach(item => {
        news.push({
          title: item.title,
          link: item.link,
          pubDate: item.pubDate,
          source: feed.title
        });
      });
    } catch (err) {
      console.error("RSS fetch error:", err);
    }
  }

  news.sort((a,b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
  return news.slice(0, 50);
}
