import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 🔹 Eğer kullanıcı zaten girişliyse direkt dashboard
  useEffect(() => {
    if (auth.currentUser) {
      navigate("/");
    }
  }, []);

  const register = async () => {
    if (!fullName || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const userCred = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(userCred.user, { displayName: fullName });

      await setDoc(doc(db, "users", userCred.user.uid), {
        fullName,
        email,
        createdAt: new Date(),
      });

      // 🔹 Kayıt sonrası yönlendirme
      navigate("/"); // dashboard’a git
    } catch {
      setError("This email is already in use or invalid.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={page}>
      <div style={card}>
        <img src="/logo.png" alt="SmartBin" style={logo} />

        <h2 style={title}>Create an Account</h2>

        <input
          style={input}
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          style={input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div style={passwordWrapper}>
          <input
            style={passwordInput}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && register()}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={eyeButton}
            aria-label="Toggle password visibility"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <button
          style={{
            ...button,
            opacity: loading ? 0.7 : 1,
          }}
          onClick={register}
          disabled={loading}
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <p style={bottomText}>
          Already have an account?{" "}
          <Link to="/" style={link}>
            Login
          </Link>
        </p>
      </div>

      {/* MODAL */}
      {error && (
        <div style={modalOverlay}>
          <div style={modal}>
            <h3>Registration Failed</h3>
            <p>{error}</p>
            <button style={modalBtn} onClick={() => setError("")}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= STYLES ================= */

const page = {
  minHeight: "100dvh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #e8f5e9, #ffffff)",
  padding: "env(safe-area-inset-top) 16px env(safe-area-inset-bottom)",
};

const card = {
  width: "100%",
  maxWidth: "380px",
  background: "#fff",
  padding: "32px 24px",
  borderRadius: "16px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  textAlign: "center",
};

const logo = {
  width: "84px",
  marginBottom: "8px",
};

const title = {
  marginBottom: "20px",
  fontSize: "22px",
};

const input = {
  width: "100%",
  padding: "12px 16px",
  marginBottom: "14px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  fontSize: "15px",
  boxSizing: "border-box",
};

const passwordWrapper = {
  position: "relative",
  width: "100%",
  marginBottom: "14px",
};

const passwordInput = {
  ...input,
  paddingRight: "48px",
  marginBottom: 0,
};

const eyeButton = {
  position: "absolute",
  right: "10px",
  top: "50%",
  transform: "translateY(-50%)",
  background: "transparent",
  border: "none",
  fontSize: "18px",
  cursor: "pointer",
};

const button = {
  width: "100%",
  padding: "12px",
  background: "#2e7d32",
  color: "#fff",
  fontSize: "16px",
  borderRadius: "10px",
  border: "none",
};

const bottomText = {
  marginTop: "16px",
  fontSize: "14px",
};

const link = {
  color: "#2e7d32",
  fontWeight: "600",
  textDecoration: "none",
};

const modalOverlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.45)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
};

const modal = {
  background: "#fff",
  padding: "22px",
  borderRadius: "12px",
  width: "90%",
  maxWidth: "320px",
  textAlign: "center",
};

const modalBtn = {
  marginTop: "14px",
  padding: "10px 16px",
  background: "#2e7d32",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
};
