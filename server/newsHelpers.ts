import { desc, eq, and, gte } from "drizzle-orm";
import { getDb } from "./db";
import { newsArticles, feedUpdates, InsertNewsArticle, InsertFeedUpdate } from "../drizzle/schema";

export async function getRecentNews(category?: string, source?: string, limit: number = 50) {
  const db = await getDb();
  if (!db) return [];

  let query = db.select().from(newsArticles);
  
  const conditions = [];
  if (category) conditions.push(eq(newsArticles.category, category as any));
  if (source) conditions.push(eq(newsArticles.source, source));
  
  if (conditions.length > 0) {
    query = query.where(and(...conditions)) as any;
  }
  
  const results = await query
    .orderBy(desc(newsArticles.publishedAt))
    .limit(limit);
  
  return results;
}

export async function insertNewsArticle(article: InsertNewsArticle) {
  const db = await getDb();
  if (!db) return null;

  try {
    // Check if article already exists by URL
    const existing = await db
      .select()
      .from(newsArticles)
      .where(eq(newsArticles.url, article.url))
      .limit(1);

    if (existing.length > 0) {
      return existing[0];
    }

    await db.insert(newsArticles).values(article);
    // Fetch the inserted article
    const inserted = await db
      .select()
      .from(newsArticles)
      .where(eq(newsArticles.url, article.url))
      .limit(1);
    return inserted.length > 0 ? inserted[0] : null;
  } catch (error) {
    console.error("Error inserting news article:", error);
    return null;
  }
}

export async function updateFeedStatus(
  feedType: "news" | "policy" | "jobs",
  feedSource: string,
  itemsCount: number,
  status: "success" | "error" = "success",
  errorMessage?: string
) {
  const db = await getDb();
  if (!db) return;

  const feedUpdate: InsertFeedUpdate = {
    feedType,
    feedSource,
    lastFetchedAt: new Date(),
    itemsCount,
    status,
    errorMessage: errorMessage || null,
  };

  await db.insert(feedUpdates).values(feedUpdate);
}

export async function getLastFeedUpdate(feedType: "news" | "policy" | "jobs", feedSource: string) {
  const db = await getDb();
  if (!db) return null;

  const results = await db
    .select()
    .from(feedUpdates)
    .where(and(eq(feedUpdates.feedType, feedType), eq(feedUpdates.feedSource, feedSource)))
    .orderBy(desc(feedUpdates.lastFetchedAt))
    .limit(1);

  return results.length > 0 ? results[0] : null;
}

export async function getNewsStats() {
  const db = await getDb();
  if (!db) return { total: 0, byCategory: {}, bySource: {}, lastUpdate: null };

  const allNews = await db.select().from(newsArticles);
  
  const byCategory: Record<string, number> = {};
  const bySource: Record<string, number> = {};
  
  allNews.forEach(article => {
    byCategory[article.category] = (byCategory[article.category] || 0) + 1;
    bySource[article.source] = (bySource[article.source] || 0) + 1;
  });

  const lastUpdate = await db
    .select()
    .from(feedUpdates)
    .where(eq(feedUpdates.feedType, "news"))
    .orderBy(desc(feedUpdates.lastFetchedAt))
    .limit(1);

  return {
    total: allNews.length,
    byCategory,
    bySource,
    lastUpdate: lastUpdate.length > 0 ? lastUpdate[0].lastFetchedAt : null,
  };
}
