import { useState } from "react";
import { Form, Input, Button, message, Card } from "antd";
import { http } from "../../api/http";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      setLoading(true);
      const res = await http.post("/users/login", values);

      if (res.status === 200) {
        const { token, user } = res.data;

        // Lưu token và user
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        // ✅ Log token ra console để kiểm tra
        console.log("Đăng nhập thành công, token:", token);

        message.success("🎉 Đăng nhập thành công!");

        // ✅ Kiểm tra role trước khi chuyển trang
        if (user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/"); // nếu là user thường, chuyển về trang chủ
        }
      } else {
        message.error("Đăng nhập thất bại. Vui lòng thử lại.");
      }
    } catch (error: any) {
      console.error("Lỗi đăng nhập:", error);
      message.error(error.response?.data?.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f0f2f5",
      }}
    >
      <Card title="Đăng nhập" style={{ width: 400 }}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password placeholder="Mật khẩu" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
