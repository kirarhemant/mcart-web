import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductBySku } from "../api/catalog";
import type { Product } from "../api/catalog";
import { Link } from "react-router-dom";
import { Line } from "../components/Skeleton";
import placeholder from '../assets/vite.svg'

export default function ProductPage() {
  const { sku } = useParams();
  const [item, setItem] = useState<Product | null>(null);
  const [imgIndex, setImgIndex] = useState(0);

  {/*useEffect(() => { if (sku) getProductBySku(sku).then(setItem); }, [sku]);*/}

  useEffect(() => {
    if (sku) {
      getProductBySku(sku).then((product) => {
        setItem(product);
        setImgIndex(0);
      });
    }
  }, [sku]);

  if (!item) {
    return (
      <div className="card">
        <Line h={20} w="60%" />
        <Line />
        <Line w="40%" />
      </div>
    );
  }

  let images: string[] = [];
  if (item.images) {
    try {
      const parsed = JSON.parse(item.images);
      if (Array.isArray(parsed)) images = parsed;
    } catch (e) {
      console.error("Failed to parse images JSON", e);
    }
  }
  // Fallback to single `image` field if `images` is missing/empty
  if (images.length === 0 && item.image) {
    images = [item.image];
  }
  // If still no images, use a placeholder
  if (images.length === 0) {
    images = [placeholder];  // you can use any default image URL
  }

  const attrs = item.attributes ? JSON.parse(item.attributes) : {};
  const currentImage = images[imgIndex];

  return (
    <div className="pdp-wrapper">
      <div className="card product-layout">
        {/* LEFT: IMAGE */}
        <div className="product-image" style={{ paddingTop: 30 }}>
          <img
            src={currentImage}
            className="pdp-img"
            alt={item.name}
            style={{ width: "100%", maxWidth: "400px", borderRadius: "8px" }}
          />
          {images.length > 1 && (
            <div className="thumbs" style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setImgIndex(i)}
                  className={i === imgIndex ? "active" : ""}
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    cursor: "pointer",
                    border: i === imgIndex ? "2px solid #007bff" : "1px solid #ddd",
                    borderRadius: "4px",
                  }}
                  alt={`Thumbnail ${i + 1}`}
                />
              ))}
            </div>
          )}
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