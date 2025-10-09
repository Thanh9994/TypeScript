import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { http } from "../../api/http";
import type { Product } from "../../types/product";
import Loading from "../../shared/Components/loading";
import { vnd } from "../../untils/currency";
import ProductStatus from "../../types/PorductStatus";

type ContextType = {
  search: string;
};

export default function ProductsAdmin() {
  const { search } = useOutletContext<ContextType>();
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Reset trang khi search thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const filteredData = data.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await http.get<Product[]>("/products");
        if (mounted) setData(res.data ?? []);
      } catch (e: any) {
        if (mounted)
          setErr(e?.response?.data?.message ?? "Không thể tải sản phẩm");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;
    try {
      await http.delete(`/products/${id}`);
      setData((prev) => prev.filter((p) => p._id !== id));
      alert("Xóa sản phẩm thành công.");
    } catch (e) {
      alert("Xóa sản phẩm thất bại. Vui lòng thử lại.");
    }
  };

  if (loading) return <Loading />;
  if (err) return <div className="alert alert-danger my-3">{err}</div>;
  if (!filteredData.length)
    return (
      <>
        <h2 className="mb-3">Sản phẩm</h2>
        <div className="text-muted my-3">Không có sản phẩm phù hợp.</div>
      </>
    );

  return (
    <>
      <h2 className="mb-3">Sản phẩm</h2>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th>STT</th>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Danh mục</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((p, index) => (
              <tr key={p._id}>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td>{p.name}</td>
                <td className="text-primary fw-semibold">{vnd(p.price)}</td>
                <td>{p.category}</td>
                <td>
                  <ProductStatus status={p.status} />
                </td>
                <td>
                  <Link
                    to={`/products/${p._id}`}
                    className="btn btn-sm btn-outline-primary me-1"
                  >
                    Xem
                  </Link>
                  <Link
                    to={`/admin/products/${p._id}/edit`}
                    className="btn btn-sm btn-warning me-1"
                  >
                    Sửa
                  </Link>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="btn btn-sm btn-danger"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-center mt-3 gap-2">
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Trang trước
        </button>

        {Array.from({ length: totalPages }).map((_, i) => {
          const page = i + 1;
          return (
            <button
              key={page}
              className={`btn btn-sm ${
                page === currentPage ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => goToPage(page)}
            >
              {page}
            </button>
          );
        })}

        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Trang sau
        </button>
      </div>

      <hr className="my-4" />

      <Link to="/admin/products/new" className="btn btn-primary">
        + Thêm sản phẩm
      </Link>
    </>
  );
}
