import { Response, Request } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {User}  from "../models/users.model";

interface AuthRequest extends Request {
  user?: any;
}

export const UserController = {
  async signup (req: Request, res: Response) {
    const { username, email, password, phone, addresses, role } = req.body;  

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email đã được sử dụng!" });
      }
      
      // Mã hóa mật khẩu
      const hashedPassword = await bcrypt.hash(password, 10);  
      
      // Lưu người dùng vào cơ sở dữ liệu
      const user = await User.create({ username, email, password: hashedPassword, phone, addresses , role: role || "customer" });

      res.status(201).json({ message: "Đăng ký thành công", data: user });
    } catch (err) {
      res.status(400).json({ message: "Lỗi khi đăng ký", err });
    }
  },
    
  async login (req: Request, res: Response) {
    const { email, password } = req.body;
    try{
      const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(401).json({ message: "Email hoặc mật khẩu không đúng" });

    // Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Email hoặc mật khẩu không đúng" });

    // Tạo JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
    res.json({
        message: "Đăng nhập thành công",
        token,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });

    } catch (err) {
    res.status(400).json({ message: "Lỗi đăng nhập", err});
    }
  },
  

  async getMe (req: AuthRequest, res: Response) {
    try {
      const userId = req.user.id;
      // Lấy user từ middleware auth
      const user = await User.findById(userId).select("-password +active");
      if (!user) {
        return res.status(404).json({ success: false, message: "Không tìm thấy người dùng" });
      }
      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (err) {
      res.status(400).json({ message: "Lỗi lấy thông tin người dùng", err });
    }    
  },

  async getAll(_req: AuthRequest, res: Response) {
    try {
      const users = await User.find().select("-password +active");
      res.status(200).json({ success: true, data: users });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: "Lỗi lấy danh sách người dùng", err });
    }
  },

  async update(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const { username, email, phone, role } = req.body;
    try{ 
      // Chỉ admin hoặc chính chủ được sửa
      if (req.user.role !== "admin" && req.user.id !== id) {
        return res.status(403).json({ message: "Không có quyền sửa!" });
      }

      const updatedUser = await User.findByIdAndUpdate(
        id,
        { username, email, phone, role },
        { new: true }
      ).select("-password");

      if (!updatedUser) {
        return res.status(404).json({ message: "Không tìm thấy người dùng!" });
      }

      res.status(201).json({message: "Cập nhật thành công", data: updatedUser});
    }catch (err) {
      res.status(400).json({ message: "Lỗi khi cập nhật người dùng", err });
    }
  },

  async delete(req: AuthRequest, res: Response) {
    try{

      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Chỉ admin mới được xóa người dùng!" });
      }

      await User.findByIdAndDelete(req.params.id);
      res.json({ message: "Delete thành công"});
    } catch (err) {
      res.status(400).json({ message: "Xóa thất bại", err })
    }
  }

};

 
