import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { http } from "../../api/http";
import type { Product } from "../../types/product";
import Loading from "../../shared/Components/loading";  
import { vnd } from "../../untils/currency";             // ✅ format tiền

export default function ProductsDetail() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const res = await http.get<Product[]>("/products");
        if (mounted) setData(res.data ?? []);
      } catch (e: any) {
        if (mounted) setErr(e?.response?.data?.message ?? "Không thể tải sản phẩm");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <Loading />;
  if (err) return <div className="alert alert-danger my-3">{err}</div>;
  if (!data.length) return <div className="text-muted my-3">Chưa có sản phẩm.</div>;

  return (
    <>
      <h2 className="mb-3">Sản phẩm</h2>
      <div className="row g-3">
        {data.map((p) => (
          <div key={p._id} className="col-12 col-sm-6 col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h6 className="card-title">{p.name}</h6>
                <p className="card-text text-primary fw-semibold">{vnd(p.price)}</p>
                <div className="small text-muted mb-2">Danh mục: {p.category}</div>
                <Link to={`/products/${p._id}`} className="btn btn-outline-primary btn-sm">
                  Xem chi tiết
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}