import { useEffect, useRef, useState } from "react";
import { suggest } from "../api/search";
import { useNavigate, useLocation } from "react-router-dom";

export default function SearchBar() {
  const [q, setQ] = useState("");
  const [items, setItems] = useState<any[]>([]);
  const nav = useNavigate();
  const t = useRef<number | undefined>(undefined);

  const location = useLocation();

  useEffect(() => {
    setQ("");
    setItems([]);
  }, [location.pathname]);

  useEffect(() => {
    if (!q) {
      setItems([]);
      return;
    }
    if (q.length < 3) {
      setItems([]);
      return;
    }
    window.clearTimeout(t.current);
    t.current = window.setTimeout(async () => {
      const data = await suggest(q, 5);
      setItems(data?.hits?.hits || []);
    }, 300);
  }, [q]);

  function highlight(text: string, query: string) {
    if (!query) return text;

    const parts = text.split(new RegExp(`(${query})`, "gi"));

    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase()
        ? <b key={i}>{part}</b>
        : part
    );
  }

  return (
    <div style={{ position: "relative" }}>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search…"
        onKeyDown={(e) => {
          if (e.key === "Enter" && q.trim()) {
            nav(`/search?q=${encodeURIComponent(q)}`);
            setQ("");       // clear input
            setItems([]);   // hide suggestions
          }
        }}
      />
      <button
        onClick={() => {
          if (!q.trim()) return;
          nav(`/search?q=${encodeURIComponent(q)}`);
          setQ("");
          setItems([]);
        }}
      >
        Search
      </button>

      {!!items.length && (
        <div style={{
          position: "absolute",
          background: "#fff",
          border: "1px solid #eee",
          width: "100%",
          zIndex: 10
        }}>
          {items.map((h, i) => (
            <div key={i} style={{ padding: 8 }}>
              <div style={{ cursor: "pointer" }} onClick={() => {
                nav(`/p/${h._source.sku}`);
                setQ("");
                setItems([]);
              }}>
                {highlight(h._source.name, q)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}