import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      className="page-container"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        textAlign: "center",
        color: "#1a1a1a",
      }}
    >
      <h1 style={{ fontSize: "72px", margin: 0, color: "#1b8c34" }}>404</h1>
      <h2 style={{ fontSize: "28px", margin: "16px 0" }}>Page Not Found</h2>
      <p style={{ fontSize: "16px", marginBottom: "24px", color: "#4a5568" }}>
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        style={{
          padding: "10px 20px",
          background: "#1b8c34",
          color: "white",
          borderRadius: "6px",
          textDecoration: "none",
          fontWeight: 500,
        }}
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
