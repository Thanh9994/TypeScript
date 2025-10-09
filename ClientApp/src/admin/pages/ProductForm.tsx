import { useNavigate, useParams } from "react-router-dom";
import type {Product} from "../../types/product";
import { useEffect, useState } from "react";
import { http } from "../../api/http";

export default function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [form, setForm] = useState<Omit<Product, "_id">>({
    name: "",
    price: 0,
    category: "",
    status: "active",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEdit && id) {
      (async() => {
        try {
          const res = await http.get<Product>(`/products/${id}`);
          setForm({
            name: res.data.name,
            price: res.data.price,
            category: res.data.category,
            status: res.data.status,
          });
        } catch (e: any) {
          setError(e?.response?.data?.message ?? "Không thể tải sản phẩm");
        }
      })();
    }
  }, [isEdit, id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isEdit) {
        await http.put(`/products/${id}`, form);
        alert("Cập nhật sản phẩm thành công.");
      } else {
        await http.post("/products", form);
        alert("Thêm sản phẩm thành công.");
      }
      navigate("/admin/products");
    } catch (e: any) {
      setError(e?.response?.data?.message ?? "Lưu sản phẩm thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return(
    <>
      <h2 className="mb-3">{isEdit ? "Chỉnh sửa" : "Thêm"} sản phẩm</h2>
      {error && <div className="alert alert-danger my-3">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Tên sản phẩm</label>
          <input
            type="text"
            className="form-control"
            value={form.name}
            onChange={(e) => setForm((f: Omit<Product, "_id">) => ({ ...f, name: e.target.value }))}
            required
            disabled={loading}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Giá</label>
          <input
            type="number"   
            className="form-control"
            value={form.price}
            onChange={(e) => setForm((f: Omit<Product, "_id">) => ({ ...f, price: Number(e.target.value) }))}
            required
            min={0}
            disabled={loading}
          />
        </div>
        <div className="mb-3">  
          <label className="form-label">Danh mục</label>
          <select
            className="form-select"
            value={form.category}
            onChange={(e) => setForm((f: Omit<Product, "_id">) => ({ ...f, category: e.target.value }))}
            required
          >
            <option value="">-- Chọn danh mục --</option>
            <option value="category1">Home Appliances</option>
            <option value="category2">Electronics</option>
            <option value="category3">Clothing</option>
            <option value="category4">Phone</option>
            <option value="category5">Pen</option>
            <option value="category6">Item</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Trạng thái</label>
          <select

            className="form-select"
            value={form.status}
            onChange={(e) => setForm((f: Omit<Product, "_id">) => ({ ...f, status: e.target.value as "active" | "inactive" | "out_of_stock" }))}
            required
            disabled={loading}
          >
            <option value="">-- Chọn trạng thái --</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Đang lưu..." : "Lưu sản phẩm"}
        </button>
        <button type="button" className="btn btn-secondary mx-2" onClick={() => navigate("/admin/products")}>Hủy </button>
      </form>
    </>
  );
};
