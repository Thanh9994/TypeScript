export interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  status: "active" | "inactive" | "out_of_stock";
  createdAt?: string;
  updatedAt?: string;
}


