import { getCollection } from "astro:content";

export async function GET() {
  const all = await getCollection("blog");

  const posts = all
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .map(p => ({
      id: p.id,
      title: p.data.title,
      date: p.data.pubDate.toISOString(),
      description: p.data.description ?? "",
      hero: p.data.heroImage ?? "",
      lang: p.data.lang ?? "en",
      tags: p.data.tags ?? [],
      slug: p.id
    }));

  return new Response(JSON.stringify(posts), {
    headers: { "Content-Type": "application/json" }
  });
}
