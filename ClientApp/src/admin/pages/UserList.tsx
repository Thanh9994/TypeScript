import { useEffect, useState } from "react";
import { Table, Button, message, Tag, Popconfirm } from "antd";
import { http } from "../../api/http";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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

    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await http.delete(`/users/${id}`);
      message.success("Xóa người dùng thành công!");
      setUsers((prev) => prev.filter((u: any) => u._id !== id));
    } catch (error: any) {
      message.error(error.response?.data?.message || "Xóa thất bại");
    }
  };

  const handleUpdate = (id: string) => {
    message.info(`Cập nhật người dùng có id: ${id}`);
    // Bạn có thể thay bằng logic mở modal hoặc chuyển trang chỉnh sửa
  };

  const columns = [
    { title: "Tên người dùng", dataIndex: "username", key: "username" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Số điện thoại", dataIndex: "phone", key: "phone" },
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
      render: (_: any, record: any) => (
        <>
          <Button
            type="link"
            onClick={() => handleUpdate(record._id)}
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
  ];

  return (
    <>
      <h2>Danh sách người dùng</h2>
      <Button type="primary" className="my-4">
          + Thêm người dùng
      </Button>   
        <Table
          columns={columns}
          dataSource={users}
          rowKey="_id"
          loading={loading}
          pagination={{ pageSize: 5, showSizeChanger: false }}
          // tăng font size bảng
          style={{ fontSize: 16 }}
        />
    </>
  );
}
