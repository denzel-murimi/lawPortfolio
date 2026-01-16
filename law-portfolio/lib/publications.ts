import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Publication = {
  slug: string;
  title: string;
  year: number;
  publisher?: string;
  tags?: string[];
  link?: string;
  content: string; // markdown body
};

const publicationsDir = path.join(process.cwd(), "content", "publications");

export function getAllPublications(): Publication[] {
  if (!fs.existsSync(publicationsDir)) return [];

  const files = fs.readdirSync(publicationsDir).filter((f) => f.endsWith(".md"));

  const items = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const fullPath = path.join(publicationsDir, filename);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(raw);

    return {
      slug,
      title: String(data.title ?? slug),
      year: Number(data.year ?? 0),
      publisher: data.publisher ? String(data.publisher) : undefined,
      tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
      link: data.link ? String(data.link) : undefined,
      content,
    } satisfies Publication;
  });

  // this adds the newest publication first
  return items.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
}

export function getPublicationBySlug(slug: string) {
  const fullPath = path.join(publicationsDir, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: String(data.title ?? slug),
    year: Number(data.year ?? 0),
    publisher: data.publisher ? String(data.publisher) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
    link: data.link ? String(data.link) : undefined,
    content,
  };
}

