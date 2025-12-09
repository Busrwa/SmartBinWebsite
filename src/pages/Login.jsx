import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  return (
    <div style={wrapper}>
      <div style={card}>
        <h2 style={title}>Login</h2>

        <input
          style={inputStyle}
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={inputStyle}
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={buttonStyle} onClick={login}>Login</button>

        <p style={bottomText}>
          Don't have an account?{" "}
          <Link to="/register" style={linkStyle}>Register</Link>
        </p>
      </div>
    </div>
  );
}

const wrapper = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
};

const card = {
  background: "white",
  padding: "32px 28px",
  borderRadius: "14px",
  boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
  width: "100%",
  maxWidth: "480px",
  margin: "0 auto",
};

const title = {
  textAlign: "center",
  marginBottom: "24px",
  fontSize: "26px",
  color: "#1a1a1a",
};

const inputStyle = {
   width: "100%",
  padding: "12px 16px", // <-- BUTTON İLE AYNI
  marginBottom: "14px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
  WebkitAppearance: "none", // iOS genişlik farkını yok eder
};

const buttonStyle = {
  width: "100%",
  padding: "12px 16px", // <-- INPUT İLE AYNI
  background: "#2e7d32",
  color: "white",
  fontSize: "16px",
  borderRadius: "10px",
  border: "none",
  cursor: "pointer",
  marginTop: "6px",
  boxSizing: "border-box",
};

const bottomText = {
  textAlign: "center",
  marginTop: "16px",
  fontSize: "15px",
};

const linkStyle = {
  color: "#2e7d32",
  fontWeight: "600",
  textDecoration: "none",
};

