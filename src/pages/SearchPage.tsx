import { useEffect, useState } from "react";
import { search } from "../api/search";
import { Link, useSearchParams } from "react-router-dom";
import { CardSkeleton } from "../components/Skeleton";

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "";
  const pageFromUrl = Number(params.get("page") || 0);
  const sortFromUrl = params.get("sort") || "relevance";
  const brandFromUrl = params.getAll("brand");
  const priceMinFromUrl = params.get("priceMin");
  const priceMaxFromUrl = params.get("priceMax");
  const categoriesFromUrl = params.getAll("categories");

  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [brands, setBrands] = useState<string[]>(brandFromUrl);
  const [priceMin, setPriceMin] = useState<number | null>(priceMinFromUrl ? Number(priceMinFromUrl) : null);
  const [priceMax, setPriceMax] = useState<number | null>(priceMaxFromUrl ? Number(priceMaxFromUrl) : null);
  const [page, setPage] = useState(pageFromUrl);
  const [sort, setSort] = useState(sortFromUrl);

  const size = 12;

  useEffect(() => {
    if (!q && brands.length === 0 && !priceMin && !priceMax && categoriesFromUrl.length === 0) {
      return;
    }
    (async () => {
      setLoading(true);

      const res = await search(q, page, size, {
        brand: brands,
        categories: categoriesFromUrl,
        priceMin,
        priceMax
      }, sort);

      setItems(res?.hits?.hits || []);
      setLoading(false);
    })();
  }, [q, brands, priceMin, priceMax, page, sort]);

  useEffect(() => {
    const newParams: any = {
      q,
      page,
      sort
    };

    if (brands.length) newParams.brand = brands;
    if (priceMin !== null) newParams.priceMin = priceMin;
    if (priceMax !== null) newParams.priceMax = priceMax;
    if (categoriesFromUrl.length) newParams.categories = categoriesFromUrl;

    const current = params.toString();
    const next = new URLSearchParams(newParams).toString();

    if (current !== next) {
      setParams(newParams, { replace: true });
    }
  }, [q, brands, priceMin, priceMax, page, sort]);

return (
  <div className="grid">

    {/* Sidebar (FILTERS) */}
    <aside className="card">
      <h3>Filters</h3>

      <div>Brand:</div>

      <label>
        <input
          type="checkbox"
          style={{ width: "10%" }}
          checked={brands.includes("Acme")}
          onChange={e => {
            if (e.target.checked) {
              setBrands(prev => [...prev, "Acme"]);
              setPage(0);
            } else {
              setBrands(prev => prev.filter(b => b !== "Acme"));
            }
          }}
        /> Acme
      </label>
      <br/>
      <label>
        <input
          type="checkbox"
          style={{ width: "10%" }}
          checked={brands.includes("GigaTek")}
          onChange={e => {
            if (e.target.checked) {
              setBrands(prev => [...prev, "GigaTek"]);
              setPage(0);
            } else {
              setBrands(prev => prev.filter(b => b !== "GigaTek"));
            }
          }}
        /> GigaTek
      </label>
      <br/>
      <label>
        <input
          type="checkbox"
          style={{ width: "10%" }}
          checked={brands.includes("FabWear")}
          onChange={e => {
            if (e.target.checked) {
              setBrands(prev => [...prev, "FabWear"]);
              setPage(0);
            } else {
              setBrands(prev => prev.filter(b => b !== "FabWear"));
            }
          }}
        /> FabWear
      </label>
      <br/>
      <label>
        <input
          type="checkbox"
          style={{ width: "10%" }}
          checked={brands.includes("Nova")}
          onChange={e => {
            if (e.target.checked) {
              setBrands(prev => [...prev, "Nova"]);
              setPage(0);
            } else {
              setBrands(prev => prev.filter(b => b !== "Nova"));
            }
          }}
        /> Nova
      </label>
      <br/>
      <br/>
      <div>Price Min</div>
      <input type="number"
      value={priceMin ?? ""}
      onChange={e => {
        setPriceMin(Number(e.target.value) || null);
        setPage(0);
        }} />

      <div>Price Max</div>
      <input type="number"
      value={priceMax ?? ""}
      onChange={e => {
        setPriceMax(Number(e.target.value) || null);
        setPage(0);
      }} />
    </aside>

    {/* Main Content */}
    <section>
      <h2>{q ? `Search results for "${q}"` : "Results"}</h2>
      <div className="results-header">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>

          {brands.map(b => (
            <div className="card" style={{ padding: "4px 8px" }}>
              {b}
              <span style={{ cursor: "pointer", marginLeft: 6 }}
                onClick={() => setBrands(prev => prev.filter(x => x !== b))}
              >
                ❌
              </span>
            </div>
          ))}

          {priceMin && (
            <div className="card" style={{ padding: "4px 8px" }}>
              &gt; ₹{priceMin}
              <span style={{ cursor: "pointer", marginLeft: 6 }}
                onClick={() => setPriceMin(null)}
              >
                ❌
              </span>
            </div>
          )}

          {priceMax && (
            <div className="card" style={{ padding: "4px 8px" }}>
              &lt; ₹{priceMax}
              <span style={{ cursor: "pointer", marginLeft: 6 }}
                onClick={() => setPriceMax(null)}
              >
                ❌
              </span>
            </div>
          )}

          {categoriesFromUrl.map(c => (
            <div className="card" style={{ padding: "4px 8px" }}>
              {c}
            </div>
          ))}

        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="relevance">Relevance</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>
      {loading ? (
        Array.from({ length: 5 }).map((_, i) => <CardSkeleton key={i} />)
      ) : items.length === 0 ? (
        <div className="card">No results found</div>
      ) : (
        <div className="products-grid">
          {items.map((h, i) => (
            <div key={i} className="card">
              <h3>{h._source.name}</h3>
              <div>{h._source.brand}</div>
              <div>₹{h._source.price}</div>
              <Link to={`/p/${h._source.sku}`}>View</Link>
            </div>
          ))}
        </div>
      )}
      <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
          <button
            className="btn"
            disabled={page === 0}
            onClick={() => setPage(p => p - 1)}
          >
            Prev
          </button>

          <span>Page {page + 1}</span>

          <button
            className="btn"
            disabled={items.length < size}
            onClick={() => setPage(p => p + 1)}
          >
            Next
          </button>
        </div>
    </section>
  </div>
);
}