import { Layout, Menu, Input, Avatar, Dropdown } from "antd";
import {
  DashboardOutlined,
  ShoppingOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const { Sider, Content, Header } = Layout;

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const [user, setUser] = useState<{ username?: string; avatar?: string } | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      navigate("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } catch {
      setUser(null);
    }

    setLoadingUser(false);
  }, [navigate]);

  const toggleCollapsed = () => setCollapsed(!collapsed);

  const menuItems = [
    {
      key: "profile",
      label: "Thông tin cá nhân",
      onClick: () => navigate("/admin/profile"),
    },
    {
      key: "logout",
      label: "Đăng xuất",
      onClick: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      },
    },
  ];

  if (loadingUser) return <div style={{ padding: 24 }}>Đang tải thông tin...</div>;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={260}
        style={{ background: "#001529" }}
      >
        <div
          style={{
            height: 64,
            margin: 16,
            color: "#fff",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 18,
            userSelect: "none",
          }}
        ><Link to={"/admin"}>Admin</Link>
          
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["dashboard"]}
          items={[
            {
              key: "dashboard",
              icon: <DashboardOutlined />,
              label: "Dashboard",
              onClick: () => navigate("/admin"),
            },
            {
              key: "products",
              icon: <ShoppingOutlined />,
              label: "Products",
              onClick: () => navigate("/admin/products"),
            },
            {
              key: "users",
              icon: <UserOutlined />,
              label: "Users",
              onClick: () => navigate("/admin/users"),
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            background: "transparent",
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {collapsed ? (
              <MenuUnfoldOutlined
                onClick={toggleCollapsed}
                style={{ fontSize: 20, cursor: "pointer" }}
              />
            ) : (
              <MenuFoldOutlined
                onClick={toggleCollapsed}
                style={{ fontSize: 20, cursor: "pointer" }}
              />
            )}
            <Input.Search
              placeholder="Tìm kiếm..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: 350 }}
              allowClear
            />
          </div>

          {user ? (
            <Dropdown menu={{ items: menuItems }} placement="bottomRight" arrow>
              <Avatar
                src={user.avatar || undefined}
                size="large"
                style={{ cursor: "pointer", userSelect: "none" }}
              >
                {!user.avatar && user.username?.[0].toUpperCase()}
              </Avatar>
            </Dropdown>
          ) : (
            <Avatar size="large" icon={<UserOutlined />} />
          )}
        </Header>

        <Content style={{ margin: 16, padding: 24, background: "#f0f2f5" }}>
          <Outlet context={{ search }} />
        </Content>
      </Layout>
    </Layout>
  );
}
