import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import api from "../api/client";

export default function AccountPage() {
  const { user } = useAuth();
  const [form,setForm] = useState({ name:"", email:"", phone:"", address:"" });
  const [loading,setLoading] = useState(true);
  const [msg,setMsg] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(()=>{(async()=>{
    try{
      // get existing from customer-api (soon) or fallback to identity
      const { data } = await api.get("/customer/me").catch(()=>({data:null}));
      setForm({
        name: data?.name ?? (user?.displayName ?? ""),
        email: data?.email ?? (user?.email ?? ""),
        phone: data?.phone ?? "",
        address: data?.address ?? ""
      });
    } finally { setLoading(false); }
  })()},[user]);

  const save = async () => {
    setMsg(""); setLoading(true);
    try{
      await api.post("/customer/me", form);
      setMsg("Saved!");
    } finally { setLoading(false); }
  };

  if(loading) return <div className="card">Loading account…</div>;
  return (
    <section className="card" style={{ marginLeft: "400px", marginRight: "400px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Profile</h3>
        <button className="btn" onClick={() => setEditing(e => !e)}>
          ✏️ {editing ? "Cancel" : "Edit"}
        </button>
      </div>
      <div className="form-group">
        <label>Name</label>
        <input
          value={form.name}
          disabled={!editing}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input value={form.email} disabled />
      </div>

      <div className="form-group">
        <label>Phone</label>
        <input
          value={form.phone}
          disabled={!editing}
          onChange={e => setForm({ ...form, phone: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Address</label>
        <textarea
          value={form.address}
          disabled={!editing}
          onChange={e => setForm({ ...form, address: e.target.value })}
        />
      </div>

      {editing && (
        <button className="btn primary" onClick={save}>
          Save
        </button>
      )}

      {msg && <span style={{ marginLeft: 12 }}>{msg}</span>}
    </section>
  );
}