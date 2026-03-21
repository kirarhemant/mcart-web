import { useEffect, useRef, useState } from "react";
import { suggest } from "../api/search";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [q, setQ] = useState("");
  const [items, setItems] = useState<any[]>([]);
  const nav = useNavigate();
  const t = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!q) {
      setItems([]);
      return;
    }

    window.clearTimeout(t.current);
    t.current = window.setTimeout(async () => {
      const data = await suggest(q, 5);
      setItems(data?.hits?.hits || []);
    }, 300);
  }, [q]);

  return (
    <div style={{ position: "relative" }}>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search…"
      />
      <button onClick={() => nav(`/search?q=${q}`)}>Search</button>

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
              <div style={{ cursor: "pointer" }} onClick={() => nav(`/p/${h._source.sku}`)}>
                {h._source.name}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}