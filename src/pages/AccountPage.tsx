import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import api from "../api/client";

export default function AccountPage() {
  const { user } = useAuth();
  const [form,setForm] = useState({ name:"", email:"", phone:"", address:"" });
  const [loading,setLoading] = useState(true);
  const [msg,setMsg] = useState("");

  useEffect(()=>{(async()=>{
    try{
      // get existing from customer-api (soon) or fallback to identity
      const { data } = await api.get("/api/customer/me").catch(()=>({data:null}));
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
      await api.post("/api/customer/me", form);
      setMsg("Saved!");
    } finally { setLoading(false); }
  };

  if(loading) return <div className="card">Loading account…</div>;
  return (
    <div className="grid">
      <aside className="card"><h3>My Account</h3></aside>
      <section className="card">
        <div><label>Name</label><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>
        <div><label>Email</label><input value={form.email} disabled/></div>
        <div><label>Phone</label><input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></div>
        <div><label>Address</label><textarea value={form.address} onChange={e=>setForm({...form,address:e.target.value})}/></div>
        <button className="btn primary" onClick={save}>Save</button>
        {msg && <span style={{marginLeft:12}}>{msg}</span>}
      </section>
    </div>
  );
}