import { useEffect, useState } from "react";
import type { Product } from "../api/catalog";
import { search } from "../api/search";
import { CardSkeleton } from "../components/Skeleton";
import { Link } from "react-router-dom";

export default function ProductsPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [categoryId] = useState<number>(() => {
    const cat = new URLSearchParams(window.location.search).get("cat");
    if (cat === "Mobiles") return 3;
    if (cat === "Laptops") return 4;
    if (cat === "Men") return 5;
    if (cat === "Women") return 6;
    return 3;
  });
  const [error, setError] = useState<string | null>(null);
  const [brands, setBrands] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState<number | null>(null);
  const [priceMax, setPriceMax] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const size = 12;
  const [sort, setSort] = useState("relevance");

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const categoryName =
        categoryId === 3 ? "Mobiles" :
        categoryId === 4 ? "Laptops" :
        categoryId === 5 ? "Men" :
        categoryId === 6 ? "Women" :
        undefined;

      const res = await search("", page, size, {
        brand: brands,
        priceMin,
        priceMax,
        categories: categoryName ? [categoryName] : undefined
      }, sort);

        const hits = res?.hits?.hits || [];

        const mapped = hits.map((h: any) => ({
          id: h._id,
          sku: h._source.sku,
          name: h._source.name,
          price: h._source.price,
          stock: h._source.stock,
        }));

        setItems(mapped);
        setError(null);
      } catch (e: any) {
        setError(e?.message ?? "Something went wrong");
      } finally {
        setLoading(false);
      }
    })();
  }, [brands, priceMin, priceMax, categoryId, page, sort]);

  return (
    <div className="grid">

      {/* Sidebar */}
      <aside className="card">
        <h3>Filters</h3>
        {/*<div className="text-muted">Category ID:</div>
        
        <input
          type="number"
          value={categoryId}
          onChange={e => setCategory(parseInt(e.target.value || "0", 10))}
        />*/}

        <div>Brand:</div>
        <label>
          <input
            type="checkbox"
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
        <h2>Products</h2>
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

      </div>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="relevance">Relevance</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>

        {error && (
          <div className="card" style={{ borderColor: "red" }}>
            Error: {error}
          </div>
        )}

        {loading ? (
          <>
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </>
        ) : items.length === 0 ? (
          <div className="card">
            No products found. Try another category.
          </div>
        ) : (
          <div className="products-grid">
            {items.map(p => (
              <div key={p.id} className="card">
                <h3>{p.name}</h3>
                <div>₹{p.price}</div>
                <div className="text-muted">Stock: {p.stock}</div>
                <Link to={`/p/${p.sku}`}>View</Link>
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