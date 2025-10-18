import { useState } from "react";
import { Form, Input, Button, message, Card, Space, Switch } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
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
        <Form layout="vertical" form={form} onFinish={handleRegister} autoComplete="off" validateTrigger={["onBlur", "onChange"]}>
          <Form.Item
            label="Tên người dùng"
            name="username"
            rules={[
              { required: true, message: "⚠️ Vui lòng nhập tên người dùng" },
              { min: 3, message: "Tên người dùng tối thiểu 3 ký tự" },
            ]}
            
          >
            <Input placeholder="✏️ Tên người dùng" autoComplete="new-username" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "⚠️ Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input placeholder="✏️ example@gmail.com" autoComplete="new-email" />  
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: "⚠️ Vui lòng nhập mật khẩu" },
              { min: 6, message: "Mật khẩu tối thiểu 6 ký tự" },
            ]}
          >
            <Input.Password placeholder="✏️••••••••" autoComplete="new-password" />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "⚠️ Vui lòng nhập số điện thoại" },
              { 
                pattern: /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-4|6-9])[0-9]{7}$/,
                message: "Số điện thoại không hợp lệ"
              },
            ]}
          >
            <Input placeholder="✏️ 0123456789" />
          </Form.Item>

          {/* 🚀 Thêm địa chỉ */}
          <Form.List name="addresses">
            {(fields, { add, remove }) => (
              <>
                <label className="font-semibold">Địa chỉ</label>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} align="baseline" style={{ display: "flex", marginBottom: 8 }}>
                    <Form.Item
                      {...restField}
                      name={[name, "label"]}
                      rules={[{ required: true, message: "Tên địa chỉ" }]}
                    >
                      <Input placeholder="Nhà, Công ty..." />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "street"]}
                      rules={[{ required: true, message: "Đường" }]}
                    >
                      <Input placeholder="Đường" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "city"]}
                      rules={[{ required: true, message: "Thành phố" }]}
                    >
                      <Input placeholder="Thành phố" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "country"]}
                      rules={[{ required: true, message: "Quốc gia" }]}
                    >
                      <Input placeholder="Quốc gia" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "isDefault"]}
                      valuePropName="checked"
                    >
                      <Switch checkedChildren="Mặc định" unCheckedChildren="Không" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Thêm địa chỉ
                </Button>
              </>
            )}
          </Form.List>

          <Form.Item className="mt-4">
            <Button type="primary" htmlType="submit" block loading={loading}>
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
