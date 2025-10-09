import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name:       { type: String, required: true, trim: true },
    price:      { type: Number, required: true, min: 0 },
    category:   { type: String, required: true },
    description:{ type: String, default: "" },
    image:      { type: String, default: "" },
    status:     { type: String, enum: ["active", "inactive", "out_of_stock"], default: "active" }
  },
  { timestamps: true, versionKey: false }
);

export type ProductDoc = mongoose.InferSchemaType<typeof productSchema>;
export default mongoose.model("Product", productSchema);
