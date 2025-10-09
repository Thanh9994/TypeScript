import { Outlet, NavLink, Link } from "react-router-dom";
import { useState } from "react";

export default function AdminLayout() {
  const [search, setSearch] = useState("");

  return (
    <div className="d-flex flex-grow-1" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside className="bg-dark text-white d-flex flex-column p-3" style={{ width: 260 }}>
        <nav className="nav flex-column gap-2">
          <NavLink to="/admin" end className="nav-link text-white">
            Dashboard
          </NavLink>
          <NavLink to="/admin/products" className="nav-link text-white">
            Products
          </NavLink>
          <NavLink to="/admin/users" className="nav-link text-white">
            Users
          </NavLink>
        </nav>

        {/* Nút về trang khách nằm dưới cùng */}
        <div className="mt-auto">
          <Link to="/" className="btn btn-outline-light btn-sm w-100">
            ← Trang Chủ
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-grow-1 p-4 bg-light">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <input
            type="search"
            className="form-control w-25"
            placeholder="Tìm kiếm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Outlet context={{ search }} />
      </main>
    </div>
  );
}
