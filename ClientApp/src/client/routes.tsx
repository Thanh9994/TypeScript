import type { RouteObject }  from "react-router-dom";
import ClientLayout from "../shared/Layouts/ClientLayout";
import Home from "./pages/Home";
import ProductsList from "./pages/ProductsList";
import ProductDetail from "./pages/ProductsDetail";
import Signup from "./pages/Registered";
import Login from "./pages/Login";

export const clientRoutes: RouteObject = {
  path: "/",
  element: <ClientLayout />,
  children: [
    { index: true, element: <Home /> },
    { path: "products", element: <ProductsList /> },
    { path: "products/:id", element: <ProductDetail /> },
    { path: "register", element: <Signup />},
    { path: "login", element: <Login />},
    
  ],
};
