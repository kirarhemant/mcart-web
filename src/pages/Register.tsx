import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  return (
    <div className="card" style={{ maxWidth: 400, margin: "auto" }}>
      <h2>📝 Register</h2>
      <input placeholder="Email" className="input" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" className="input" onChange={e => setPass(e.target.value)} />
      <input type="password" placeholder="Confirm Password" className="input"
        onChange={e => setConfirm(e.target.value)}
      />
      
      <button
        className="btn primary"
        style={{ marginTop: "5px" }}
        onClick={async () => {
          if (pass !== confirm) {
            setError("Passwords do not match");
            return;
          }
          setError("");
          await signup(email, pass);
          nav("/login");
        }}
      >
        Create Account
      </button>
      {error && <div className="text-muted" style={{ color: "red" }}>{error}</div>}
    </div>
  );
}