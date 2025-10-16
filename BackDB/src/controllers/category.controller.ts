import { Request, Response } from "express";
import { Category } from "../models/category.model";
import mongoose from "mongoose";

export const CategoryController ={
    async getAll(_req: Request, res: Response){
        try{
            const categories = await Category.aggregate([
            {
                $lookup: {
                    from: "products", // ⚠️ tên collection trong MongoDB (phải đúng, viết thường, số nhiều)
                    localField: "_id",
                    foreignField: "category",
                    as: "products",
                },
            },
            {
                $addFields: {
                    productCount: { $size: "$products" },
                },
            },
            {
                $project: {
                    products: 0,
                },
            },
            { $sort: { createdAt: -1 } },
            ]);
            res.json(categories)
        } catch (error) {
            console.error("Lỗi khi lấy danh mục:", error);
            res.status(500).json({ message: "Lỗi khi lấy danh mục" });
        }
       
    },

    async create(req: Request, res: Response){
        try {
            const category = await Category.create(req.body);
            res.status(201).json(category);
        } catch (e) {
            res.status(500).json({ message: "Lỗi danh sách"});
        }
    },

    async getById(req: Request, res: Response) {
        const { id } = req.params;
        try{
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: "ID không hợp lệ" });
            }
            const c = await Category.findById(id);
            if(!c) {                
                return res.status(404).json({ message: "Not found"})                
            }
            res.status(200).json(c);
        } catch (e) {
            res.status(400).json({ message: e });
        }
    },

    async update(req: Request, res: Response) {
        const { id } = req.params;
        try{            
            const category = await Category.findByIdAndUpdate(id, req.body, { new: true });
            res.status(201).json({message: "Updated", Category: category});
        } catch (e) {
            res.status(400).json({message: e})
        }
    },

    async delete (req: Request, res: Response) {
        try{
            await Category.findByIdAndDelete(req.params.id);
            res.status(201).json({ message: "Đã xóa danh mục" });
        } catch (e) {
            res.status(400).json({ message: e})
        }
    }
}