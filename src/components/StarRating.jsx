export default function StarRating({ value = 0, outOf = 5 }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const total = outOf;

  return (
    <div className="inline-flex items-center gap-0.5" aria-label={`${value} out of ${outOf} stars`}>
      {Array.from({ length: total }).map((_, i) => {
        const state = i < full ? "full" : i === full && half ? "half" : "empty";
        return (
          <svg key={i} width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"
            className={
              state === "empty" ? "text-gray-300"
              : state === "half" ? "text-yellow-400"
              : "text-yellow-500"
            }
            fill="currentColor">
            {state === "half" ? (
              <>
                <defs>
                  <linearGradient id={`half-${i}`} x1="0" x2="1">
                    <stop offset="50%" stopColor="currentColor" />
                    <stop offset="50%" stopColor="transparent" />
                  </linearGradient>
                </defs>
                <path d="M12 17.3 6.2 21l1.6-6.7L2 8.9l6.9-.6L12 2l3.1 6.3 6.9.6-5.8 5.4L17.8 21 12 17.3Z" fill={`url(#half-${i})`} />
                <path d="M12 17.3 6.2 21l1.6-6.7L2 8.9l6.9-.6L12 2l3.1 6.3 6.9.6-5.8 5.4L17.8 21 12 17.3Z" fill="none" stroke="currentColor" strokeOpacity="0.25"/>
              </>
            ) : (
              <path d="M12 17.3 6.2 21l1.6-6.7L2 8.9l6.9-.6L12 2l3.1 6.3 6.9.6-5.8 5.4L17.8 21 12 17.3Z" />
            )}
          </svg>
        );
      })}
    </div>
  );
}
