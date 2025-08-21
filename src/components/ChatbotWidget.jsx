import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HOST } from "../constants/baseURLs";

const suggestions = [
  "Show me trips to Manali",
  "What are the best hotels in Goa?",
  "What can I visit in Jaipur?",
];

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", payload: { type: "text", text: "Hi! I’m your travel assistant. Ask me about trips, hotels, or attractions. 😊" } },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const listRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, open]);

  const send = async (text) => {
    const message = text.trim();
    if (!message) return;

    setMessages((m) => [...m, { role: "user", text: message }]);
    setInput("");
    setIsThinking(true);

    try {
      const res = await fetch(`${HOST}/assist/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "bot", payload: data }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "bot", payload: { type: "text", text: "Sorry, I couldn’t reach the server. Please try again." } },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  const onCTA = (to) => {
    setOpen(false);
    navigate(to);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 cursor-pointer right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-600"
        aria-label="Open chat assistant"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3a9 9 0 0 0-9 9c0 4 2.6 7.4 6.2 8.5V21l3 0 3 0v-.5A9 9 0 0 0 12 3Z" />
        </svg>
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-[92vw] max-w-sm rounded-2xl bg-white shadow-2xl ring-1 ring-gray-200">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 rounded-t-2xl bg-gradient-to-r from-blue-700 to-blue-600 px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/15">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3a9 9 0 0 0-9 9c0 4 2.6 7.4 6.2 8.5V21l3 0 3 0v-.5A9 9 0 0 0 12 3Z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold leading-tight">Chatbot Assistant</p>
                <p className="text-xs text-white/80">Ask about trips, hotels, attractions</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-lg px-2 py-1 cursor-pointer hover:bg-white/10"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div ref={listRef} className="max-h-80 overflow-auto p-3 space-y-2">
            {messages.map((m, i) =>
              m.role === "user" ? (
                <div key={i} className="ml-auto max-w-[80%] rounded-2xl bg-blue-600 px-3 py-2 text-sm text-white shadow">
                  {m.text}
                </div>
              ) : (
                <BotMessage key={i} payload={m.payload} onCTA={onCTA} />
              )
            )}

            {isThinking && (
              <div className="inline-flex items-center gap-2 rounded-2xl bg-gray-100 px-3 py-2 text-sm text-gray-700">
                <span className="h-2 w-2 animate-bounce rounded-full bg-gray-500"></span>
                <span className="h-2 w-2 animate-bounce rounded-full bg-gray-500 [animation-delay:120ms]"></span>
                <span className="h-2 w-2 animate-bounce rounded-full bg-gray-500 [animation-delay:240ms]"></span>
              </div>
            )}
          </div>

          {/* Quick suggestions */}
          <div className="flex flex-wrap gap-2 px-3 pb-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-700 hover:border-blue-300 hover:text-blue-700"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-gray-200 p-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Try: Best hotels in Goa"
              className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}

function BotMessage({ payload, onCTA }) {
  if (!payload || payload.type === "text") {
    return (
      <div className="inline-block max-w-[85%] rounded-2xl bg-gray-100 px-3 py-2 text-sm text-gray-800 shadow">
        {payload?.text}
      </div>
    );
  }

  return (
    <div className="inline-block w-full max-w-[95%] rounded-2xl bg-gray-50 px-3 py-2 text-sm text-gray-800 shadow ring-1 ring-gray-200">
      <p className="mb-2 font-semibold text-gray-900">{payload.header}</p>
      <ul className="space-y-2">
        {payload.items.map((it, idx) => (
          <li key={idx} className="rounded-lg bg-white px-3 py-2 ring-1 ring-gray-200">
            <p className="font-medium">{it.title}</p>
            {it.subtitle && <p className="text-xs text-gray-600">{it.subtitle}</p>}
          </li>
        ))}
      </ul>
      {payload.cta && (
        <div className="mt-3">
          <button
            onClick={() => onCTA(payload.cta.to)}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700"
          >
            {payload.cta.label}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 12H7.8l5.6-5.6L12 3l-9 9 9 9 1.4-3.4L7.8 12H21Z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
