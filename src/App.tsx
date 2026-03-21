import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import ProtectedRoute from "./auth/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AccountPage from "./pages/AccountPage";
import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./pages/ProductPage";
import SearchPage from "./pages/SearchPage";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/catalog" element={<Layout><ProductsPage /></Layout>} />
          <Route path="/login" element={<Layout><Login /></Layout>} />
          <Route path="/register" element={<Layout><Register /></Layout>} />
          <Route path="/account" element={<ProtectedRoute><Layout><AccountPage/></Layout></ProtectedRoute>} />
          <Route path="/p/:sku" element={<Layout><ProductPage /></Layout>} />
          <Route path="/search" element={<Layout><SearchPage /></Layout>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}