import { desc, eq, and } from "drizzle-orm";
import { getDb } from "./db";
import { policyDocuments, InsertPolicyDocument } from "../drizzle/schema";

export async function getPolicyDocuments(category?: string, source?: string, limit: number = 50) {
  const db = await getDb();
  if (!db) return [];

  let query = db.select().from(policyDocuments);
  
  const conditions = [];
  if (category) conditions.push(eq(policyDocuments.category, category as any));
  if (source) conditions.push(eq(policyDocuments.source, source));
  
  if (conditions.length > 0) {
    query = query.where(and(...conditions)) as any;
  }
  
  const results = await query
    .orderBy(desc(policyDocuments.publishedAt))
    .limit(limit);
  
  return results;
}

export async function insertPolicyDocument(policy: InsertPolicyDocument) {
  const db = await getDb();
  if (!db) return null;

  try {
    const existing = await db
      .select()
      .from(policyDocuments)
      .where(eq(policyDocuments.url, policy.url))
      .limit(1);

    if (existing.length > 0) {
      return existing[0];
    }

    await db.insert(policyDocuments).values(policy);
    const inserted = await db
      .select()
      .from(policyDocuments)
      .where(eq(policyDocuments.url, policy.url))
      .limit(1);
    return inserted.length > 0 ? inserted[0] : null;
  } catch (error) {
    console.error("Error inserting policy document:", error);
    return null;
  }
}

export async function getPolicyStats() {
  const db = await getDb();
  if (!db) return { total: 0, byCategory: {}, bySource: {} };

  const allPolicies = await db.select().from(policyDocuments);
  
  const byCategory: Record<string, number> = {};
  const bySource: Record<string, number> = {};
  
  allPolicies.forEach(policy => {
    byCategory[policy.category] = (byCategory[policy.category] || 0) + 1;
    bySource[policy.source] = (bySource[policy.source] || 0) + 1;
  });

  return {
    total: allPolicies.length,
    byCategory,
    bySource,
  };
}

export async function seedSamplePolicies(): Promise<number> {
  const samplePolicies: InsertPolicyDocument[] = [
    {
      title: "Executive Order 14110: Safe, Secure, and Trustworthy AI",
      summary: "Presidential executive order establishing new standards for AI safety and security, requiring agencies to implement AI governance frameworks and risk management practices.",
      url: "https://www.whitehouse.gov/briefing-room/presidential-actions/2023/10/30/executive-order-on-the-safe-secure-and-trustworthy-development-and-use-of-artificial-intelligence/",
      source: "White House",
      category: "laws_regulations",
      publishedAt: new Date("2023-10-30"),
      fetchedAt: new Date(),
    },
    {
      title: "OMB Memorandum M-23-22: Delivering a Digital-First Public Experience",
      summary: "Guidance requiring federal agencies to modernize digital services, improve user experience, and adopt data-driven decision making in service delivery.",
      url: "https://www.whitehouse.gov/wp-content/uploads/2023/09/M-23-22-Delivering-a-Digital-First-Public-Experience.pdf",
      source: "OMB",
      category: "federal_guidance",
      publishedAt: new Date("2023-09-22"),
      fetchedAt: new Date(),
    },
    {
      title: "NIST AI Risk Management Framework (AI RMF 1.0)",
      summary: "Comprehensive framework for managing risks associated with artificial intelligence systems, providing voluntary guidance for organizations developing and deploying AI.",
      url: "https://www.nist.gov/itl/ai-risk-management-framework",
      source: "NIST",
      category: "standards_practices",
      publishedAt: new Date("2023-01-26"),
      fetchedAt: new Date(),
    },
    {
      title: "Federal Data Strategy 2024 Action Plan",
      summary: "Annual action plan outlining specific steps federal agencies must take to improve data governance, quality, and use in decision-making processes.",
      url: "https://strategy.data.gov/action-plan/",
      source: "Data.gov",
      category: "federal_guidance",
      publishedAt: new Date("2024-01-15"),
      fetchedAt: new Date(),
    },
    {
      title: "Foundations for Evidence-Based Policymaking Act of 2018",
      summary: "Legislation requiring federal agencies to develop data strategies, appoint Chief Data Officers, and establish processes for evidence-building and evaluation.",
      url: "https://www.congress.gov/bill/115th-congress/house-bill/4174",
      source: "Congress.gov",
      category: "laws_regulations",
      publishedAt: new Date("2018-01-14"),
      fetchedAt: new Date(),
    },
    {
      title: "OMB Circular A-130: Managing Information as a Strategic Resource",
      summary: "Establishes policy for the management of federal information resources, including requirements for privacy, security, accessibility, and records management.",
      url: "https://www.whitehouse.gov/sites/whitehouse.gov/files/omb/circulars/A130/a130revised.pdf",
      source: "OMB",
      category: "federal_guidance",
      publishedAt: new Date("2016-07-28"),
      fetchedAt: new Date(),
    },
    {
      title: "NIST Cybersecurity Framework 2.0",
      summary: "Updated framework providing guidance for organizations to manage and reduce cybersecurity risk, with enhanced focus on governance and supply chain security.",
      url: "https://www.nist.gov/cyberframework",
      source: "NIST",
      category: "standards_practices",
      publishedAt: new Date("2024-02-26"),
      fetchedAt: new Date(),
    },
    {
      title: "Open, Public, Electronic, and Necessary (OPEN) Government Data Act",
      summary: "Requires federal agencies to publish data as open data by default, making government information accessible, discoverable, and usable by the public.",
      url: "https://www.congress.gov/bill/115th-congress/house-bill/4174/text",
      source: "Congress.gov",
      category: "laws_regulations",
      publishedAt: new Date("2019-01-14"),
      fetchedAt: new Date(),
    },
    {
      title: "OMB Memorandum M-19-23: Phase 1 Implementation of FITARA",
      summary: "Guidance on implementing the Federal Information Technology Acquisition Reform Act, emphasizing CIO authority and IT modernization.",
      url: "https://www.whitehouse.gov/wp-content/uploads/2019/06/M-19-23.pdf",
      source: "OMB",
      category: "federal_guidance",
      publishedAt: new Date("2019-06-25"),
      fetchedAt: new Date(),
    },
    {
      title: "NIST Privacy Framework 1.0",
      summary: "Voluntary tool to help organizations identify and manage privacy risks, complementing the NIST Cybersecurity Framework.",
      url: "https://www.nist.gov/privacy-framework",
      source: "NIST",
      category: "standards_practices",
      publishedAt: new Date("2020-01-16"),
      fetchedAt: new Date(),
    },
  ];

  let insertedCount = 0;
  for (const policy of samplePolicies) {
    const inserted = await insertPolicyDocument(policy);
    if (inserted) {
      insertedCount++;
    }
  }

  return insertedCount;
}
