const container = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";

export default function AboutSection() {
  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className={container}>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Travel smarter, book faster
            </h2>
            <p className="mt-4 text-gray-600 text-lg">
              We blend curated hotel lists, transparent pricing, and a delightful
              booking flow — inspired by the best of MakeMyTrip and Booking.com.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Real-time availability & instant confirmation",
                "Verified reviews and trust badges",
                "Flexible date selection with clear cancellation rules",
                "Mobile-first design that just feels right",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
                    </svg>
                  </span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "https://images.unsplash.com/photo-1707343848552-893e05dba6ac?q=80&w=1170&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1496412705862-e0088f16f791?q=80&w=1200&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1200&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop",
            ].map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`About travel ${i + 1}`}
                className="rounded-2xl object-cover aspect-[4/3] shadow-md"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
