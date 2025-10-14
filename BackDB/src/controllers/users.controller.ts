import { Response, Request } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {User}  from "../models/users.model";

interface AuthRequest extends Request {
  user?: any;
}

export const UserController = {
  async signup (req: Request, res: Response) {
    const { username, email, password, phone, role } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email đã được sử dụng!" });
      }
      // Mã hóa mật khẩu
      const hashedPassword = await bcrypt.hash(password, 10);
      

      // Lưu người dùng vào cơ sở dữ liệu
      const user = await User.create({ username, email, password: hashedPassword, phone, role: role || "user" });

      res.status(201).json({ message: "Đăng ký thành công", data: user });
    } catch (err) {
      res.status(400).json({ message: "Error registering user", err });
    }
  },
    
  async login (req: Request, res: Response) {
    const { email, password } = req.body;
    try{
      const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(401).json({ message: "Email hoặc mật khẩu không đúng" });

    // Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });

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
      // Lấy user từ middleware auth
      const user = req.user;
      console.log("req.user:", req.user);

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (err) {
      res.status(400).json({ message: "Error fetching user info", err });
    }    
  },

  async getAll(_req: AuthRequest, res: Response) {
    try {
      const users = await User.find().select("-password +active");
      res.status(200).json({ success: true, data: users });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: "Error fetching users", err });
    }
  }

};

 
