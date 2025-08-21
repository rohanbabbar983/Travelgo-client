import { useNavigate } from "react-router-dom";

const container = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";

const cities = [
  {
    name: "Goa",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1173&auto=format&fit=crop",
    deals: "120+ stays",
    from: "₹1,499",
  },
  {
    name: "Manali",
    image:
      "https://images.unsplash.com/photo-1712388430474-ace0c16051e2?q=80&w=1074&auto=format&fit=crop&",
    deals: "80+ stays",
    from: "₹999",
  },
  {
    name: "Jaipur",
    image:
      "https://plus.unsplash.com/premium_photo-1661963054563-ce928e477ff3?q=80&w=1170&auto=format&fit=crop",
    deals: "140+ stays",
    from: "₹1,099",
  },
  {
    name: "Bengaluru",
    image:
      'https://plus.unsplash.com/premium_photo-1681550093390-14477e7b196a?q=80&w=1170&auto=format&fit=crop',
    deals: "200+ stays",
    from: "₹1,299",
  },
  {
    name: "Mumbai",
    image:
      "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?q=80&w=1400&auto=format&fit=crop",
    deals: "230+ stays",
    from: "₹1,899",
  },
  {
    name: "Dubai",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1400&auto=format&fit=crop",
    deals: "300+ stays",
    from: "₹2,499",
  },
];

export default function CityBadges() {
  const navigate = useNavigate();
  const onClickHandler = (cityName) =>{
    navigate(`/city/${cityName}`);
  }
  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className={container}>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Popular destinations
            </h2>
            <p className="mt-2 text-gray-600">
              Explore top cities with stellar deals and great reviews.
            </p>
          </div>
          <a
            href="#"
            className="hidden sm:inline-flex text-sm font-semibold text-blue-700 hover:underline"
          >
            View all
          </a>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((c) => (
            <div
              key={c.name}
              onClick={()=>onClickHandler(c.name)}
              className="group cursor-pointer relative overflow-hidden rounded-2xl"
            >
              <img
                src={c.image}
                alt={c.name}
                className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-4 text-white">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold drop-shadow">{c.name}</h3>
                  <span className="rounded-lg bg-white/90 px-2 py-1 text-xs font-medium text-gray-900">
                    from {c.from}
                  </span>
                </div>
                <p className="text-sm text-white/90">{c.deals}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
