import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const nav = useNavigate();

  return (
    <div className="card" style={{ maxWidth: 400, margin: "auto" }}>
      <h2>Register</h2>

      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPass(e.target.value)} />

      <button onClick={async () => {
        await signup(email, pass);
        nav("/login");
      }}>
        Create Account
      </button>
    </div>
  );
}