import StarRating from "./StarRating";

export default function HotelCard({ hotel }) {
  return (
    <article className="group h-full overflow-hidden rounded-2xl bg-white ring-1 ring-gray-200 shadow-sm transition hover:shadow-md hover:ring-blue-200">
      {/* Image */}
      <div className="relative">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="h-44 w-full object-cover"
          loading="lazy"
        />
        {hotel.tag && (
          <span className="absolute left-3 top-3 rounded-md bg-black/70 px-2 py-1 text-xs font-medium text-white">
            {hotel.tag}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h4 className="text-lg font-semibold text-gray-900">{hotel.name}</h4>
          {hotel.rating != null && (
            <div className="shrink-0 text-right">
              <div className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1">
                <span className="text-blue-700 text-sm font-semibold">{hotel.rating.toFixed?.(1) ?? hotel.rating}</span>
                <span className="text-[11px] text-blue-700/80">/ 5</span>
              </div>
              {hotel.reviewCount != null && (
                <p className="mt-1 text-[11px] text-gray-500">{hotel.reviewCount} reviews</p>
              )}
            </div>
          )}
        </div>

        {hotel.stars != null && (
          <div className="mt-1">
            <StarRating value={hotel.stars} />
          </div>
        )}

        <p className="mt-2 line-clamp-2 text-sm text-gray-600">{hotel.description}</p>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">From</p>
            <p className="text-xl font-bold text-blue-700">
              ₹{formatNumber(hotel.pricePerNight)}
              <span className="ml-1 align-middle text-sm font-medium text-gray-500">/night</span>
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            See availability
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 12H7.8l5.6-5.6L12 3l-9 9 9 9 1.4-3.4L7.8 12H21Z" />
            </svg>
          </a>
        </div>
      </div>
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
