import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name:       { type: String, required: true, trim: true },
    price:      { type: Number, required: true, min: 0 },
    category:   { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    description:{ type: String, default: "" },
    image:      { type: String, default: "" },
    sizes: [{
        size: { type: String, required: true },
        quantity: { type: Number, required: true, min: 0, default: 0 },
      }],
    totalQuantity: {
      type: Number,
      default: 0,
      min: 0,
    },
    status:{ type: String, enum: ["active", "inactive", "out_of_stock"], default: "active" }
  },
  { timestamps: true, versionKey: false }
);

//cập nhật số lượng tự dộng 
productSchema.pre("save", function (next) {
  if (this.sizes?.length) {
    this.totalQuantity = this.sizes.reduce((sum, s) => sum + s.quantity, 0);
  }
  next();
});

export type ProductDoc = mongoose.InferSchemaType<typeof productSchema>;
export default mongoose.model<ProductDoc>("Product", productSchema);
