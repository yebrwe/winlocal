import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

export const categories = [
  "터미널",
  "경로",
  "패키지",
  "정적사이트",
  "에이전트",
] as const;

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    category: z.enum(categories),
    updatedDate: z.coerce.date().optional(),
  }),
});

export const collections = { posts };
