import { useEffect, useState } from "react";
import { Table, Button, message, Tag, Popconfirm, Card, Spin } from "antd";
import { http } from "../../api/http";


// export default function UserList() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [loadingAuth, setLoadingAuth] = useState(true);

//   // useEffect(() => {
//   //   const token = localStorage.getItem("token");
//   //   if (!token) {
//   //     message.warning("Bạn cần đăng nhập để xem danh sách!");
//   //     window.location.href = "/login";
//   //     return;
//   //   }
//   //   setLoadingAuth(false);
//   // }, []);

//   useEffect(() => {
//     if (loadingAuth) return;

//     const fetchUsers = async () => {
//       try {
//         setLoading(true);
//         const res = await http.get("/users");
//         setUsers(res.data);
//       } catch (error: any) {
//         message.error(error.response?.data?.message || "Không thể tải danh sách người dùng");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, [loadingAuth]);

//   const handleDelete = async (id: string) => {
//     try {
//       await http.delete(`/users/${id}`);
//       message.success("Xóa người dùng thành công!");
//       setUsers((prev) => prev.filter((u) => u._id !== id));
//     } catch (error: any) {
//       message.error(error.response?.data?.message || "Xóa thất bại");
//     }
//   };

//   const columns = [
//     { title: "Tên người dùng", dataIndex: "username", key: "username" },
//     { title: "Email", dataIndex: "email", key: "email" },
//     { title: "Số điện thoại", dataIndex: "phone", key: "phone" },
//     {
//       title: "Vai trò",
//       dataIndex: "role",
//       key: "role",
//       render: (role: string) =>
//         role === "admin" ? <Tag color="red">Admin</Tag> : <Tag color="blue">User</Tag>,
//     },
//     {
//       title: "Trạng thái",
//       dataIndex: "status",
//       key: "status",
//       render: (status: string) =>
//         status === "active" ? <Tag color="green">Hoạt động</Tag> : <Tag color="gray">Tạm khóa</Tag>,
//     },
//     {
//       title: "Hành động",
//       key: "action",
//       render: (_: any, record: any) => (
//         <Popconfirm
//           title="Bạn có chắc muốn xoá người này?"
//           onConfirm={() => handleDelete(record._id)}
//           okText="Xoá"
//           cancelText="Huỷ"
//         >
//           <Button danger>Xoá</Button>
//         </Popconfirm>
//       ),
//     },
//   ];

//   if (loadingAuth) return <Spin tip="Đang kiểm tra token..." style={{ marginTop: 80 }} />;

//   return (
//     <div className="p-6">
//       <Card title="Danh sách người dùng" className="shadow-md rounded-lg">
//         <Table
//           columns={columns}
//           dataSource={users}
//           rowKey="_id"
//           loading={loading}
//           pagination={{ pageSize: 5, showSizeChanger: false }}
//         />
//       </Card>
//     </div>
//   );
// }
export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        console.log("Gọi API /users với baseURL:", http.defaults.baseURL);
        const res = await http.get("/users");
        console.log("Dữ liệu user:", res.data);
        setUsers(res.data.data || []);
      } catch (error: any) {
        console.error("Lỗi khi gọi API /users:", error);
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
        <Popconfirm
          title="Bạn có chắc muốn xoá người này?"
          onConfirm={() => handleDelete(record._id)}
          okText="Xoá"
          cancelText="Huỷ"
        >
          <Button danger>Xoá</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Card title="Danh sách người dùng" className="shadow-md rounded-lg">
        <Table
          columns={columns}
          dataSource={users}
          rowKey="_id"
          loading={loading}
          pagination={{ pageSize: 5, showSizeChanger: false }}
        />
      </Card>
    </div>
  );
}