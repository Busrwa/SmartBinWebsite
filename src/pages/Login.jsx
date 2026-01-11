import { useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // brute-force protection
  const [attempts, setAttempts] = useState(0);
  const [lockUntil, setLockUntil] = useState(null);
  const [shake, setShake] = useState(false);

  const isLocked = lockUntil && Date.now() < lockUntil;
  const remainingSeconds = isLocked
    ? Math.ceil((lockUntil - Date.now()) / 1000)
    : 0;

  const triggerError = (msg) => {
    setError(msg);
    setShake(true);
    setTimeout(() => setShake(false), 400);
  };

  const login = async () => {
    if (isLocked) return;

    if (!email || !password) {
      triggerError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await signInWithEmailAndPassword(auth, email, password);
      // ❗ yönlendirme YOK – App.jsx halledecek
    } catch {
      const next = attempts + 1;
      setAttempts(next);
      triggerError("Email or password is incorrect.");

      if (next >= 5) {
        setLockUntil(Date.now() + 60 * 1000);
        setAttempts(0);
      }
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async () => {
    if (!email) {
      triggerError("Please enter your email first.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      triggerError("Password reset email sent.");
    } catch {
      triggerError("Could not send reset email.");
    }
  };

  useEffect(() => {
    if (!isLocked) return;
    const timer = setInterval(() => {
      if (Date.now() >= lockUntil) setLockUntil(null);
    }, 1000);
    return () => clearInterval(timer);
  }, [isLocked, lockUntil]);

  return (
    <div style={page}>
      <div style={{ ...card, ...(shake ? shakeStyle : {}) }}>
        <img src="/logo.png" alt="SmartBin" style={logo} />

        <h2 style={title}>Login</h2>

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
            onKeyDown={(e) => e.key === "Enter" && login()}
            disabled={isLocked}
          />

          <button
            type="button"
            style={eyeButton}
            onClick={() => setShowPassword(!showPassword)}
            aria-label="Toggle password visibility"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        {isLocked && (
          <p style={lockText}>
            Too many attempts. Try again in {remainingSeconds}s
          </p>
        )}

        <button
          style={{
            ...button,
            opacity: loading || isLocked ? 0.6 : 1,
          }}
          onClick={login}
          disabled={loading || isLocked}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <button style={forgotBtn} onClick={forgotPassword}>
          Forgot password?
        </button>

        <p style={bottomText}>
          Don’t have an account?{" "}
          <Link to="/register" style={link}>
            Register
          </Link>
        </p>
      </div>

      {error && (
        <div style={modalOverlay}>
          <div style={modal}>
            <h3>Info</h3>
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

const shakeStyle = {
  animation: "shake 0.4s",
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

const forgotBtn = {
  marginTop: "10px",
  background: "none",
  border: "none",
  color: "#2e7d32",
  cursor: "pointer",
  fontSize: "14px",
};

const lockText = {
  fontSize: "13px",
  color: "#c62828",
  marginBottom: "6px",
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
