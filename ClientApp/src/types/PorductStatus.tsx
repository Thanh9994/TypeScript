import React from 'react';
import { FaCircle } from 'react-icons/fa';

interface ProductStatusProps {
  status?: "active" | "inactive" | "out_of_stock";
}

const ProductStatus: React.FC<ProductStatusProps> = ({ status }) => {
  const getColor = () => {
    switch (status) {
      case "active":
        return "green";
      case "inactive":
        return "red";
      case "out_of_stock":
        return "gray";
      default:
        return "black";
    }
  };

  return (
    <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <FaCircle color={getColor()} />
      <span>{status ?? "unknown"}</span>
    </span>
  );
};

export default ProductStatus;
