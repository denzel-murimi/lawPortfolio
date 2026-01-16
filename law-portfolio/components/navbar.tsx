import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b">
      <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-semibold">
          Dr. Edward Murimi
        </Link>

        <div className="flex gap-6 text-sm">
          <Link href="/about">About</Link>
          <Link href="/certifications">Certifications</Link>
          <Link href="/publications">Publications</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
