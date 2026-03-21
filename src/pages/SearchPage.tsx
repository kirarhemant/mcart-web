import { useEffect, useState } from "react";
import { search } from "../api/search";
import { Link, useSearchParams } from "react-router-dom";
import { CardSkeleton } from "../components/Skeleton";

export default function SearchPage() {
  const [params] = useSearchParams();
  const q = params.get("q") || "";

  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [brands, setBrands] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState<number | null>(null);
  const [priceMax, setPriceMax] = useState<number | null>(null);

  useEffect(() => {
    if (!q) return;

    (async () => {
      setLoading(true);

      const res = await search(q, 0, 10, {
        brand: brands,
        priceMin,
        priceMax
      });

      setItems(res?.hits?.hits || []);
      setLoading(false);
    })();
  }, [q, brands, priceMin, priceMax]);

return (
  <div className="grid">

    {/* Sidebar (FILTERS) */}
    <aside className="card">
      <h3>Filters</h3>

      <div>Brand:</div>

      <label>
        <input
          type="checkbox"
          onChange={e => {
            if (e.target.checked) {
              setBrands(prev => [...prev, "Acme"]);
            } else {
              setBrands(prev => prev.filter(b => b !== "Acme"));
            }
          }}
        /> Acme
      </label>

      <label>
        <input
          type="checkbox"
          onChange={e => {
            if (e.target.checked) {
              setBrands(prev => [...prev, "GigaTek"]);
            } else {
              setBrands(prev => prev.filter(b => b !== "GigaTek"));
            }
          }}
        /> GigaTek
      </label>

      <div>Price Min</div>
      <input type="number" onChange={e => setPriceMin(Number(e.target.value))} />

      <div>Price Max</div>
      <input type="number" onChange={e => setPriceMax(Number(e.target.value))} />
    </aside>

    {/* Main Content */}
    <section>
      <h2>Search results for "{q}"</h2>

      {loading ? (
        Array.from({ length: 5 }).map((_, i) => <CardSkeleton key={i} />)
      ) : items.length === 0 ? (
        <div className="card">No results found</div>
      ) : (
        items.map((h, i) => (
          <div key={i} className="card">
            <h3>{h._source.name}</h3>
            <div>{h._source.brand}</div>
            <div>₹{h._source.price}</div>
            <Link to={`/p/${h._source.sku}`}>View</Link>
          </div>
        ))
      )}
    </section>
  </div>
);
}