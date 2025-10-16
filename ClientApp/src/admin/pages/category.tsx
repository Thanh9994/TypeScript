import { useEffect, useState } from "react";
import { http } from "../../api/http";
import { Table, Button, Modal, Input, message, Tag, Select } from "antd";
import type { Category } from "../../types/interface";

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [current, setCurrent] = useState<Category | null>(null);
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"active" | "inactive">("active");
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const res = await http.get<Category[]>("/categories");
    setCategories(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    if (!name.trim()) {
        message.error("Tên danh mục không được để trống");
        return;
    }
    try {
      if (current) {
        await http.put(`/categories/${current._id}`, { name, status });
        message.success("Cập nhật danh mục thành công");
      } else {
        await http.post("/categories", { name });
        message.success("Thêm danh mục thành công");
      }
      setModalVisible(false);
      setName("");
      setStatus("active");
      setCurrent(null);
      fetchData();
    } catch {
      message.error("Lỗi khi lưu danh mục");
    }finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    await http.delete(`/categories/${id}`);
    message.success("Đã xóa danh mục");
    fetchData();
  };

  return (
    <>
      <h2>Danh mục sản phẩm</h2>
      <Button type="primary" className="my-4" onClick={() => setModalVisible(true)}>
        + Thêm danh mục
      </Button>

      <Table
        bordered
        dataSource={categories}
        rowKey="_id"
        loading={loading}
        columns={[
          {
            title: "STT",
            render: (_: any, __: any, index: number) => index + 1,
            width: 40,
            align: "center",
          },
          { title: "Tên danh mục", dataIndex: "name",
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortDirections: ["ascend", "descend"], },
          {
            title: "Số sản phẩm",
            dataIndex: "productCount",
            sorter: (a, b) => (a.productCount ?? 0) - (b.productCount ?? 0),
            sortDirections: ["ascend", "descend"],
            render: (count) => count ?? 0,
          },
          {
            title: "Trạng thái",
            dataIndex: "status",
            render: (status) =>
              status === "active" ? (
                <Tag color="green">ON</Tag>
              ) : (
                <Tag color="red">OFF</Tag>
              ),
          },
          {
            title: "Hành động",
            render: (_, record) => (
              <>
                <Button
                  type="link"
                  onClick={() => {
                    setCurrent(record);
                    setName(record.name);
                    setStatus(record.status);
                    setModalVisible(true);
                  }}
                >
                  Sửa
                </Button>
                <Button
                  type="link"
                  danger
                  onClick={() => handleDelete(record._id!)}
                >
                  Xóa
                </Button>
              </>
            ),
          },
        ]}
      />

      <Modal
        title={<h2 style={{ fontSize: 24, fontWeight: "bold" }}>{current ? "Sửa danh mục" : "Thêm danh mục"}</h2>}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setCurrent(null);
          setName("");
          setStatus("active");
        }}
        onOk={handleSave}
        width={650}
        okText={current ? "Cập nhật" : "Thêm"}
        cancelText="Hủy"
      >
        <Input
          placeholder="Tên danh mục"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginBottom: current ? 24 : 16, fontSize: 16, padding: 10 }}
        />
        { current && (
        <Select
          value={status}
          onChange={(v) => setStatus(v)}
          style={{ width: "100%", fontSize: 16 }}
          options={[
            { label: "ON", value: "active" },
            { label: "OFF", value: "inactive" },
          ]}
        />
        )}
         
      </Modal>
    </>
  );
}
