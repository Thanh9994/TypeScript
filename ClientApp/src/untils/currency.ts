export const vnd = (n: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);
// Ví dụ: vnd(100000) => "100.000 ₫"    