import { Request, Response } from "express";
import Product from "../models/products.model";

export const ProductController = {
  async getAll(_req: Request, res: Response, next: Function): Promise<void> {
    try {
      const products = await Product.find().populate("category", "name");
      res.json(products);
    } catch (error) {
      next({message: "Lỗi khi lấy danh sách"});
    }
  },

  async getById(req: Request, res: Response, next: Function): Promise<void> {
    try {
      const p = await Product.findById(req.params.id).populate("category", "name");
      if (!p) {
        res.status(404).json({ message: "Not found" });
        return;
      }
      res.json(p);
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: Function): Promise<void> {
    try {
      const created = await Product.create(req.body);
      res.status(201).json({ message: "Created", product: created });
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: Function): Promise<void> {
    try {
      const { id } = req.params;
      const updated = await Product.findByIdAndUpdate(id, { ...req.body, $inc: { views: 1 } }, { new: true }).populate("category", "name");
      if (!updated) {
        res.status(404).json({ message: "Not found" });
        return;
      }
      res.json({ message: "Updated", product: updated });
    } catch (error) {
      next(error);
    }
  },

  async remove(req: Request, res: Response, next: Function): Promise<void> {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.json({ message: "Deleted" });
    } catch (error) {
      next(error);
    }
  }
};
