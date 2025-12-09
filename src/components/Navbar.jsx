import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";

export default function Navbar({ user }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h3 className="logo">SmartBin</h3>
      </div>

      {/* Hamburger Icon */}
      <div
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
      </div>

      {/* Links + Logout */}
      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <span className="welcome">Welcome, {user.displayName || user.email}</span>

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
