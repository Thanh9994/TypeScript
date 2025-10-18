import { useEffect, useState } from "react";
import { http } from "../../api/http";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Table,
  Space,
  Card,
  message,
  // Upload,
} from "antd";
// import { PlusOutlined} from "@ant-design/icons";
// import type { UploadFile } from "antd/es/upload/interface";
import type { Category, Product } from "../../types/interface";

export default function ProductForm({
  product,
  onClose,
}: {
  product?: Product | null;
  onClose?: () => void;
}) {
  const [form] = Form.useForm();
  const isEdit = Boolean(product?._id);
  const [categories, setCategories] = useState<Category[]>([]);
  const [sizes, setSizes] = useState<{ key: number; size: string; quantity: number }[]>(
    product?.sizes?.map((s, i) => ({ key: i, ...s })) ?? []
  );
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(product?.image ?? "");

  //Lấy danh mục
  useEffect(() => {
    http.get("/categories").then((res) => setCategories(res.data));
  }, []);

  // 🧩 Nạp dữ liệu khi chỉnh sửa
  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        name: product.name,
        price: product.price,
        category:
          typeof product.category === "string"
            ? product.category
            : product.category?._id,
        status: product.status,
      });
    }
  }, [product, form]);

  const handleAddSize = () => {
    const newKey = sizes.length ? sizes[sizes.length - 1].key + 1 : 1;
    setSizes([...sizes, { key: newKey, size: "", quantity: 0 }]);
  };

  const handleRemoveSize = (key: number) => {
    setSizes(sizes.filter((s) => s.key !== key));
  };

  const handleChangeSize = (key: number, field: "size" | "quantity", value: any) => {
    setSizes((prev) =>
      prev.map((s) => (s.key === key ? { ...s, [field]: value } : s))
    );
  };

  const totalQuantity = sizes.reduce((sum, s) => sum + (s.quantity || 0), 0);

  // // Upload ảnh base64 (local)
  // const getBase64 = (file: File, callback: (url: string) => void) => {
  //   const reader = new FileReader();
  //   reader.addEventListener("load", () => callback(reader.result as string));
  //   reader.readAsDataURL(file);
  // };

  // const handleChangeImage = (info: any) => {
  //   const file = info.file.originFileObj;
  //   if (!file) return;
  //   getBase64(file, (url) => setImageUrl(url));
  // };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const payload = {
        ...values,
        image: imageUrl,
        sizes,
        totalQuantity,
      };

      if (isEdit && product?._id) {
        await http.put(`/products/${product._id}`, payload);
        message.success("Cập nhật sản phẩm thành công");
      } else {
        await http.post("/products", payload);
        message.success("Thêm sản phẩm thành công");
      }

      onClose?.();
    } catch (err: any) {
      message.error(err?.response?.data?.message ?? "Lưu sản phẩm thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      title={isEdit ? "🛠️ Chỉnh sửa sản phẩm" : "🆕 Thêm sản phẩm mới"}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ status: "active" }}
      >
        {/* Tên sản phẩm */}
        <Form.Item
          name="name"
          label="Tên sản phẩm"
          rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
        >
          <Input placeholder="Nhập tên sản phẩm" />
        </Form.Item>

        {/* Giá */}
        <Form.Item
          name="price"
          label="Giá sản phẩm"
          rules={[{ required: true, message: "Vui lòng nhập giá sản phẩm" }]}
        >
          <InputNumber
            min={0}
            style={{ width: "100%" }}
            placeholder="Nhập giá"
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
          />
        </Form.Item>

        {/* Danh mục */}
        <Form.Item
          name="category"
          label="Danh mục"
          rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
        >
          <Select placeholder="Chọn danh mục">
            {categories.map((cat) => (
              <Select.Option key={cat._id} value={cat._id}>
                {cat.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Trạng thái */}
        <Form.Item
          name="status"
          label="Trạng thái"
          rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
        >
          <Select>
            <Select.Option value="active">🟢 Active</Select.Option>
            <Select.Option value="inactive">🔴 Inactive</Select.Option>
            <Select.Option value="out_of_stock">⚫ Hết hàng</Select.Option>
          </Select>
        </Form.Item>

        {/* Bảng nhập size và số lượng */}
        <Form.Item label="Kích cỡ & Tồn kho">
          <Table
            size="small"
            pagination={false}
            dataSource={sizes}
            bordered
            rowKey="key"
            columns={[
              {
                title: "Size",
                dataIndex: "size",
                render: (_, record) => (
                  <Input
                    placeholder="VD: S, M, L"
                    value={record.size}
                    onChange={(e) =>
                      handleChangeSize(record.key, "size", e.target.value)
                    }
                  />
                ),
              },
              {
                title: "Số lượng",
                dataIndex: "quantity",
                render: (_, record) => (
                  <InputNumber
                    min={0}
                    value={record.quantity}
                    onChange={(val) =>
                      handleChangeSize(record.key, "quantity", val ?? 0)
                    }
                  />
                ),
              },
              {
                title: "Hành động",
                render: (_, record) => (
                  <Button danger onClick={() => handleRemoveSize(record.key)}>
                    Xóa
                  </Button>
                ),
              },
            ]}
            footer={() => (
              <Space>
                <Button type="dashed" onClick={handleAddSize}>
                  + Thêm size
                </Button>
                <strong>Tổng tồn kho: {totalQuantity}</strong>
              </Space>
            )}
          />
        </Form.Item>
        <Form.Item name="description" label="Mô tả">
          <Input.TextArea rows={3} placeholder="Mô tả ngắn về sản phẩm" />
        </Form.Item>
          {/* Ảnh sản phẩm (nhập URL) */}
        <Form.Item
          name="image"
          label="Ảnh sản phẩm (URL)"
          rules={[{ required: true, message: "Vui lòng nhập URL ảnh" }]}
        >
          <Input
            placeholder="Dán đường dẫn ảnh vào đây (VD: https://...)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </Form.Item>

        {/* Preview ảnh (nếu có URL) */}
        {imageUrl && (
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <img
              src={imageUrl}
              alt="preview"
              style={{
                width: 180,
                height: "auto",
                borderRadius: 8,
                boxShadow: "0 0 5px rgba(0,0,0,0.2)",
              }}
            />
          </div>
        )}

        {/* Nút hành động */}
        <Form.Item className="text-end mt-4">
          <Space>
            <Button onClick={onClose}>Hủy</Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              {isEdit ? "Cập nhật" : "Lưu sản phẩm"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
}
