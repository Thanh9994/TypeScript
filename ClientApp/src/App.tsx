import { useRoutes } from "react-router-dom";
import { clientRoutes } from "./client/routes";
import { adminRoutes } from "./admin/routes";
import "antd/dist/reset.css"; // Ant Design 5.x


export default function App() {
  const element = useRoutes([clientRoutes, adminRoutes]);
  return element;
}
