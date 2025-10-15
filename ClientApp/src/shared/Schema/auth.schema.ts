import {z} from "zod";

export const productSchema = z.object({
    name: z.string().min(1, "Tên sản phẩm không được để trống"),
    price: z.number().min(1, "Giá phải lớn hơn 0"),
    category: z.string().min(1, "Danh mục không được để trống"),
    status: z.enum(["active", "inactive", "out_of_stock"])
});

export type ProductFormData = z.infer<typeof productSchema>;