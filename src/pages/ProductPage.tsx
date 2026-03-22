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
    <div className="pdp-wrapper">
      <div className="card product-layout">
        {/* LEFT: IMAGE */}
        <div className="product-image" style={{ paddingTop: 30 }}>
          <div className="img-placeholder">📦</div>
        </div>

        {/* RIGHT: DETAILS */}
        <div className="product-info" style={{ marginLeft: "50px"}}>
          <h2>{item.name}</h2>

          <div className="text-muted">SKU: {item.sku}</div>
          <div className="price">₹{item.price}</div>
          <div className="text-muted">Stock: {item.stock}</div>

          <div style={{ marginTop: 16 }}>
            <h4>Specifications</h4>
            <table className="spec-table">
              <tbody>
                {Object.entries(attrs).map(([k, v]) => (
                  <tr key={k}>
                    <td>{k}</td>
                    <td>{String(v)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button className="btn primary" style={{ marginTop: 16 }}>
            Add to Cart
          </button>
          <div style={{ marginTop: 12 }}>
            <Link to="/">Back</Link>
          </div>
        </div>
      </div>
    </div>
  );
}