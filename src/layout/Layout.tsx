import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import SearchBar from "../components/SearchBar";
import mcartLogo from '../assets/mcart-logo.png'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  return (
    <div className="app">
      <header className="app-header">
        {/*<div className="brand"><Link to="/">mcart</Link></div>*/}
        <Link to="/">
          <div className="brand">
            <img src={mcartLogo} width="108" height="43" alt="mcart - demo for NAGP" />
          </div>
        </Link>

        <nav className="menu">
          <Link to="/">Home</Link>
          <div className="dropdown-parent">
            <span onClick={() => nav("/catalog")}>Electronics</span>
            <div className="dropdown">
              <Link to="/catalog?cat=Mobiles">Mobiles</Link>
              <Link to="/catalog?cat=Laptops">Laptops</Link>
            </div>
          </div>
          <div className="dropdown-parent">
            <span onClick={() => nav("/catalog")}>Apparel</span>
            <div className="dropdown">
              <Link to="/catalog?cat=Men">Men</Link>
              <Link to="/catalog?cat=Women">Women</Link>
            </div>
          </div>
          {/*<Link to="/search">Search</Link>*/}
        </nav>
        <SearchBar />

        <div className="profile">
          {user ? (
            <div className="profile-menu">
              <span className="profile-name">
                {user.displayName ?? user.email}
              </span>
              <div className="dropdown">
                <Link to="/account">My Account</Link>
                <button onClick={() => logout().then(() => nav("/"))}>
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", gap: 12 }}>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          )}
        </div>
      </header>

      <main className="app-main">{children}</main>

      <footer className="app-footer">
        <div>© {new Date().getFullYear()} mcart — demo for NAGP</div>
        <div>
          <a href="https://github.com/kirarhemant" target="_blank">
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}