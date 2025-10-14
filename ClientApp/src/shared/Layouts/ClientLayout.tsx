import { Outlet, Link } from "react-router-dom";
// import "../styles/ClientLayout.css"; // nếu muốn tách thêm

export default function ClientLayout() {
  return (
    <>
      <nav className="navbar navbar-expand bg-light mb-3 shadow-sm">
        <div className="container">
          <Link to="/" className="navbar-brand">Shop</Link>
          <div className="navbar-nav">
            <Link to="/products" className="nav-link">Sản phẩm</Link>
            <Link to="/login" className="nav-link">Đăng nhập</Link>
            <Link to="/register" className="nav-link">Đăng Ký</Link>
          </div>
        </div>
      </nav>
      <div className="container container-narrow">
        <Outlet />
      </div>
      <footer className="text-center py-4 text-muted">© {new Date().getFullYear()} My Company</footer>
    </>
  );
}
