import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import {connectDB} from "./config/db";
import productRoutes from "./routes/products.routes";
import userRoutes from "./routes/user.routes"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes)

app.get("/", (_req, res) => res.json({ message: "Products API 🚀" }));
// import { Request } from "express";

// const testReq: Request = {} as Request;
// testReq.user; // Nếu không báo lỗi, nghĩa là TS đã nhận type

const PORT = Number(process.env.PORT || 4000);
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not defined in environment variables");
  process.exit(1);
}

connectDB(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`✅ API on http://localhost:${PORT}`));
  })
  .catch((error) => {
    console.error("❌ Failed to connect to MongoDB", error);
    process.exit(1);
  });
