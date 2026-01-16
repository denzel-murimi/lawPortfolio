import { getAllPublications } from "@/lib/publications";
import Link from "next/link";


export default function PublicationsPage() {
  const publications = getAllPublications();

  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">Publications</h1>

      {publications.length === 0 ? (
        <p className="text-gray-700">No publications added yet.</p>
      ) : (
        <ul className="space-y-6">
          {publications.map((p) => (
            <li key={p.slug} className="border rounded-xl p-5">
              <div className="flex flex-col gap-1">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-xl font-semibold"><Link href={`/publications/${p.slug}`}className="underline hover:no-underline" >
                       {p.title}
                     </Link>
                     </h2>
                  <span className="text-sm text-gray-600">{p.year}</span>
                </div>

                {p.publisher && (
                  <p className="text-sm text-gray-700">{p.publisher}</p>
                )}

                {p.tags?.length ? (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs border rounded-full px-3 py-1"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}

                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm underline mt-3 inline-block"
                  >
                    View publication
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
