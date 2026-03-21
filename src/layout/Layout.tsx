import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import SearchBar from "../components/SearchBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  return (
    <div className="app">
      <header className="app-header">
        <div className="brand"><Link to="/">mcart</Link></div>

        <nav className="menu">
          <Link to="/">Home</Link>
          <div className="dropdown-parent">
            <span onClick={() => nav("/catalog")}>Catalog</span>
            <div className="dropdown">
              <Link to="/catalog?cat=Mobiles">Mobiles</Link>
              <Link to="/catalog?cat=Laptops">Laptops</Link>
            </div>
          </div>
          <Link to="/search">Search</Link>
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
            <Link to="/login">Login / Sign up</Link>
          )}
        </div>
      </header>

      <main className="app-main">{children}</main>

      <footer className="app-footer">
        <div>© {new Date().getFullYear()} mcart — Demo</div>
        <div>
          <a href="https://github.com/kirarhemantGitHub" target="_blank">
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}