import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductBySku } from "../api/catalog";
import type { Product } from "../api/catalog";
import { Link } from "react-router-dom";
import { Line } from "../components/Skeleton";

export default function ProductPage() {
  const { sku } = useParams();
  const [item, setItem] = useState<Product | null>(null);

  useEffect(() => { if (sku) getProductBySku(sku).then(setItem); }, [sku]);

  if (!item) {
    return (
      <div className="card">
        <Line h={20} w="60%" />
        <Line />
        <Line w="40%" />
      </div>
    );
  }
  const attrs = item.attributes ? JSON.parse(item.attributes) : {};

  return (
    <div className="card">
      <h2>{item.name}</h2>
      <div>SKU: {item.sku}</div>
      <div>Price: ₹{item.price}</div>
      <div>Stock: {item.stock}</div>
      <div style={{ marginTop: 12 }}>
        <h4>Specifications</h4>
        <table>
          <tbody>
            {Object.entries(attrs).map(([k, v]) => (
              <tr key={k}>
                <td style={{ padding: "4px 12px", fontWeight: 500 }}>{k}</td>
                <td style={{ padding: "4px 12px" }}>{String(v)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="btn primary" style={{ marginTop: 12 }}>
        Add to Cart
      </button>

      <div style={{ marginTop: 12 }}>
        <Link to="/">Back</Link>
      </div>
    </div>
  );
}