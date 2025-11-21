import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, index } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * News articles from various federal tech sources
 */
export const newsArticles = mysqlTable("news_articles", {
  id: int("id").autoincrement().primaryKey(),
  title: text("title").notNull(),
  summary: text("summary"),
  url: varchar("url", { length: 2048 }).notNull(),
  source: varchar("source", { length: 255 }).notNull(), // FedScoop, GovExec, etc.
  category: mysqlEnum("category", ["policy", "technology", "workforce", "ethics", "community"]).notNull(),
  publishedAt: timestamp("publishedAt").notNull(),
  fetchedAt: timestamp("fetchedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  publishedIdx: index("published_idx").on(table.publishedAt),
  categoryIdx: index("category_idx").on(table.category),
  sourceIdx: index("source_idx").on(table.source),
}));

export type NewsArticle = typeof newsArticles.$inferSelect;
export type InsertNewsArticle = typeof newsArticles.$inferInsert;

/**
 * Policy documents and guidance
 */
export const policyDocuments = mysqlTable("policy_documents", {
  id: int("id").autoincrement().primaryKey(),
  title: text("title").notNull(),
  summary: text("summary"),
  url: varchar("url", { length: 2048 }).notNull(),
  source: varchar("source", { length: 255 }).notNull(), // OMB, NIST, Federal Register, etc.
  category: mysqlEnum("category", ["laws_regulations", "federal_guidance", "standards_practices"]).notNull(),
  publishedAt: timestamp("publishedAt"),
  fetchedAt: timestamp("fetchedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  categoryIdx: index("category_idx").on(table.category),
  publishedIdx: index("published_idx").on(table.publishedAt),
}));

export type PolicyDocument = typeof policyDocuments.$inferSelect;
export type InsertPolicyDocument = typeof policyDocuments.$inferInsert;

/**
 * Job listings from USAJOBS and other sources
 */
export const jobListings = mysqlTable("job_listings", {
  id: int("id").autoincrement().primaryKey(),
  externalId: varchar("externalId", { length: 255 }).notNull().unique(), // USAJOBS announcement number or external ID
  title: text("title").notNull(),
  agency: varchar("agency", { length: 255 }).notNull(),
  location: text("location"),
  remote: boolean("remote").default(false),
  salaryMin: int("salaryMin"),
  salaryMax: int("salaryMax"),
  clearanceLevel: varchar("clearanceLevel", { length: 100 }),
  jobUrl: varchar("jobUrl", { length: 2048 }).notNull(),
  source: varchar("source", { length: 100 }).notNull(), // USAJOBS, Indeed, etc.
  postedAt: timestamp("postedAt").notNull(),
  closingAt: timestamp("closingAt"),
  fetchedAt: timestamp("fetchedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  agencyIdx: index("agency_idx").on(table.agency),
  postedIdx: index("posted_idx").on(table.postedAt),
  sourceIdx: index("source_idx").on(table.source),
}));

export type JobListing = typeof jobListings.$inferSelect;
export type InsertJobListing = typeof jobListings.$inferInsert;

/**
 * Federal CDOs and CAIOs directory
 */
export const agencyDirectory = mysqlTable("agency_directory", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(), // CDO, CAIO, etc.
  agency: varchar("agency", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }),
  profileUrl: varchar("profileUrl", { length: 2048 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  agencyIdx: index("agency_idx").on(table.agency),
}));

export type AgencyDirectoryEntry = typeof agencyDirectory.$inferSelect;
export type InsertAgencyDirectoryEntry = typeof agencyDirectory.$inferInsert;

/**
 * Resource links (websites, blogs, podcasts, etc.)
 */
export const resources = mysqlTable("resources", {
  id: int("id").autoincrement().primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  url: varchar("url", { length: 2048 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(), // Govt Website, Data Strategy, AI Strategy, etc.
  publishingOrg: varchar("publishingOrg", { length: 255 }),
  lastUpdated: varchar("lastUpdated", { length: 100 }), // "2023", "Ongoing", etc.
  registrationRequired: boolean("registrationRequired").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  categoryIdx: index("category_idx").on(table.category),
}));

export type Resource = typeof resources.$inferSelect;
export type InsertResource = typeof resources.$inferInsert;

/**
 * User bookmarks for saved content
 */
export const bookmarks = mysqlTable("bookmarks", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  itemType: mysqlEnum("itemType", ["news", "policy", "job", "resource"]).notNull(),
  itemId: int("itemId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  userIdx: index("user_idx").on(table.userId),
  itemIdx: index("item_idx").on(table.itemType, table.itemId),
}));

export type Bookmark = typeof bookmarks.$inferSelect;
export type InsertBookmark = typeof bookmarks.$inferInsert;

/**
 * User saved job searches
 */
export const savedSearches = mysqlTable("saved_searches", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  searchParams: text("searchParams").notNull(), // JSON string of search parameters
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  userIdx: index("user_idx").on(table.userId),
}));

export type SavedSearch = typeof savedSearches.$inferSelect;
export type InsertSavedSearch = typeof savedSearches.$inferInsert;

/**
 * Feed update tracking
 */
export const feedUpdates = mysqlTable("feed_updates", {
  id: int("id").autoincrement().primaryKey(),
  feedType: mysqlEnum("feedType", ["news", "policy", "jobs"]).notNull(),
  feedSource: varchar("feedSource", { length: 255 }).notNull(),
  lastFetchedAt: timestamp("lastFetchedAt").notNull(),
  itemsCount: int("itemsCount").default(0),
  status: mysqlEnum("status", ["success", "error"]).default("success"),
  errorMessage: text("errorMessage"),
}, (table) => ({
  feedIdx: index("feed_idx").on(table.feedType, table.feedSource),
}));

export type FeedUpdate = typeof feedUpdates.$inferSelect;
export type InsertFeedUpdate = typeof feedUpdates.$inferInsert;
