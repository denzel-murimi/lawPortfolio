import { getAllCertifications } from "@/lib/certifications";

export default function CertificationsPage() {
  const certs = getAllCertifications();

  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">Certifications</h1>

      {certs.length === 0 ? (
        <p className="text-gray-700">No certifications added yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {certs.map((c) => (
            <div key={c.slug} className="border rounded-xl p-5">
              <h2 className="text-lg font-semibold">{c.name}</h2>

              <div className="text-sm text-gray-700 mt-2 space-y-1">
                {c.issuer && <p><span className="font-medium">Issuer:</span> {c.issuer}</p>}
                {c.date && <p><span className="font-medium">Date:</span> {c.date}</p>}
                {c.credentialId && (
                  <p><span className="font-medium">Credential ID:</span> {c.credentialId}</p>
                )}
              </div>

              {c.verify && (
                <a
                  href={c.verify}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm underline mt-3 inline-block"
                >
                  Verify credential
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
