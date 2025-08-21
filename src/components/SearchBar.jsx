import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Optional: replace with an API call.
 * This static list is only a fallback for local filtering demos.
 */
const CITY_LIST = [
  "Bangalore",
  "Chicago",
  "Colombo",
  "Coorg",
  "Delhi",
  "Dubai",
  "Doha",
  "Florence",
  "Goa",
  "Gurugram",
  "Hyderabad",
  "Istanbul",
  "Jaipur",
  "Jaisalmer",
  "Kolkata",
  "Kuala Lumpur",
  "London",
  "Los Angeles",
  "Manali",
  "Mumbai",
  "Mussoorie",
  "New Delhi",
  "New York",
  "Shimla",
  "Singapore",
  "Sydney",
  "Tokyo",
  "Toronto",
  "Udaipur",
  "Vienna",
  "Zurich",
];

// Debounce hook (simple + reliable)
function useDebouncedValue(value, delay = 250) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

// Highlight helper (wrap matching part in a <mark>)
function Highlight({ text = "", query = "" }) {
  const q = query.trim();
  if (!q) return <>{text}</>;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i === -1) return <>{text}</>;
  const before = text.slice(0, i);
  const match = text.slice(i, i + q.length);
  const after = text.slice(i + q.length);
  return (
    <>
      {before}
      <mark className="bg-yellow-100 rounded px-0.5">{match}</mark>
      {after}
    </>
  );
}

/**
 * Props:
 * - fetcher?: (query: string) => Promise<string[]>     // optional async provider
 * - onSelect?: (city: string) => void                  // optional hook on selection
 */
export default function SearchBar({ fetcher, onSelect }) {
  const [city, setCity] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [active, setActive] = useState(-1);
  const navigate = useNavigate();

  const inputRef = useRef(null);
  const listRef = useRef(null);
  const wrapperRef = useRef(null);

  const debounced = useDebouncedValue(city, 250);
  const listId = "city-suggest-listbox";
  const activeId = active >= 0 ? `option-${active}` : undefined;

  // Click-outside to close
  useEffect(() => {
    const onDocClick = (e) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Fetch suggestions (use fetcher if provided, else local filtering)
  useEffect(() => {
    const q = debounced.trim();
    if (!q) {
      setItems([]);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);

    const doFetch = async () => {
      try {
        let results = [];
        if (fetcher) {
          results = await fetcher(q);
        } else {
          // Local filter as fallback
          results = CITY_LIST.filter((c) =>
            c.toLowerCase().includes(q.toLowerCase())
          ).slice(0, 3); // ⬅️ only top 4 now
        }
        if (!cancelled) {
          setItems(results);
          setOpen(true);
          setActive(-1);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    doFetch();
    return () => {
      cancelled = true;
    };
  }, [debounced, fetcher]);

  const submitCity = (value) => {
    const selected = (value ?? city).trim();
    if (!selected) return;
    onSelect?.(selected);
    setOpen(false);
    navigate(`/city/${encodeURIComponent(selected)}`);
  };

  const onKeyDown = (e) => {
    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setOpen(true);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, items.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      if (open && active >= 0 && items[active]) {
        e.preventDefault();
        submitCity(items[active]);
      }
      // If no item active, normal form submit will run
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const showDropdown = open && (loading || items.length > 0 || city.trim());

  return (
    <div
      ref={wrapperRef}
      className="relative w-full max-w-full overflow-x-clip"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitCity(city);
        }}
        className="flex items-center w-full bg-white rounded-2xl shadow-xl ring-1 ring-gray-200 p-2 focus-within:ring-blue-500 transition"
        role="search"
        aria-label="City search"
      >
        {/* Icon */}
        <span className="ml-1 mr-2 inline-flex items-center justify-center text-gray-400">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M21 20.3 15.9 15A7.5 7.5 0 1 0 15 15.9l5.3 5.1.7-.7ZM4.5 10.5a6 6 0 1 1 12 0 6 6 0 0 1-12 0Z" />
          </svg>
        </span>

        {/* Input (combobox) */}
        <input
          ref={inputRef}
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onFocus={() => city.trim() && setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="Search city e.g. Goa, Delhi, Chennai..."
          className="flex-1 min-w-0 px-2 sm:px-3 py-2 rounded-l-2xl outline-none text-gray-900 placeholder:text-gray-400"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={showDropdown}
          aria-controls={listId}
          aria-activedescendant={activeId}
          aria-haspopup="listbox"
        />

        {/* Submit */}
        <button
          type="submit"
          className="inline-flex items-center text-sm md:text-base gap-2 cursor-pointer rounded-xl bg-blue-600 px-4 sm:px-5 py-2 font-semibold text-white hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M21 12H7.8l5.6-5.6L12 3l-9 9 9 9 1.4-3.4L7.8 12H21Z" />
          </svg>
          Search
        </button>
      </form>

      {/* Dropdown */}
      {showDropdown && (
        <div
          className="absolute left-0 right-0 mt-2 z-40 rounded-xl bg-white shadow-lg ring-1 ring-gray-200 overflow-hidden"
          role="region"
          aria-label="City suggestions"
        >
          <ul
            id={listId}
            role="listbox"
            ref={listRef}
            className="max-h-64 overflow-auto divide-y divide-gray-100"
          >
            {/* Loading state */}
            {loading && (
              <li
                className="px-4 py-3 text-sm text-gray-500"
                role="option"
                aria-disabled="true"
              >
                Searching cities…
              </li>
            )}

            {/* Suggestions */}
            {!loading &&
              items.length > 0 &&
              items.map((name, idx) => (
                <li
                  key={name}
                  role="option"
                  id={`option-${idx}`}
                  aria-selected={idx === active}
                >
                  <button
                    type="button"
                    onMouseEnter={() => setActive(idx)}
                    onMouseDown={(e) => e.preventDefault()} // keep focus on input
                    onClick={() => submitCity(name)}
                    className={`w-full flex cursor-pointer items-center justify-between px-4 py-3 text-left text-sm ${
                      idx === active
                        ? "bg-blue-50 text-blue-700"
                        : "hover:bg-gray-50 text-gray-800"
                    }`}
                  >
                    <span className="truncate">
                      <Highlight text={name} query={city} />
                    </span>
                    <span className="ml-3 shrink-0 text-xs text-gray-500">
                      City
                    </span>
                  </button>
                </li>
              ))}

            {/* No results */}
            {!loading && city.trim() && items.length === 0 && (
              <li
                className="px-4 py-3 text-sm text-gray-500"
                role="option"
                aria-disabled="true"
              >
                No matches. Press Enter to search “{city.trim()}”.
              </li>
            )}
          </ul>

          {/* Footer hint */}
          <div className="px-4 py-2 text-[12px] text-gray-500 bg-gray-50">
            Tip: use ↑ ↓ to navigate • Enter to select • Esc to close
          </div>
        </div>
      )}
    </div>
  );
}
