import type { RouteObject } from "react-router-dom";
import AdminLayout from "../shared/Layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import ProductForm from "./pages/ProductForm";
import ProductsAdmin from "./pages/Products";

export const adminRoutes: RouteObject = {
  path: "/admin",
  element: <AdminLayout />,
  children: [
    { index: true, element: <Dashboard /> },
    { path: "products", element: <ProductsAdmin /> },
    { path: "products/new", element: <ProductForm /> },
    { path: "products/:id/edit", element: <ProductForm /> },
    { path: "users", element: <h1>Users Admin Page</h1> },

    { path: "*", element: <h1>404 Not Found</h1> },
  ],
};
