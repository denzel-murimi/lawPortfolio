import Link from "next/link";
import { getAllPublications } from "@/lib/publications";
import { getAllCertifications } from "@/lib/certifications";
import Image from "next/image";


export default function HomePage() {
  const publications = getAllPublications().slice(0, 3);
  const certifications = getAllCertifications().slice(0, 3);

  return (
    <div className="space-y-14">
      {/* HERO */}
     {/* HERO */}
<section className="grid gap-8 md:grid-cols-[160px_1fr] md:items-start">
  {/* Headshot */}
  <div className="w-40">
    <div className="border rounded-2xl p-2">
      <Image
        src="/dkt.jpeg"
        alt="Headshot of Dr. Edward Murimi"
        width={100}
        height={100}
        className="rounded-xl object-cover"
        priority
      />
    </div>
  </div>

  {/* Text */}
  <div className="space-y-4">
    <p className="text-sm text-white-600">Doctor of Law (PhD / SJD)</p>

    <h1 className="text-4xl font-bold leading-tight">Dr. Edward Murimi</h1>

    <p className="text-white-700 max-w-2xl">
      I am a legal scholar focused on <span className="font-medium">African Law</span>,{" "}
      <span className="font-medium">Human Rights</span>, and{" "}
      <span className="font-medium">Labour Law</span>. My work explores how law and policy
      respond to emerging technologies, governance challenges, and rights protection.
    </p>

    <div className="flex flex-wrap gap-3 pt-2">
      <a
        href="/Denzel'sCV.pdf"
        className="border rounded-xl px-5 py-2 text-sm font-medium"
        target="_blank"
        rel="noreferrer"
      >
        Download CV
      </a>

      <Link
        href="/publications"
        className="border rounded-xl px-5 py-2 text-sm font-medium"
      >
        View Publications
      </Link>

      <Link
        href="/contact"
        className="border rounded-xl px-5 py-2 text-sm font-medium"
      >
        Contact
      </Link>
    </div>
  </div>
</section>


      {/* HIGHLIGHTS */}
      <section className="grid gap-6 md:grid-cols-3">
        <div className="border rounded-xl p-5">
          <h2 className="font-semibold">Research Interests</h2>
          <ul className="mt-3 text-sm text-white-700 space-y-2">
            <li>• Constitutional & Administrative Law</li>
            <li>• Human Rights & Governance</li>
            <li>• Technology, Privacy & AI Regulation</li>
          </ul>
        </div>

        <div className="border rounded-xl p-5">
          <h2 className="font-semibold">Profiles</h2>
          <ul className="mt-3 text-sm space-y-2">
            <li>
              <a className="underline" href="#" target="_blank" rel="noreferrer">
                Google Scholar
              </a>
            </li>
            <li>
              <a className="underline" href="#" target="_blank" rel="noreferrer">
                ORCID
              </a>
            </li>
            <li>
              <a className="underline" href="#" target="_blank" rel="noreferrer">
                SSRN
              </a>
            </li>
            <li>
              <a className="underline" href="#" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </li>
          </ul>
          
        </div>

        <div className="border rounded-xl p-5">
          <h2 className="font-semibold">Availability</h2>
          <p className="mt-3 text-sm text-white-700">
            Open to academic collaboration, policy consulting, speaking engagements,
            and peer review.
          </p>
        </div>
      </section>

      {/* FEATURED PUBLICATIONS */}
      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold">Featured Publications</h2>
          <Link href="/publications" className="text-sm underline">
            See all
          </Link>
        </div>

        {publications.length === 0 ? (
          <p className="text-gray-700">Add Markdown files to content/publications.</p>
        ) : (
          <ul className="space-y-4">
            {publications.map((p) => (
              <li key={p.slug} className="border rounded-xl p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Link
                      href={`/publications/${p.slug}`}
                      className="text-lg font-semibold underline hover:no-underline"
                    >
                      {p.title}
                    </Link>
                    {p.publisher && (
                      <p className="text-sm text-gray-700 mt-1">{p.publisher}</p>
                    )}
                  </div>
                  <span className="text-sm text-gray-600">{p.year}</span>
                </div>

                {p.tags?.length ? (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {p.tags.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="text-xs border rounded-full px-3 py-1"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* LATEST CERTIFICATIONS */}
      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold">Latest Certifications</h2>
          <Link href="/certifications" className="text-sm underline">
            See all
          </Link>
        </div>

        {certifications.length === 0 ? (
          <p className="text-gray-700">Add Markdown files to content/certifications.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {certifications.map((c) => (
              <div key={c.slug} className="border rounded-xl p-5">
                <p className="font-semibold">{c.name}</p>
                <p className="text-sm text-gray-700 mt-1">
                  {c.issuer ? c.issuer : "Issuer"} {c.date ? `• ${c.date}` : ""}
                </p>
                {c.verify && (
                  <a
                    href={c.verify}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm underline inline-block mt-3"
                  >
                    Verify credential
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
