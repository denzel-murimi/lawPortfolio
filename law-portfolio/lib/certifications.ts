import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Certification = {
  slug: string;
  name: string;
  issuer?: string;
  date?: string; // ISO string recommended
  credentialId?: string;
  verify?: string;
  content: string;
};

const certsDir = path.join(process.cwd(), "content", "certifications");

export function getAllCertifications(): Certification[] {
  if (!fs.existsSync(certsDir)) return [];

  const files = fs.readdirSync(certsDir).filter((f) => f.endsWith(".md"));

  const items = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const fullPath = path.join(certsDir, filename);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(raw);

    return {
      slug,
      name: String(data.name ?? slug),
      issuer: data.issuer ? String(data.issuer) : undefined,
      date: data.date ? String(data.date) : undefined,
      credentialId: data.credentialId ? String(data.credentialId) : undefined,
      verify: data.verify ? String(data.verify) : undefined,
      content,
    } satisfies Certification;
  });

  // this adds the most recent first if date exists
  return items.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}
