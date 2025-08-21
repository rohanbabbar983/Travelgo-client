export default function TripCard({ trip }) {
  return (
    <article className="group h-full rounded-2xl bg-white p-4 ring-1 ring-gray-200 shadow-sm transition hover:shadow-md hover:ring-blue-200">
      <header className="flex items-start justify-between gap-3">
        <h4 className="text-lg font-semibold text-gray-900">{trip.title}</h4>
        {trip.badge && (
          <span className="shrink-0 rounded-lg bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
            {trip.badge}
          </span>
        )}
      </header>

      <p className="mt-1 text-sm text-gray-500">{trip.duration}</p>

      <div className="mt-3 flex items-center justify-between">
        <p className="text-blue-700 font-bold">₹{formatNumber(trip.price)}</p>
        {trip.freeCancellation && (
          <span className="rounded-md bg-green-50 px-2 py-1 text-xs text-green-700">
            Free cancellation
          </span>
        )}
      </div>

      <p className="mt-3 line-clamp-3 text-sm text-gray-600">{trip.description}</p>

      <footer className="mt-4">
        <a
          href="#"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          View details
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 12H7.8l5.6-5.6L12 3l-9 9 9 9 1.4-3.4L7.8 12H21Z" />
          </svg>
        </a>
      </footer>
    </article>
  );
}

function formatNumber(n) {
  if (n == null) return "-";
  try {
    return new Intl.NumberFormat("en-IN").format(n);
  } catch {
    return String(n);
  }
}
