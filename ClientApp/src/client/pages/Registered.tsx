import { useState } from "react";
import { Form, Input, Button, message, Select, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { http } from "../../api/http";

export default function Signup() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (values: any) => {
    console.log("Dữ liệu gửi đăng ký:", values);
    try {
      setLoading(true);

      // Gọi API đăng ký
      const res = await http.post("/users/register", values);

      if (res.status === 201 || res.status === 200) {
        message.success("🎉 Đăng ký thành công! Vui lòng đăng nhập.");
        form.resetFields();
        navigate("/login");
      } else {
        message.error("Đăng ký thất bại. Vui lòng thử lại.");
      }
    } catch (error: any) {
      console.error("Đăng ký lỗi:", error);
      message.error(error.response?.data?.message || "Lỗi đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-50">
      <Card title="Đăng ký tài khoản" className="w-full max-w-md shadow-md">
        <Form
          layout="vertical"
          form={form}
          onFinish={handleRegister}
          autoComplete="off"
        >
          <Form.Item
            label="Tên người dùng"
            name="username"
            rules={[
              { required: true, message: "Vui lòng nhập tên người dùng" },
              { min: 3, message: "Tên người dùng tối thiểu 3 ký tự" },
            ]}
          >
            <Input placeholder="Tên người dùng" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input placeholder="example@gmail.com" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu" },
              { min: 6, message: "Mật khẩu tối thiểu 6 ký tự" },
            ]}
          >
            <Input.Password placeholder="••••••••" />
          </Form.Item>

          {/* Nếu backend có trường phone, bạn có thể bật lại phần này */}
          
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại" },
              { 
                pattern: /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-4|6-9])[0-9]{7}$/,
                message: "Số điện thoại không hợp lệ" 
              }
            ]}
          >
            <Input placeholder="0123456789" />
          </Form.Item>
         

          <Form.Item
            label="Vai trò"
            name="role"
            initialValue="user"
            rules={[{ required: true, message: "Vui lòng chọn vai trò" }]}
            
          > 
            <Select
              options={[
                { value: "customer", label: "Người dùng" },
                { value: "staff", label: "Nhân viên" },
                { value: "admin", label: "Quản trị viên" },
              ]}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
            >
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
