import { Link } from "react-router-dom";
import acmeLogo from '../assets/brand-acme.png'
import novaLogo from '../assets/brand-nova.png'
import fabwearLogo from '../assets/brand-fabwear.png'
import gigatekLogo from '../assets/brand-gigatek.png'
import mobilesLogo from '../assets/mobiles.png'
import laptopsLogo from '../assets/laptops.png'
import menapparelsLogo from '../assets/menapparels.png'
import womenapparelsLogo from '../assets/womenapparels.png'

export default function HomePage() {
  return (
    <div>

      {/* TRENDING */}
      <h2 style={{ textAlign: "center" }}>🔥 Trending</h2>
      <div className="products-grid">
        <Link to="/search?categories=Mobiles&priceMax=10000" className="card">
          <img src="https://storage.googleapis.com/mcart-images-bucket/mobile1.jpg" className="product-img"/>
          <div>Mobiles under ₹10,000</div>
        </Link>

        <Link to="/search?categories=Laptops&priceMax=40000" className="card">
          <img src="https://storage.googleapis.com/mcart-images-bucket/laptop1.jpg" className="product-img"/>
          <div>Laptops under ₹40,000</div>
        </Link>

        <Link to="/search?categories=Men&priceMax=800" className="card">
          <img src="https://storage.googleapis.com/mcart-images-bucket/men-apparel1.jpg" className="product-img"/>
          <div>Men's apparel under ₹800</div>
        </Link>

        <Link to="/search?categories=Women&priceMax=1500" className="card">
          <img src="https://storage.googleapis.com/mcart-images-bucket/women-apparel1.jpg" className="product-img"/>
          <div>Women's apparel under ₹1500</div>
        </Link>
      </div>


      {/* TOP BRANDS */}
      <h2 style={{ textAlign: "center", marginTop: 32 }}>🏷 Top Brands</h2>
      <div className="products-grid">
        <Link to="/search?brand=Acme" className="card">
          <img src={acmeLogo} className="product-img" />
          <div>Acme</div>
        </Link>
        <Link to="/search?brand=Nova" className="card">
          <img src={novaLogo} className="product-img" />
          <div>Nova</div>
        </Link>
        <Link to="/search?brand=FabWear" className="card">
          <img src={fabwearLogo} className="product-img" />
          <div>FabWear</div>
        </Link>
        <Link to="/search?brand=GigaTek" className="card">
          <img src={gigatekLogo} className="product-img" />
          <div>GigaTek</div>
        </Link>
      </div>


      {/* SHOP BY CATEGORY */}
      <h2 style={{ textAlign: "center", marginTop: 32 }}>🛒 Shop by Category</h2>
      <div className="products-grid">
        <Link to="/catalog?cat=Men" className="card">
          <img src={menapparelsLogo} className="product-img" />
          <div>Men's Clothing</div>
        </Link>
        <Link to="/catalog?cat=Women" className="card">
          <img src={womenapparelsLogo} className="product-img" />
          <div>Women's Clothing</div></Link>
        <Link to="/catalog?cat=Laptops" className="card">
          <img src={laptopsLogo} className="product-img" />
          <div>Laptops</div></Link>
        <Link to="/catalog?cat=Mobiles" className="card">
          <img src={mobilesLogo} className="product-img" />
          <div>Mobiles</div></Link>
      </div>

    </div>
  );
}