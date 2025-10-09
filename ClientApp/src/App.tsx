import { useRoutes } from "react-router-dom";
import { clientRoutes } from "./client/routes";
import { adminRoutes } from "./admin/routes";

export default function App() {
  const element = useRoutes([clientRoutes, adminRoutes]);
  return element;
}
