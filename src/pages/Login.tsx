import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { signup, signin, loginGoogle, loginGitHub } = useAuth();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const nav = useNavigate();
  return (
    <div style={{ padding: 24 }}>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPass(e.target.value)} />
      <button onClick={async () => {
        await signin(email, pass);
        nav("/");
      }}>Login</button>
      <button onClick={() => signup(email, pass)}>Register</button>
      <h2>Sign in with</h2>
      <button onClick={loginGoogle}>Continue with Google</button>
      <button onClick={loginGitHub} style={{ marginLeft: 12 }}>Continue with GitHub</button>
    </div>
  );
}