import { insertJobListing } from "./jobHelpers";
import { InsertJobListing } from "../drizzle/schema";

/**
 * Scrape jobs from USAJOBS public search results
 * Using public search page since API requires authentication
 */

// Data-related keywords for federal jobs
const DATA_KEYWORDS = [
  "data scientist",
  "data analyst", 
  "chief data officer",
  "machine learning engineer",
  "artificial intelligence",
];

/**
 * Scrape USAJOBS public search for a keyword
 */
async function scrapeUSAJOBSKeyword(keyword: string): Promise<InsertJobListing[]> {
  try {
    const searchUrl = `https://www.usajobs.gov/api/search?keyword=${encodeURIComponent(keyword)}&ResultsPerPage=25`;
    
    const response = await fetch(searchUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; CDOPortal/1.0)",
      },
    });

    if (!response.ok) {
      console.error(`USAJOBS search failed: ${response.status}`);
      return [];
    }

    const data = await response.json();
    const jobs: InsertJobListing[] = [];

    // Parse the response structure
    const items = data?.SearchResult?.SearchResultItems || [];

    for (const item of items) {
      const job = item.MatchedObjectDescriptor;
      if (!job) continue;

      // Parse salary
      let salaryMin: number | null = null;
      let salaryMax: number | null = null;
      if (job.PositionRemuneration && job.PositionRemuneration.length > 0) {
        const salary = job.PositionRemuneration[0];
        salaryMin = parseInt(salary.MinimumRange?.replace(/[^0-9]/g, "") || "0") || null;
        salaryMax = parseInt(salary.MaximumRange?.replace(/[^0-9]/g, "") || "0") || null;
      }

      // Determine if remote
      const location = job.PositionLocationDisplay || "";
      const isRemote = location.toLowerCase().includes("remote") ||
                      location.toLowerCase().includes("telework") ||
                      location.toLowerCase().includes("anywhere");

      jobs.push({
        externalId: item.MatchedObjectId || `USAJob-${Date.now()}-${Math.random()}`,
        title: job.PositionTitle || "Untitled Position",
        agency: job.OrganizationName || "Federal Agency",
        location: location || "Location not specified",
        remote: isRemote,
        salaryMin,
        salaryMax,
        clearanceLevel: null,
        jobUrl: job.PositionURI || `https://www.usajobs.gov/job/${item.MatchedObjectId}`,
        source: "USAJOBS",
        postedAt: job.PositionStartDate ? new Date(job.PositionStartDate) : new Date(),
        closingAt: job.ApplicationCloseDate ? new Date(job.ApplicationCloseDate) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        fetchedAt: new Date(),
      });

      // Limit to 10 jobs per keyword
      if (jobs.length >= 10) break;
    }

    return jobs;
  } catch (error) {
    console.error(`Error scraping USAJOBS for "${keyword}":`, error);
    return [];
  }
}

/**
 * Scrape jobs from USAJOBS for all data-related keywords
 */
export async function scrapeUSAJOBSJobs(): Promise<number> {
  let totalInserted = 0;

  for (const keyword of DATA_KEYWORDS) {
    console.log(`Fetching USAJOBS for: ${keyword}`);
    const jobs = await scrapeUSAJOBSKeyword(keyword);

    for (const job of jobs) {
      const inserted = await insertJobListing(job);
      if (inserted) {
        totalInserted++;
      }
    }

    // Rate limiting: wait 2 seconds between requests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log(`Inserted ${totalInserted} jobs from USAJOBS`);
  return totalInserted;
}
