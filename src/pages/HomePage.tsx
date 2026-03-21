import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const items = [
    { sku: "SKU-00001", name: "Mobile", price: 100 },
    { sku: "SKU-00002", name: "Laptop", price: 200 },
    { sku: "SKU-00003", name: "Shoes", price: 300 },
  ];

  return (
    <div>
      <h2>Welcome to mcart</h2>

      <div style={{ display: "flex", gap: 12 }}>
        {items.map((p) => (
          <div key={p.sku} className="card">
            <h3>{p.name}</h3>
            <div>₹{p.price}</div>
            <Link to={`/p/${p.sku}`}>View</Link>
          </div>
        ))}
      </div>
    </div>
  );
}