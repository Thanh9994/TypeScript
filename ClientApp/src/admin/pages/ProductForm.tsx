import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { http } from "../../api/http";
import { message } from "antd"
import { productSchema, type ProductFormData } from "../../shared/Schema/auth.schema";
import type { Category, Product } from "../../types/interface";

export default function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [form, setForm] = useState<ProductFormData>({
    name: "",
    price: 0,
    category: "",
    status: "active",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    http.get("/categories").then((res) => setCategories(res.data));
  }, []);


  useEffect(() => {
    if (isEdit && id) {
      (async() => {
        try {
          const res = await http.get<Product>(`/products/${id}`);
          setForm({
            name: res.data.name,
            price: res.data.price,
            category:
            typeof res.data.category === "string"
              ? res.data.category
              : res.data.category._id ?? "",
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

    const result = productSchema.safeParse(form);
    if(!result.success){
      const firstError = result.error.issues[0]?.message ?? "Dữ liệu không hợp lệ.";
      setError(firstError);
      setLoading(false)
      return;
    }
     // Nếu cần gửi category là object, tìm object category theo id
    const categoryObject = categories.find(cat => cat._id === result.data.category);

    const payload = {
      ...result.data,
      category: categoryObject ?? result.data.category // nếu ko tìm thấy thì giữ nguyên
    };

    try {
      if (isEdit) {
        await http.put(`/products/${id}`, payload);
        message.success("Cập nhật sản phẩm thành công.");   
      } else {
        await http.post("/products", payload);
        message.success("Thêm sản phẩm thành công.");
      }
      console.log("🧾 Dữ liệu gửi lên:", payload);
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
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label className="form-label">Tên sản phẩm</label>
          <input
            type="text"
            className="form-control"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            disabled={loading}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Giá</label>
          <input
            type="number"   
            className="form-control"
            value={form.price === 0 ? "" : form.price}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value)})}
            required
            disabled={loading}
          />
        </div>
        <div className="mb-3">  
          <label className="form-label">Danh mục</label>
          <select
            className="form-select"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
          >
            <option value="">-- Chọn danh mục --</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Trạng thái</label>
          <select

            className="form-select"
            value={form.status}
            onChange={(e) =>
              setForm({    
                ...form,
                status: e.target.value as "active" | "inactive" | "out_of_stock"
              })
            }
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
