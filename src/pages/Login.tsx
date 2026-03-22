import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { signin, loginGoogle, loginGitHub } = useAuth();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const nav = useNavigate();
  return (
    <div className="card" style={{ maxWidth: 400, margin: "auto" }}>
      <h2>🌐 Sign in to mcart</h2>

      <button className="btn" onClick={async () => {
        await loginGoogle();
        nav("/");
      }}>Continue with Google</button>

      <button className="btn" onClick={async () => {
        await loginGitHub();
        nav("/");
      }} style={{ marginLeft: 12 }}>
        Continue with GitHub
      </button>

      <div className="divider">OR</div>
      <h2>🔐 Log in to your account</h2>

      <input className="input" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input className="input" type="password" placeholder="Password" onChange={e => setPass(e.target.value)} />
      <button className="btn primary" style={{ marginTop: "5px" }} onClick={async () => {
        await signin(email, pass);
        nav("/");
      }}>Login</button>
    </div>
  );
}