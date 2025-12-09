import { auth } from "../firebase";
import { Link } from "react-router-dom";

export default function Profile() {
  const user = auth.currentUser;

  return (
    <div
      className="page-container"
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "32px",
        color: "#1a1a1a",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "32px",
        }}
      >
        <h2 style={{ fontSize: "28px", marginBottom: "8px" }}>My Profile</h2>
        <p style={{ color: "#4a5568", fontSize: "15px" }}>
          Manage your account details and privacy settings.
        </p>
      </div>

      {/* PROFILE CARD */}
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "28px",
          maxWidth: "550px",
          margin: "0 auto 40px auto",
          border: "1px solid #e2e8f0",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.06)",
        }}
      >
        <h3
          style={{
            marginTop: 0,
            marginBottom: "20px",
            fontSize: "20px",
            color: "#2d3748",
          }}
        >
          Account Information
        </h3>

        {/* ROWS */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "12px 0",
            borderBottom: "1px solid #eee",
          }}
        >
          <span style={{ fontWeight: 600, color: "#333" }}>Full Name</span>
          <span style={{ color: "#444" }}>
            {user?.displayName || "Not Provided"}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "12px 0",
            borderBottom: "1px solid #eee",
          }}
        >
          <span style={{ fontWeight: 600, color: "#333" }}>Email Address</span>
          <span style={{ color: "#444" }}>{user?.email}</span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "12px 0",
          }}
        >
          <span style={{ fontWeight: 600, color: "#333" }}>
            Account Status
          </span>
          <span style={{ color: "#444" }}>Active</span>
        </div>
      </div>

      {/* LEGAL LINKS – SAME AS DASHBOARD */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          marginTop: "20px",
          flexWrap: "wrap",
        }}
      >
        <Link
          to="/privacy"
          style={{
            textDecoration: "none",
            color: "#2e7d32",
            fontWeight: "500",
            fontSize: "15px",
            transition: "0.2s",
          }}
          onMouseOver={(e) => (e.target.style.color = "#1b5e20")}
          onMouseOut={(e) => (e.target.style.color = "#2e7d32")}
        >
          Privacy Policy
        </Link>

        <Link
          to="/terms"
          style={{
            textDecoration: "none",
            color: "#2e7d32",
            fontWeight: "500",
            fontSize: "15px",
            transition: "0.2s",
          }}
          onMouseOver={(e) => (e.target.style.color = "#1b5e20")}
          onMouseOut={(e) => (e.target.style.color = "#2e7d32")}
        >
          Terms of Service
        </Link>

        <Link
          to="/kvkk"
          style={{
            textDecoration: "none",
            color: "#2e7d32",
            fontWeight: "500",
            fontSize: "15px",
            transition: "0.2s",
          }}
          onMouseOver={(e) => (e.target.style.color = "#1b5e20")}
          onMouseOut={(e) => (e.target.style.color = "#2e7d32")}
        >
          KVKK Information
        </Link>
      </div>
    </div>
  );
}
