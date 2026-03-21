import axios from "axios";
import { auth } from "../lib/firebase";
import { getIdToken } from "firebase/auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,   // e.g., https://<INGRESS_HOST>
});

api.interceptors.request.use(async (config) => {
  const u = auth.currentUser;
  if (u) {
    const token = await getIdToken(u, false);
    config.headers = config.headers || {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;