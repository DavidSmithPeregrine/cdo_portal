import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { getRecentNews, getNewsStats } from "./newsHelpers";
import { seedSampleNews } from "./newsScraper";
import { getPolicyDocuments, getPolicyStats, seedSamplePolicies } from "./policyHelpers";
import { getJobListings, getJobStats, seedSampleJobs } from "./jobHelpers";
import { invokeLLM } from "./_core/llm";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  news: router({
    list: publicProcedure
      .input(
        z.object({
          category: z.enum(["policy", "technology", "workforce", "ethics", "community"]).optional(),
          source: z.string().optional(),
          limit: z.number().min(1).max(100).default(50),
        })
      )
      .query(async ({ input }) => {
        return await getRecentNews(input.category, input.source, input.limit);
      }),
    stats: publicProcedure.query(async () => {
      return await getNewsStats();
    }),
    seedSample: protectedProcedure.mutation(async ({ ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Unauthorized");
      }
      const count = await seedSampleNews();
      return { success: true, count };
    }),
  }),

  policy: router({
    list: publicProcedure
      .input(
        z.object({
          category: z.enum(["laws_regulations", "federal_guidance", "standards_practices"]).optional(),
          source: z.string().optional(),
          limit: z.number().min(1).max(100).default(50),
        })
      )
      .query(async ({ input }) => {
        return await getPolicyDocuments(input.category, input.source, input.limit);
      }),
    stats: publicProcedure.query(async () => {
      return await getPolicyStats();
    }),
    seedSample: protectedProcedure.mutation(async ({ ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Unauthorized");
      }
      const count = await seedSamplePolicies();
      return { success: true, count };
    }),
  }),

  jobs: router({
    list: publicProcedure
      .input(
        z.object({
          agency: z.string().optional(),
          keyword: z.string().optional(),
          clearanceLevel: z.string().optional(),
          remote: z.boolean().optional(),
          limit: z.number().min(1).max(100).default(50),
        })
      )
      .query(async ({ input }) => {
        return await getJobListings(input);
      }),
    stats: publicProcedure.query(async () => {
      return await getJobStats();
    }),
    seedSample: protectedProcedure.mutation(async ({ ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Unauthorized");
      }
      const count = await seedSampleJobs();
      return { success: true, count };
    }),
  }),

  career: router({
    reviewResume: publicProcedure
      .input(
        z.object({
          resumeText: z.string(),
          jobDescription: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const prompt = input.jobDescription
          ? `You are an expert federal resume reviewer. Review the following resume for a federal position and provide detailed, actionable feedback. Compare it against this job description and suggest improvements to better match the requirements.\n\nJob Description:\n${input.jobDescription}\n\nResume:\n${input.resumeText}\n\nProvide feedback on:\n1. Alignment with federal resume best practices\n2. Keywords and skills matching\n3. Accomplishments and quantifiable results\n4. Format and structure\n5. Specific improvements to better match the job`
          : `You are an expert federal resume reviewer. Review the following resume and provide detailed, actionable feedback for federal job applications.\n\nResume:\n${input.resumeText}\n\nProvide feedback on:\n1. Alignment with federal resume best practices (STAR method, etc.)\n2. Keywords and technical skills\n3. Accomplishments and quantifiable results\n4. Format and structure\n5. Suggestions for improvement`;

        const response = await invokeLLM({
          messages: [
            { role: "system", content: "You are a helpful career advisor specializing in federal employment." },
            { role: "user", content: prompt },
          ],
        });

        return { feedback: response.choices[0].message.content || "Unable to generate feedback." };
      }),
    prepareInterview: publicProcedure
      .input(
        z.object({
          jobTitle: z.string(),
          agency: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const prompt = input.agency
          ? `Generate 10 comprehensive interview practice questions for a ${input.jobTitle} position at ${input.agency}. Include:\n1. Technical questions specific to the role\n2. Behavioral questions (STAR method)\n3. Questions about federal data governance and policy\n4. Agency-specific questions\n5. Questions about AI/ML ethics and responsible use\n\nFor each question, provide context on why it might be asked and what the interviewer is looking for.`
          : `Generate 10 comprehensive interview practice questions for a ${input.jobTitle} position in federal government. Include:\n1. Technical questions specific to the role\n2. Behavioral questions (STAR method)\n3. Questions about federal data governance and policy\n4. Questions about AI/ML ethics and responsible use\n5. Leadership and collaboration questions\n\nFor each question, provide context on why it might be asked and what the interviewer is looking for.`;

        const response = await invokeLLM({
          messages: [
            { role: "system", content: "You are a helpful career advisor specializing in federal employment interviews." },
            { role: "user", content: prompt },
          ],
        });

        return { questions: response.choices[0].message.content || "Unable to generate questions." };
      }),
  }),

  chat: router({
    sendMessage: publicProcedure
      .input(
        z.object({
          messages: z.array(
            z.object({
              role: z.enum(["system", "user", "assistant"]),
              content: z.string(),
            })
          ),
        })
      )
      .mutation(async ({ input }) => {
        const response = await invokeLLM({
          messages: input.messages as any,
        });

        return { response: response.choices[0].message.content || "I apologize, but I couldn't generate a response." };
      }),
  }),
});

export type AppRouter = typeof appRouter;
