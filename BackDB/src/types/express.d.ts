import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload;
    }
  }
}

export {}; // 👈 BẮT BUỘC để biến file này thành mô-đun và tránh lỗi toàn cục

