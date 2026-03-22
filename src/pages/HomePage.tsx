import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>

      {/* TRENDING */}
      <h2 style={{ textAlign: "center" }}>🔥 Trending</h2>
      <div className="products-grid">
        <Link to="/search?categories=Mobiles&priceMax=10000" className="card">
          Mobiles under ₹10,000
        </Link>

        <Link to="/search?categories=Laptops&priceMax=40000" className="card">
          Laptops under ₹40,000
        </Link>

        <Link to="/search?categories=Men&priceMax=800" className="card">
          Men's apparel under ₹800
        </Link>

        <Link to="/search?categories=Women&priceMax=1500" className="card">
          Women's apparel under ₹1500
        </Link>
      </div>


      {/* TOP BRANDS */}
      <h2 style={{ textAlign: "center", marginTop: 32 }}>🏷 Top Brands</h2>
      <div className="products-grid">
        <Link to="/search?brand=Acme" className="card">Acme</Link>
        <Link to="/search?brand=Nova" className="card">Nova</Link>
        <Link to="/search?brand=FabWear" className="card">FabWear</Link>
        <Link to="/search?brand=GigaTek" className="card">GigaTek</Link>
      </div>


      {/* SHOP BY CATEGORY */}
      <h2 style={{ textAlign: "center", marginTop: 32 }}>🛒 Shop by Category</h2>
      <div className="products-grid">
        <Link to="/catalog?cat=Men" className="card">Men's Clothing</Link>
        <Link to="/catalog?cat=Women" className="card">Women's Clothing</Link>
        <Link to="/catalog?cat=Laptops" className="card">Laptops</Link>
        <Link to="/catalog?cat=Mobiles" className="card">Mobiles</Link>
      </div>

    </div>
  );
}