import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./src/config/dbConnection.config.js";
import AuthRouter from "./src/router/auth.route.js";      // ✅ NEW - auth routes
import PublicRouter from "./src/router/public.route.js";  // ✅ NEW - public routes
import morgan from "morgan";                               // ✅ NEW - request logger
import cors from "cors";                                   // ✅ NEW - cors

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));  // ✅ NEW - frontend allow karo
app.use(express.json());
app.use(morgan("dev"));                              // ✅ NEW - terminal mein requests dikhega

app.use("/auth", AuthRouter);    // ✅ NEW
app.use("/public", PublicRouter); // ✅ NEW

app.get("/", (req, res) => {
  console.log("Default Get API Hit");
  res.json({ message: "Welcome to my Cravings Project" });
});

app.use((err, req, res, next) => {
  const ErrMessage = err.message || "Internal Server Error";
  const ErrStausCode = err.statusCode || 500;
  res.status(ErrStausCode).json({ message: ErrMessage });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server Started on port:", port);
  connectDB();
});