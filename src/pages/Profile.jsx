import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Profile() {
  const user = auth.currentUser;
  const navigate = useNavigate();

  const [modal, setModal] = useState({
    open: false,
    title: "",
    message: "",
  });

  const openModal = (title, message) => {
    setModal({ open: true, title, message });
  };

  const closeModal = () => {
    setModal({ open: false, title: "", message: "" });
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (err) {
      openModal("Error", "Failed to log out. Please try again.");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await user.delete();
      navigate("/signup");
    } catch (err) {
      openModal(
        "Error",
        "Failed to delete account. You may need to re-login and try again."
      );
    }
  };

  return (
    <div
      className="page-container"
      style={{ maxWidth: "900px", margin: "0 auto", padding: "32px", color: "#1a1a1a" }}
    >
      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
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
          <span style={{ fontWeight: 600, color: "#333" }}>Account Status</span>
          <span style={{ color: "#444" }}>Active</span>
        </div>

        {/* ACTION BUTTONS */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
            marginTop: "24px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={handleLogout}
            style={{
              flex: 1,
              padding: "14px",
              borderRadius: "10px",
              border: "none",
              background: "#1b8c34",
              color: "white",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#166b29")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#1b8c34")}
          >
            Log Out
          </button>

          <button
            onClick={() => openModal("Delete Account", "Are you sure you want to delete your account? This action is irreversible.")}
            style={{
              flex: 1,
              padding: "14px",
              borderRadius: "10px",
              border: "none",
              background: "#e53935",
              color: "white",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#b71c1c")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#e53935")}
          >
            Delete Account
          </button>
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

      {/* MODAL */}
      {modal.open && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            className="modal"
            style={{
              background: "white",
              padding: "26px 24px",
              borderRadius: "14px",
              width: "90%",
              maxWidth: "360px",
              textAlign: "center",
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            }}
          >
            <h3 style={{ marginBottom: "12px", fontSize: "18px" }}>{modal.title}</h3>
            <p style={{ fontSize: "14px", color: "#333" }}>{modal.message}</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "16px", flexWrap: "wrap" }}>
              <button
                onClick={closeModal}
                style={{
                  padding: "10px 18px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  background: "#ccc",
                  color: "#000",
                  fontWeight: 600,
                }}
              >
                Cancel
              </button>
              {modal.title === "Delete Account" && (
                <button
                  onClick={handleDeleteAccount}
                  style={{
                    padding: "10px 18px",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    background: "#e53935",
                    color: "white",
                    fontWeight: 600,
                  }}
                >
                  Confirm
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
