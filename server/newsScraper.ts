import { insertNewsArticle, updateFeedStatus } from "./newsHelpers";
import { InsertNewsArticle } from "../drizzle/schema";

/**
 * RSS Feed sources for federal tech news
 */
const RSS_FEEDS = [
  {
    url: "https://fedscoop.com/feed/",
    source: "FedScoop",
    category: "technology" as const,
  },
  {
    url: "https://www.govexec.com/rss/technology/",
    source: "GovExec",
    category: "technology" as const,
  },
  {
    url: "https://www.meritalk.com/feed/",
    source: "MeriTalk",
    category: "technology" as const,
  },
];

/**
 * Parse RSS feed XML to extract articles
 */
async function parseRSSFeed(
  feedUrl: string,
  source: string,
  category: "policy" | "technology" | "workforce" | "ethics" | "community"
): Promise<InsertNewsArticle[]> {
  try {
    const response = await fetch(feedUrl, {
      headers: {
        "User-Agent": "CDOPortal/1.0",
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch ${source}: ${response.status}`);
      return [];
    }

    const xmlText = await response.text();

    // Simple XML parsing for RSS items
    const articles: InsertNewsArticle[] = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;

    while ((match = itemRegex.exec(xmlText)) !== null) {
      const itemXml = match[1];

      const title = extractTag(itemXml, "title");
      const link = extractTag(itemXml, "link");
      const description = extractTag(itemXml, "description");
      const pubDate = extractTag(itemXml, "pubDate");

      if (title && link) {
        articles.push({
          title: cleanText(title),
          summary: cleanText(description || title).substring(0, 300),
          url: link.trim(),
          source,
          category,
          publishedAt: pubDate ? new Date(pubDate) : new Date(),
          fetchedAt: new Date(),
        });
      }

      // Limit to 15 most recent articles per feed
      if (articles.length >= 15) break;
    }

    return articles;
  } catch (error) {
    console.error(`Error parsing RSS feed ${source}:`, error);
    return [];
  }
}

/**
 * Extract content from XML tag
 */
function extractTag(xml: string, tagName: string): string {
  const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "i");
  const match = xml.match(regex);
  return match ? match[1] : "";
}

/**
 * Clean HTML and special characters from text
 */
function cleanText(text: string): string {
  return text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Scrape all RSS feeds and update database
 */
export async function scrapeAllNews(): Promise<{ success: number; failed: number }> {
  let successCount = 0;
  let failedCount = 0;

  for (const feed of RSS_FEEDS) {
    try {
      console.log(`Scraping ${feed.source}...`);
      const articles = await parseRSSFeed(feed.url, feed.source, feed.category);

      for (const article of articles) {
        const inserted = await insertNewsArticle(article);
        if (inserted) {
          successCount++;
        }
      }

      await updateFeedStatus("news", feed.source, articles.length, "success");
    } catch (error) {
      console.error(`Error scraping ${feed.source}:`, error);
      await updateFeedStatus("news", feed.source, 0, "error", String(error));
      failedCount++;
    }
  }

  console.log(`Scraped ${successCount} articles successfully, ${failedCount} feeds failed`);
  return { success: successCount, failed: failedCount };
}

/**
 * Seed news - now fetches real RSS feeds instead of sample data
 */
export async function seedSampleNews(): Promise<number> {
  const result = await scrapeAllNews();
  return result.success;
}
