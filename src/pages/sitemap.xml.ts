import { getCollection } from "astro:content";

const site = "https://winlocal.kr";

export async function GET(): Promise<Response> {
  const posts = await getCollection("posts");
  const pages = ["", "/about", "/contact", "/privacy", "/disclaimer"] as const;
  const locs = [
    ...pages.map((path) => `${site}${path}`),
    ...posts.map((post) => `${site}/notes/${post.id}`),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${locs.map((loc) => `  <url><loc>${loc}</loc></url>`).join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
