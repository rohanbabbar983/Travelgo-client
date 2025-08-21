export default function AttractionCard({ attraction }) {
  return (
    <article className="group h-full overflow-hidden rounded-2xl bg-white ring-1 ring-gray-200 shadow-sm transition hover:shadow-md hover:ring-blue-200">
      <div className="relative">
        <img
          src={attraction.image}
          alt={attraction.name}
          className="h-44 w-full object-cover"
          loading="lazy"
        />
        {attraction.category && (
          <span className="absolute left-3 top-3 rounded-md bg-white/90 px-2 py-1 text-xs font-medium text-gray-900">
            {attraction.category}
          </span>
        )}
      </div>

      <div className="p-4">
        <h4 className="text-lg font-semibold text-gray-900">{attraction.name}</h4>
        <p className="mt-2 line-clamp-3 text-sm text-gray-600">{attraction.description}</p>

        <div className="mt-4 flex items-center justify-between">
          {attraction.openNow != null && (
            <span
              className={`rounded-md px-2 py-1 text-xs font-medium ${
                attraction.openNow ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600"
              }`}
            >
              {attraction.openNow ? "Open now" : "Closed"}
            </span>
          )}
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            View on map
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 12H7.8l5.6-5.6L12 3l-9 9 9 9 1.4-3.4L7.8 12H21Z" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}
