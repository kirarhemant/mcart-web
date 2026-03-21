import React, { useEffect, useState } from "react";
import type { Product } from "../api/catalog";
import { search } from "../api/search";
import { Line, CardSkeleton } from "../components/Skeleton";
import { Link, useSearchParams } from "react-router-dom";

export default function ProductsPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategory] = useState<number>(3);
  const [error, setError] = useState<string | null>(null);
  const [brands, setBrands] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState<number | null>(null);
  const [priceMax, setPriceMax] = useState<number | null>(null);
  const [params] = useSearchParams();

  useEffect(() => {
    const cat = params.get("cat");
    if (cat === "Mobiles") setCategory(3);
    if (cat === "Laptops") setCategory(4);
  }, [params]);

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

      const res = await search("", 0, 20, {
        brand: brands,
        priceMin,
        priceMax,
        categories: categoryName ? [categoryName] : undefined
      });

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
  }, [brands, priceMin, priceMax, categoryId]);

  return (
    <div className="grid">

      {/* Sidebar */}
      <aside className="card">
        <h3>Filters</h3>
        <div className="text-muted">Category ID:</div>
        <input
          type="number"
          value={categoryId}
          onChange={e => setCategory(parseInt(e.target.value || "0", 10))}
        />

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
        <h2>Products</h2>

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
          <div>
            {items.map(p => (
              <div key={p.id} className="card" style={{ marginBottom: 12 }}>
                <h3>{p.name}</h3>
                <div>₹{p.price}</div>
                <div className="text-muted">Stock: {p.stock}</div>
                <Link to={`/p/${p.sku}`}>View</Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}