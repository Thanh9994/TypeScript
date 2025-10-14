import { useEffect, useState } from "react";
import { Card, Spin, message } from "antd";
import { http } from "../../api/http";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        if (!token || !storedUser) {
          message.warning("Vui lòng đăng nhập!");
          return;
        }

        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        // Nếu muốn lấy từ server mới nhất
        // const res = await http.get(`/users/${parsedUser._id}`);
        // setUser(res.data);
      } catch (err: any) {
        message.error("Không thể lấy thông tin người dùng");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <Spin tip="Đang tải thông tin..." style={{ marginTop: 80, display: "block", textAlign: "center" }} />;

  if (!user) return null;

  return (
    <div className="p-6">
      <Card title="Thông tin cá nhân" className="shadow-md rounded-lg" style={{ maxWidth: 500, margin: "auto" }}>
        <p><strong>Tên:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Số điện thoại:</strong> {user.phone || "Chưa cập nhật"}</p>
        <p><strong>Vai trò:</strong> {user.role}</p>
        <p><strong>Trạng thái:</strong> {user.status}</p>
      </Card>
    </div>
  );
}
