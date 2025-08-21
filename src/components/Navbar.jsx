import { useEffect, useState } from "react";

const container = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";

const navLinks = [
  { name: "Stays", href: "#" },
  { name: "Trips", href: "#" },
  { name: "Attractions", href: "#" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled ? "bg-white/95 backdrop-blur border-b border-gray-200 shadow-sm" : "bg-transparent"
      }`}
    >
      {/* Skip link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] bg-blue-600 text-white px-3 py-2 rounded"
      >
        Skip to content
      </a>

      <nav className={container} aria-label="Primary">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <a href="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-700 to-cyan-500 grid place-items-center text-white font-bold">
              T
            </div>
            <span className="font-bold text-lg tracking-tight text-gray-900">
              Travel<span className="text-blue-600">Go</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6">
            <ul className="flex items-center gap-2">
              {navLinks.map((l) => (
                <li key={l.name}>
                  <a
                    href={l.href}
                    className="inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Divider */}
            <span className="h-6 w-px bg-gray-200" />


            {/* Auth CTAs */}
            <a
              href="#"
              className="rounded-lg px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
            >
              Sign in
            </a>
            <a
              href="#"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Create account
            </a>
          </div>

          {/* Mobile actions */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href="#"
              className="hidden xs:inline-flex rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Sign in
            </a>
            <button
              className="inline-flex items-center justify-center rounded-lg p-2 hover:bg-gray-100"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 6h18v2H3V6Zm0 5h18v2H3v-2Zm0 5h18v2H3v-2Z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-[grid-template-rows] duration-300 ${
            open ? "grid grid-rows-[1fr]" : "grid grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <div className="border-t border-gray-200 py-3 space-y-1">
              {navLinks.map((l) => (
                <a
                  key={l.name}
                  href={l.href}
                  className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
                >
                  {l.name}
                </a>
              ))}
            </div>

            <div className="border-t border-gray-200 py-3 flex items-center gap-2">
              <a
                href="#"
                className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-blue-700"
              >
                Create account
              </a>
              <a
                href="#"
                className="flex-1 rounded-lg px-4 py-2 text-center text-sm font-semibold text-blue-700 hover:bg-blue-50"
              >
                Sign in
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
