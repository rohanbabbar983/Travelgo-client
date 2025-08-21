import { useState } from "react";
import SearchBar from "./SearchBar";

const container = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";

export default function HeroSection() {
  const [form, setForm] = useState({
    destination: "",
    checkin: "",
    checkout: "",
    guests: 2,
  });

  return (
    <section className="relative min-h-[80svh] md:min-h-[100svh] overflow-hidden">
      {/* background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-700 via-blue-600 to-blue-500" />
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-24 w-[520px] h-[520px] rounded-full blur-3xl opacity-30 bg-cyan-300"
      />
      <div className={`${container} py-14 sm:py-20`}>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="text-white">
            <p className="inline-block rounded-full bg-white/10 px-3 py-1 text-sm backdrop-blur">
              New • Hand-picked stays & deals
            </p>
            <h1 className="mt-4 text-4xl sm:text-5xl font-bold leading-tight">
              Find your next perfect <span className="text-cyan-200">stay</span>
            </h1>
            <p className="mt-4 text-white/90 text-lg">
              Search destinations, compare top hotels, and snag exclusive prices.
            </p>

            {/* Search card */}
            <div className="my-5">
              <SearchBar/>
            </div>
          </div>

          {/* image side */}
          <div className="hidden lg:block">
            <div className="relative">
              <img
                alt="Travel collage"
                className="rounded-3xl shadow-2xl aspect-[4/3] object-cover w-full"
                src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1600&auto=format&fit=crop"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-lg p-4">
                <p className="text-sm font-semibold">Best Price Match</p>
                <p className="text-xs text-gray-500">Across 2,000+ stays</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
