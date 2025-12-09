import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const register = async () => {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user.user, { displayName: fullName });
    await setDoc(doc(db, "users", user.user.uid), {
      fullName,
      email,
    });
  };

  return (
    <div style={wrapper}>
      <div style={card}>
        <h2 style={title}>Create an Account</h2>

        <input
          style={inputStyle}
          placeholder="Full Name"
          onChange={(e) => setFullName(e.target.value)}
        />

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

        <button style={buttonStyle} onClick={register}>Register</button>

        <p style={bottomText}>
          Already have an account?{" "}
          <Link to="/" style={linkStyle}>Login</Link>
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
