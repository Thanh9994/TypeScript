import { useEffect, useState } from "react";
import {
  Table,
  Button,
  message,
  Tag,
  Popconfirm,
  Modal,
  Form,
  Input,
  Select,
  Switch,
} from "antd";
import { http } from "../../api/http";
import type { Address, User } from "../../types/interface";

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [form] = Form.useForm();

  // ✅ Lấy danh sách user
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await http.get("/users");
      setUsers(res.data.data || []);
    } catch (error: any) {
      message.error(error.response?.data?.message || "Không thể tải danh sách người dùng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Xóa user
  const handleDelete = async (id: string) => {
    try {
      await http.delete(`/users/${id}`);
      message.success("🗑️ Xóa người dùng thành công!");
      fetchUsers();
    } catch (error: any) {
      message.error(error.response?.data?.message || "Xóa thất bại");
    }
  };

  // ✅ Mở modal chỉnh sửa
  const handleUpdate = (record: User) => {
    setEditingUser(record);
    form.setFieldsValue(record);
    setOpenModal(true);
  };

  // ✅ Lưu thay đổi user
  const handleSave = async (values: any) => {
    try {
      setLoading(true);
      if (!editingUser) return;
      const res = await http.put(`/users/${editingUser._id}`, values);
      message.success(res.data.message || "Cập nhật thành công!");
      setOpenModal(false);
      fetchUsers();
    } catch (err: any) {
      message.error(err.response?.data?.message || "Lỗi khi cập nhật");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>  
      <h2 className="text-xl font-semibold mb-4">Danh sách người dùng</h2>
      <Table
        bordered
        dataSource={users}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 6, showSizeChanger: false }}
        style={{ fontSize: 15 }}
        columns={[
          {
            title: "STT",
            render: (_: any, __: any, index: number) => index + 1,
            width: 60,
            align: "center",
          },
          { title: "Tên người dùng", dataIndex: "username", key: "username" },
          { title: "Email", dataIndex: "email", key: "email" },
          { title: "Số điện thoại", dataIndex: "phone", key: "phone" },
          {
            title: "Địa chỉ",
            dataIndex: "addresses",
            key: "addresses",
            render: (addresses: Address[]) =>
              addresses && addresses.length > 0
                ? addresses.map((a) => (
                    <div key={a._id}>
                      <Tag color={a.isDefault ? "green" : "blue"}>
                         {a.label}, {a.street}, {a.city}{a.country ? `, ${a.country}` : ""}
                      </Tag>
                    </div>
                  ))
                : <Tag color="gray">Không có</Tag>,
          },
          {
            title: "Vai trò",
            dataIndex: "role",
            key: "role",
            render: (role: string) => {
              switch (role) {
                case "admin":
                  return <Tag color="red">Quản trị</Tag>;
                case "staff":
                  return <Tag color="orange">Nhân viên</Tag>;
                default:
                  return <Tag color="blue">Khách hàng</Tag>;
              }
            },
          },
          {
            title: "Trạng thái",
            dataIndex: "active",
            key: "active",
            render: (active: boolean) =>
              active ? (
                <Tag color="green">Hoạt động</Tag>
              ) : (
                <Tag color="gray">Tạm khóa</Tag>
              ),
          },
          {
            title: "Hành động",
            key: "action",
            align: "center",
            render: (_: any, record: any) => (
              <>
                <Button
                  type="link"
                  onClick={() => handleUpdate(record)}
                  style={{ marginRight: 8 }}
                >
                  Cập nhật
                </Button>
                <Popconfirm
                  title="Bạn có chắc muốn xoá người này?"
                  onConfirm={() => handleDelete(record._id)}
                  okText="Xoá"
                  cancelText="Huỷ"
                >
                  <Button danger type="link">
                    Xoá
                  </Button>
                </Popconfirm>
              </>
            ),
          },
        ]}
      />

      {/* 🧩 Modal cập nhật người dùng */}
      <Modal
        title="Cập nhật người dùng"
        open={openModal}
        onCancel={() => setOpenModal(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item label="Tên người dùng" name="username" rules={[{ required: true, message: "Nhập tên!" }]}>
            <Input placeholder="Tên người dùng" />
          </Form.Item>

          <Form.Item label="Số điện thoại" name="phone">
            <Input placeholder="Số điện thoại" />
          </Form.Item>

          <Form.Item label="Vai trò" name="role" rules={[{ required: true }]}>
            <Select
              options={[
                { value: "admin", label: "Quản trị" },
                { value: "staff", label: "Nhân viên" },
                { value: "user", label: "Khách hàng" },
              ]}
            />
          </Form.Item>

          <Form.Item label="Trạng thái" name="active" valuePropName="checked">
            <Switch checkedChildren="Hoạt động" unCheckedChildren="Khóa" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Lưu thay đổi
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
