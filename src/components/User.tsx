import { useState, useEffect } from "react";
import axios from "axios";

type User = {
  id: number;
  name: string;
  phone: string;
  website: string;
};

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Gọi API khi component được mount
  useEffect(() => {
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Lỗi khi tải dữ liệu:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center mt-4">Đang tải dữ liệu...</div>;

  return (
    <div className="container mt-5">
      <h1 className="fw-bold mb-4 text-primary">useEffect</h1>
      <ol className="list-group list-group-numbered mb-5">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
            onClick={() => setSelectedUser(user)}
          >
            <span className="fw-semibold">{user.name}</span>
            <small className="text-muted">{user.phone}</small>
          </li>
        ))}
      </ol>

      <h2 className="fw-bold mb-3">Thông tin chi tiết</h2>
      {selectedUser ? (
        <div className="card p-4 shadow-sm">
          <p><strong>Họ và tên:</strong> {selectedUser.name}</p>
          <p><strong>Số điện thoại:</strong> {selectedUser.phone}</p>
          <p>
            <strong>Website:</strong>{" "}
            <a href={`https://${selectedUser.website}`} target="_blank" rel="noreferrer">
              {selectedUser.website}
            </a>
          </p>
        </div>
      ) : (
        <p className="text-muted fst-italic">Chọn 1 người để xem chi tiết...</p>
      )}
    </div>
  );
}
