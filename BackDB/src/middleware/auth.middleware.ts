import {Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: any;
}

export const verifyJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Chưa có token" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Không thấy token!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Vui lòng đăng nhập hoặc đăng nhập lại!" });
  }
};

// phân quyền admin, stuff 
export const verifyRole = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Chưa đăng nhập!" });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Bạn không có quyền truy cập!" });
    }

    next();
  }
};

//  chỉ admin hoặc chính user được phép update
export const checkOwnershipOrAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  const user = req.user;
  const targetUserId = req.params.id; // id của user trong URL

  if (!user) {
    return res.status(401).json({ message: "Chưa xác thực người dùng" });
  }

  if (user.role === "admin") {
    return next();
  }

  // Nếu là chính user đó => qua
  if (user.id === targetUserId) {
    return next();
  }

  return res.status(403).json({ message: "Bạn không có quyền thực hiện thao tác này" });
};