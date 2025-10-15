import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { http } from "../../api/http"
import Loading from "../../shared/Components/loading";
import { vnd } from "../../untils/currency";
import ProductStatus from "../../types/PorductStatus";  // ✅ hiển thị trạng thái sản phẩm
import type { Product } from "../../types/interface";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>(); // Lấy id từ URL
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    http
      .get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => setError("Không tìm thấy sản phẩm"))
      .finally(() => setLoading(false));
  }, [id]);

  function Category(category: Product["category"]) {
    if (typeof category === "string") return category;
    if (category && typeof category === "object") return category.name;
    return "Không xác định";
  }

  if (loading) return <Loading />;
  if (error) return <div className="alert alert-danger mt-4">{error}</div>;
  if (!product) return <div className="text-center mt-4">Sản phẩm không tồn tại.</div>;

  return (
    <div className="container mt-5">
      <Link to="/products" className="btn btn-outline-secondary mb-3">
        ← Quay lại danh sách
      </Link>

      <div className="card shadow-sm p-4">
        <h3 className="mb-3">{product.name}</h3>
        <p><strong>Danh mục:</strong> {Category(product.category)}</p>
        <p><strong>Giá:</strong> <span className="text-primary fw-semibold">{vnd(product.price)}</span></p>
        <p><strong>Trạng thái:</strong> <ProductStatus status={product.status} /></p>

        <button className="btn btn-primary mt-3">Thêm vào giỏ hàng</button>
      </div>
    </div>
  );
}

