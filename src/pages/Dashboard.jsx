import { Link } from "react-router-dom";

export default function Dashboard() {
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
      {/* HEADER / HERO */}
      <div
        style={{
          background: "#f8fafc",
          padding: "32px",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
          marginBottom: "32px",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "26px" }}>SmartBin Dashboard</h2>

        <p
          style={{
            marginTop: "12px",
            lineHeight: "1.6",
            fontSize: "16px",
            color: "#4a5568",
          }}
        >
          Manage your smart waste bins, monitor fill levels, and control your
          devices through a unified interface.
        </p>
      </div>

      {/* FEATURE DESCRIPTION */}
      <div style={{ marginBottom: "32px" }}>
        <h3 style={{ fontSize: "20px", marginBottom: "12px" }}>Overview</h3>

        <p
          style={{
            lineHeight: "1.6",
            fontSize: "15px",
            color: "#4a5568",
            maxWidth: "750px",
          }}
        >
          SmartBin helps you track real-time container levels, receive alerts
          when capacity is reached, and manage multiple waste containers from
          a single account. This dashboard provides quick access to your bins,
          device registration, and system settings.
        </p>
      </div>

      {/* ACTION BUTTONS */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginBottom: "48px",
        }}
      >
        <Link to="/devices" style={{ textDecoration: "none", flex: "1" }}>
          <button
            style={{
              width: "100%",
              padding: "18px",
              fontSize: "16px",
              borderRadius: "10px",
              border: "1px solid #2e7d32",
              background: "#4CAF50",
              color: "white",
              cursor: "pointer",
              fontWeight: "500",
              transition: "0.2s",
            }}
            onMouseOver={(e) => {
              e.target.style.background = "#3b8f41";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "#4CAF50";
            }}
          >
            View My Bins
          </button>
        </Link>

        <Link to="/add-device" style={{ textDecoration: "none", flex: "1" }}>
          <button
            style={{
              width: "100%",
              padding: "18px",
              fontSize: "16px",
              borderRadius: "10px",
              border: "1px solid #2e7d32",
              background: "#4CAF50",
              color: "white",
              cursor: "pointer",
              fontWeight: "500",
              transition: "0.2s",
            }}
            onMouseOver={(e) => {
              e.target.style.background = "#3b8f41";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "#4CAF50";
            }}
          >
            Add New Bin
          </button>
        </Link>
      </div>


      {/* LEGAL LINKS */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          marginTop: "50px",
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
