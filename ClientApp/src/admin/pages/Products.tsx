import { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { http } from "../../api/http";
import Loading from "../../shared/Components/loading";
import { vnd } from "../../untils/currency";
import ProductStatus from "../../types/PorductStatus";
import { Table, Button, Space, message, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import type { Category, Product } from "../../types/interface";

type ContextType = {
  search: string;
};

export default function ProductsAdmin() {
  const { search } = useOutletContext<ContextType>();
  const navigate = useNavigate();
  const [data, setData] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // ✅ reset trang khi search thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // ✅ tải dữ liệu sản phẩm
  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const [resP ,resC] = await Promise.all([
          http.get<Product[]>("/products"),
          http.get<Category[]>("/categories"),
        ]);
          setData(resP.data ?? []);
          setCategories(resC.data ?? []);
          console.log("products:", resP.data);
          console.log("categories:", resC.data);
      } catch (e: any) {
        if (!ignore)
          setErr(e?.response?.data?.message ?? "Không thể tải danh sách sản phẩm");
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => {
      ignore = true;
    };
  }, []);

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

  // ✅ Xóa sản phẩm với Modal.confirm
  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: "Bạn có chắc muốn xóa sản phẩm này?",
      icon: <ExclamationCircleOutlined />,
      okText: "Xóa",
      cancelText: "Hủy",
      okButtonProps: { danger: true },
      async onOk() {
        try {
          await http.delete(`/products/${id}`);
          setData((prev) => prev.filter((p) => p._id !== id));
          message.success("Đã xóa sản phẩm thành công");
        } catch (e: any) {
          message.error("Xóa sản phẩm thất bại. Vui lòng thử lại.");
        }
      },
    });
  };

  if (loading) return <Loading />;
  if (err)
    return (
      <div className="alert alert-danger my-3 text-center fw-semibold">
        {err}
      </div>
    );
  if (!filteredData.length)
    return (
      <>
        <h2 className="mb-3">Sản phẩm</h2>
        <div className="text-muted my-3">Không có sản phẩm phù hợp.</div>
      </>
    );

  return (
    <>
      <h2 className="mb-3">Danh sách sản phẩm</h2>

      <Button
        type="primary"
        className="my-3"
        onClick={() => navigate("/admin/products/new")}
      >
        + Thêm sản phẩm
      </Button>

      <Table
        bordered
        pagination={false}
        rowKey="_id"
        dataSource={paginatedData}
        columns={[
          {
            title: "STT",
            render: (_: any, __: any, index: number) =>
              (currentPage - 1) * itemsPerPage + index + 1,
            width: 40,
            align: "center",
          },
          { title: "Tên sản phẩm", dataIndex: "name" },
          {
            title: "Giá",
            dataIndex: "price",
            render: (price: number) => (
              <span className="text-primary fw-semibold">{vnd(price)}</span>
            ),
          },
          {
            title: "Danh mục",
            dataIndex: "category",
            render: (category) => {
              if (!category) return "Không rõ";
              return category.name ?? "Không rõ";
            },
          },
          {
            title: "Trạng thái",
            dataIndex: "status",
            render: (_: any, record: Product) => <ProductStatus status={record.status ?? "unknown"} />,
          },
          {
            title: "Hành động",
            render: (_: any, record: Product) => (
              <Space>
                <Link
                  to={`/products/${record._id}`}
                  className="btn btn-sm btn-outline-primary"
                >
                  Xem
                </Link>
                <Link
                  to={`/admin/products/${record._id}/edit`}
                  className="btn btn-sm btn-warning"
                >
                  Sửa
                </Link>
                <Button
                  danger
                  size="small"
                  onClick={() => handleDelete(record._id)}
                >
                  Xóa
                </Button>
              </Space>
            ),
          },
        ]}
      />

      {/* Phân trang */}
      <div className="d-flex justify-content-center mt-3 gap-2">
        <Button
          size="small"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Back
        </Button>

        {Array.from({ length: totalPages }).map((_, i) => {
          const page = i + 1;
          return (
            <Button
              key={page}
              type={page === currentPage ? "primary" : "default"}
              size="small"
              onClick={() => goToPage(page)}
            >
              {page}
            </Button>
          );
        })}

        <Button
          size="small"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </>
  );
}
