import { desc, eq, and, gte, lte, like } from "drizzle-orm";
import { getDb } from "./db";
import { jobListings, InsertJobListing } from "../drizzle/schema";

export async function getJobListings(filters?: {
  agency?: string;
  keyword?: string;
  clearanceLevel?: string;
  remote?: boolean;
  limit?: number;
}) {
  const db = await getDb();
  if (!db) return [];

  const { agency, keyword, clearanceLevel, remote, limit = 50 } = filters || {};

  let query = db.select().from(jobListings);
  
  const conditions = [];
  if (agency) conditions.push(like(jobListings.agency, `%${agency}%`));
  if (keyword) conditions.push(like(jobListings.title, `%${keyword}%`));
  if (clearanceLevel) conditions.push(eq(jobListings.clearanceLevel, clearanceLevel));
  if (remote !== undefined) conditions.push(eq(jobListings.remote, remote));
  
  // Only show jobs that haven't closed yet
  conditions.push(gte(jobListings.closingAt, new Date()));
  
  if (conditions.length > 0) {
    query = query.where(and(...conditions)) as any;
  }
  
  const results = await query
    .orderBy(desc(jobListings.postedAt))
    .limit(limit);
  
  return results;
}

export async function insertJobListing(job: InsertJobListing) {
  const db = await getDb();
  if (!db) return null;

  try {
    const existing = await db
      .select()
      .from(jobListings)
      .where(eq(jobListings.externalId, job.externalId))
      .limit(1);

    if (existing.length > 0) {
      return existing[0];
    }

    await db.insert(jobListings).values(job);
    const inserted = await db
      .select()
      .from(jobListings)
      .where(eq(jobListings.externalId, job.externalId))
      .limit(1);
    return inserted.length > 0 ? inserted[0] : null;
  } catch (error) {
    console.error("Error inserting job listing:", error);
    return null;
  }
}

export async function getJobStats() {
  const db = await getDb();
  if (!db) return { total: 0, byAgency: {}, bySource: {}, activeJobs: 0 };

  const allJobs = await db.select().from(jobListings);
  const now = new Date();
  
  const byAgency: Record<string, number> = {};
  const bySource: Record<string, number> = {};
  let activeJobs = 0;
  
  allJobs.forEach(job => {
    byAgency[job.agency] = (byAgency[job.agency] || 0) + 1;
    bySource[job.source] = (bySource[job.source] || 0) + 1;
    if (job.closingAt && job.closingAt > now) {
      activeJobs++;
    }
  });

  return {
    total: allJobs.length,
    byAgency,
    bySource,
    activeJobs,
  };
}

/**
 * Fetch real jobs from USAJOBS API
 */
export async function fetchRealJobs(): Promise<number> {
  const { scrapeUSAJOBSJobs } = await import("./jobScraper");
  return await scrapeUSAJOBSJobs();
}

export async function seedSampleJobs(): Promise<number> {
  // Try to fetch real jobs first
  const realJobsCount = await fetchRealJobs();
  if (realJobsCount > 0) {
    return realJobsCount;
  }
  
  // Fall back to sample data if API not configured
  const sampleJobs: InsertJobListing[] = [
    {
      externalId: "USAJOBS-001-DS",
      title: "Data Scientist (AI/ML)",
      agency: "Department of Defense",
      location: "Washington, DC",
      remote: false,
      salaryMin: 98496,
      salaryMax: 128043,
      clearanceLevel: "Secret",
      jobUrl: "https://www.usajobs.gov/job/001",
      source: "USAJOBS",
      postedAt: new Date("2024-11-10"),
      closingAt: new Date("2024-12-10"),
      fetchedAt: new Date(),
    },
    {
      externalId: "USAJOBS-002-CDO",
      title: "Chief Data Officer",
      agency: "Department of Health and Human Services",
      location: "Bethesda, MD",
      remote: true,
      salaryMin: 141022,
      salaryMax: 183300,
      clearanceLevel: null,
      jobUrl: "https://www.usajobs.gov/job/002",
      source: "USAJOBS",
      postedAt: new Date("2024-11-12"),
      closingAt: new Date("2024-12-15"),
      fetchedAt: new Date(),
    },
    {
      externalId: "USAJOBS-003-ML",
      title: "Machine Learning Engineer",
      agency: "National Security Agency",
      location: "Fort Meade, MD",
      remote: false,
      salaryMin: 112015,
      salaryMax: 145617,
      clearanceLevel: "Top Secret/SCI",
      jobUrl: "https://www.usajobs.gov/job/003",
      source: "USAJOBS",
      postedAt: new Date("2024-11-13"),
      closingAt: new Date("2024-12-13"),
      fetchedAt: new Date(),
    },
    {
      externalId: "USAJOBS-004-DA",
      title: "Data Analyst (Policy Research)",
      agency: "Office of Management and Budget",
      location: "Washington, DC",
      remote: true,
      salaryMin: 82764,
      salaryMax: 107590,
      clearanceLevel: null,
      jobUrl: "https://www.usajobs.gov/job/004",
      source: "USAJOBS",
      postedAt: new Date("2024-11-11"),
      closingAt: new Date("2024-12-11"),
      fetchedAt: new Date(),
    },
    {
      externalId: "USAJOBS-005-AI",
      title: "Artificial Intelligence Specialist",
      agency: "Department of Homeland Security",
      location: "Arlington, VA",
      remote: false,
      salaryMin: 98496,
      salaryMax: 128043,
      clearanceLevel: "Secret",
      jobUrl: "https://www.usajobs.gov/job/005",
      source: "USAJOBS",
      postedAt: new Date("2024-11-14"),
      closingAt: new Date("2024-12-20"),
      fetchedAt: new Date(),
    },
    {
      externalId: "USAJOBS-006-DE",
      title: "Data Engineer",
      agency: "Department of Veterans Affairs",
      location: "Multiple Locations",
      remote: true,
      salaryMin: 98496,
      salaryMax: 128043,
      clearanceLevel: null,
      jobUrl: "https://www.usajobs.gov/job/006",
      source: "USAJOBS",
      postedAt: new Date("2024-11-09"),
      closingAt: new Date("2024-12-09"),
      fetchedAt: new Date(),
    },
    {
      externalId: "USAJOBS-007-BA",
      title: "Business Intelligence Analyst",
      agency: "General Services Administration",
      location: "Washington, DC",
      remote: true,
      salaryMin: 72750,
      salaryMax: 94581,
      clearanceLevel: null,
      jobUrl: "https://www.usajobs.gov/job/007",
      source: "USAJOBS",
      postedAt: new Date("2024-11-08"),
      closingAt: new Date("2024-12-08"),
      fetchedAt: new Date(),
    },
    {
      externalId: "USAJOBS-008-DG",
      title: "Data Governance Specialist",
      agency: "Department of Commerce",
      location: "Suitland, MD",
      remote: false,
      salaryMin: 82764,
      salaryMax: 107590,
      clearanceLevel: null,
      jobUrl: "https://www.usajobs.gov/job/008",
      source: "USAJOBS",
      postedAt: new Date("2024-11-15"),
      closingAt: new Date("2024-12-22"),
      fetchedAt: new Date(),
    },
  ];

  let insertedCount = 0;
  for (const job of sampleJobs) {
    const inserted = await insertJobListing(job);
    if (inserted) {
      insertedCount++;
    }
  }

  return insertedCount;
}
