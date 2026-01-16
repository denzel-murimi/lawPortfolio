import { getPublicationBySlug } from "@/lib/publications";
import { markdownToHtml } from "@/lib/markdown";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
};

export default async function PublicationPage({ params }: Props) {
  const publication = getPublicationBySlug(params.slug);

  if (!publication) {
    notFound();
  }

  const contentHtml = await markdownToHtml(publication.content);

  return (
    <article className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-2">{publication.title}</h1>

      <div className="text-sm text-gray-600 mb-4">
        {publication.publisher && <span>{publication.publisher}</span>}
        {publication.publisher && " • "}
        <span>{publication.year}</span>
      </div>

      {publication.tags?.length ? (
        <div className="flex flex-wrap gap-2 mb-6">
          {publication.tags.map((t) => (
            <span
              key={t}
              className="text-xs border rounded-full px-3 py-1"
            >
              {t}
            </span>
          ))}
        </div>
      ) : null}

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      {publication.link && (
        <a
          href={publication.link}
          target="_blank"
          rel="noreferrer"
          className="inline-block mt-8 underline"
        >
          View full publication
        </a>
      )}
    </article>
  );
}
