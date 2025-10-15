import type { RouteObject } from "react-router-dom";
import AdminLayout from "../shared/Layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import ProductForm from "./pages/ProductForm";
import ProductsAdmin from "./pages/Products";
import UserList from "./pages/UserList";
import CategoryList from "./pages/category";

export const adminRoutes: RouteObject = {
  path: "/admin",
  element: <AdminLayout />,
  children: [
    { index: true, element: <Dashboard /> },
    { path: "products", element: <ProductsAdmin /> },
    { path: "products/new", element: <ProductForm /> },
    { path: "products/:id/edit", element: <ProductForm /> },
    { path: "users", element: <UserList /> },
    { path: "category", element: <CategoryList /> },

    { path: "*", element: <h1>404 Not Found</h1> },
  ],
};
