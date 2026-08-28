import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const site = context.site;
  if (!site) {
    throw new Error("site URL is required for RSS");
  }

  const posts = (await getCollection("posts")).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  return rss({
    title: "윈로컬",
    description:
      "Windows에서 터미널, 경로, 패키지 매니저, 정적 사이트가 실제로 깨진 지점만 적습니다.",
    site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/notes/${post.id}`,
      categories: [post.data.category],
    })),
    customData: "<language>ko</language>",
  });
}
