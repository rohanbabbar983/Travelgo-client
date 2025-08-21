import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TripCard from "../components/TripCard";
import HotelCard from "../components/HotelCard";
import AttractionCard from "../components/AttractionCard";
import CardSkeleton from "../components/CardSkeleton";
import EmptyState from "../components/EmptyState";
import { HOST } from "../constants/baseURLs";

const container = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";

export default function CityPage() {
  const { city } = useParams();
  const [trips, setTrips] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [attractions, setAttractions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let ignore = false;
    const c = axios.CancelToken.source();

    async function load() {
      setLoading(true);
      setErr(null);
      try {
        const [tr, ho, at] = await Promise.all([
          axios.get(`${HOST}/trips?city=${encodeURIComponent(city)}`, { cancelToken: c.token }),
          axios.get(`${HOST}/hotels?city=${encodeURIComponent(city)}`, { cancelToken: c.token }),
          axios.get(`${HOST}/attractions?city=${encodeURIComponent(city)}`, { cancelToken: c.token }),
        ]);
        if (!ignore) {
          setTrips(Array.isArray(tr.data) ? tr.data : []);
          setHotels(Array.isArray(ho.data) ? ho.data : []);
          setAttractions(Array.isArray(at.data) ? at.data : []);
        }
      } catch (e) {
        if (!axios.isCancel(e)) setErr("We couldn’t load this city right now. Please try again.");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
      c.cancel();
    };
  }, [city]);

  return (
    <div className="bg-white">
      <div className={`${container} space-y-4 py-8 sm:py-10`}>
        {/* Heading */}
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm text-gray-500">Destination</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
              Explore <span className="text-blue-600">{decodeURIComponent(city)}</span>
            </h2>
          </div>
          <div className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700">
            <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-70" fill="currentColor">
              <path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2Zm1 11h5v2h-7V7h2v6Z" />
            </svg>
            Best time to visit varies — check deals below
          </div>
        </div>

        {/* Error */}
        {err && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            {err}
          </div>
        )}

        {/* TRIPS */}
        <Section
          title="Trips & Packages"
          subtitle="Curated itineraries and day trips"
          loading={loading}
          items={trips}
          skeletonCount={3}
          renderItem={(trip) => <TripCard key={trip.id} trip={trip} />}
          emptyNote="No trips found for this city yet."
        />

        {/* HOTELS */}
        <Section
          title="Hotels & Stays"
          subtitle="Top-rated stays with great prices"
          loading={loading}
          items={hotels}
          skeletonCount={6}
          renderItem={(hotel) => <HotelCard key={hotel.id} hotel={hotel} />}
          emptyNote="No hotels found. Try different dates."
          className="mt-12"
        />

        {/* ATTRACTIONS */}
        <Section
          title="Attractions"
          subtitle="Must-see places & experiences"
          loading={loading}
          items={attractions}
          skeletonCount={6}
          renderItem={(a) => <AttractionCard key={a.id} attraction={a} />}
          emptyNote="No attractions available right now."
          className="mt-12"
        />
      </div>
    </div>
  );
}

function Section({ title, subtitle, loading, items, skeletonCount = 3, renderItem, emptyNote, className }) {
  if(!items) return;
  return (
    <section className={className}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
          <p className="text-gray-600">{subtitle}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: skeletonCount }).map((_, i) => <CardSkeleton key={i} />)
          : items.length > 0
          ? items.map(renderItem)
          : <EmptyState note={emptyNote} />}
      </div>
    </section>
  );
}
