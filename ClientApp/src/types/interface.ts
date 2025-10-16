export interface Category {
  _id?: string;
  name: string;
  productCount?: number;
  status: "active" | "inactive";
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  category: Category | string;
  status: "active" | "inactive" | "out_of_stock";
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductStatusProps {
  status?: "active" | "inactive" | "out_of_stock";
}