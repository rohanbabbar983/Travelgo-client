const container = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";

const cols = [
  {
    title: "Company",
    links: ["About", "Careers", "Press", "Partner with us"],
  },
  {
    title: "Explore",
    links: ["Hotels", "Flights", "Holiday packages", "Trains", "Cabs"],
  },
  {
    title: "Support",
    links: ["Help Center", "Cancellation options", "Safety information", "Contact us"],
  },
  {
    title: "Legal",
    links: ["Terms", "Privacy", "Cookie Policy", "Refund Policy"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className={`${container} py-14`}>
        {/* Top: Newsletter + App badges */}
        <div className="grid lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold text-gray-900">
              Get deals and travel inspo in your inbox
            </h3>
            <form
              className="mt-4 flex flex-col sm:flex-row gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Subscribed!");
              }}
            >
              <label className="sr-only" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full sm:max-w-md rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Subscribe
              </button>
            </form>
            <p className="mt-2 text-xs text-gray-500">
              By subscribing you agree to our Privacy Policy.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-3 text-sm font-medium text-gray-800 hover:bg-white"
            >
              {/* App Store icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2c3.5 0 6 2.6 6 6v8c0 3.4-2.5 6-6 6s-6-2.6-6-6V8c0-3.4 2.5-6 6-6Z" />
              </svg>
              App Store
            </a>
            <a
              href="#"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-3 text-sm font-medium text-gray-800 hover:bg-white"
            >
              {/* Play icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="m8 5 11 7-11 7V5Z" />
              </svg>
              Google Play
            </a>
          </div>
        </div>

        {/* Middle: Links */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="text-sm font-semibold text-gray-900">{c.title}</h4>
              <ul className="mt-4 space-y-2">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom: Locale + Social + Copyright */}
        <div className="mt-12 border-t border-gray-200 pt-6 flex flex-col gap-4 sm:flex-row items-center justify-between">

          <div className="flex items-center gap-3">
            {[
              { label: "Facebook", path: "M9 8H7v4h2v8h4v-8h3l1-4h-4V6a1 1 0 0 1 1-1h3V1h-3a5 5 0 0 0-5 5v2Z" },
              { label: "Instagram", path: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z" },
            ].map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 hover:bg-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} TravelGo Pvt Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
