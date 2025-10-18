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
  image?: string;
  description?: string;
  sizes?: { size: string; quantity: number }[];
  totalQuantity?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductStatusProps {
  status?: "active" | "inactive" | "out_of_stock";
}

export interface Address {
  _id: string;
  label: String,
  street: string;
  city: string;
  country: String,
  isDefault?: boolean;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  phone: string;
  addresses?: Address[];
  active: boolean;
  createdAt: string;
  updatedAt: string;
}