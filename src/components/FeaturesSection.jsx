const container = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";

const features = [
  {
    title: "Exclusive Member Deals",
    desc: "Unlock extra discounts and last-minute offers on select stays.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M12 2 2 7l10 5 10-5-10-5Zm0 20-10-5V9l10 5 10-5v8l-10 5Z" />
      </svg>
    ),
  },
  {
    title: "Free Cancellations",
    desc: "Clear policies surfaced upfront before you commit to pay.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M3 6h18v2H3V6Zm0 5h18v2H3v-2Zm0 5h18v2H3v-2Z" />
      </svg>
    ),
  },
  {
    title: "24×7 Support",
    desc: "Chat with our assistant anytime for faster resolutions.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M12 3a9 9 0 0 0-9 9c0 4 2.6 7.4 6.2 8.5V21l3 0 3 0v-.5A9 9 0 0 0 12 3Z" />
      </svg>
    ),
  },
  {
    title: "Verified Reviews",
    desc: "Real traveler feedback to help you choose confidently.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M12 17.3 6.2 21l1.6-6.7L2 8.9l6.9-.6L12 2l3.1 6.3 6.9.6-5.8 5.4L17.8 21 12 17.3Z" />
      </svg>
    ),
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-14 sm:py-20 bg-gray-50">
      <div className={container}>
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Why travelers love us
          </h2>
          <p className="mt-3 text-gray-600">
            Built for speed, clarity, and savings — with the polish you expect from the big guys.
          </p>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map(({ title, desc, icon }) => (
            <div
              key={title}
              className="group rounded-2xl cursor-pointer bg-white p-6 shadow-sm ring-1 ring-gray-200 hover:shadow-md hover:ring-blue-200 transition"
            >
              <div className="inline-flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 p-3 group-hover:bg-blue-100">
                {icon}
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">{title}</h3>
              <p className="mt-2 text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
