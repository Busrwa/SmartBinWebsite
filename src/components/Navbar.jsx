import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";

export default function Navbar({ user }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* LEFT – LOGO + USER */}
      <div className="nav-left">
        <div className="brand">
          <img
            src="/logo.png"
            alt="Smart Bin"
            className="navbar-logo"
          />

          <div className="brand-text">
            <span className="brand-title">Smart Bin</span>
            <span className="brand-user">
              Welcome, {auth.currentUser?.displayName || "User"}
            </span>
          </div>
        </div>
      </div>

      {/* HAMBURGER */}
      <div
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
      </div>

      {/* LINKS */}
      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <Link to="/">Dashboard</Link>
        <Link to="/devices">My Bins</Link>
        <Link to="/add-device">Add Bin</Link>
        <Link to="/profile">Profile</Link>

        <button
          className="logout-btn"
          onClick={() => signOut(auth)}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
