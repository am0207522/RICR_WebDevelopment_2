import cloudinary from "./src/config/cloudinary.config.js";
import express from "express";
import connectDB from "./src/config/dbConnection.config.js";
import AuthRouter from "./src/router/auth.route.js"; // - auth routes
import PublicRouter from "./src/router/public.route.js"; // - public routes
import CommonRouter from "./src/router/common.route.js";
import morgan from "morgan"; // - request logger
import cors from "cors"; // - cors
import cookieParser from "cookie-parser"; // - cokkie import

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true })); // - frontend allow karo
app.use(express.json()); // - JSON body parser
app.use(cookieParser()); // - cookie parser
app.use(morgan("dev")); // - terminal mein requests dikhega

app.use("/auth", AuthRouter); // - auth routes
app.use("/public", PublicRouter); // - public routes
app.use("/common", CommonRouter);

// HERE , DEFAULT API
app.get("/", (req, res) => {
  // - default route
  console.log("Default Get API Hit");
  res.json({ message: "Welcome to my Cravings Project" });
});

//HERE , Default API
app.use((err, req, res, next) => {
  // - error handling middleware
  const ErrMessage = err.message || "Internal Server Error";
  const ErrStausCode = err.statusCode || 500;
  res.status(ErrStausCode).json({ message: ErrMessage });
});

const port = process.env.PORT || 5000; // - port

app.listen(port, async () => {
  // - server listens
  console.log("Server Started on port:", port);
  connectDB();

  try {
    const result = await cloudinary.api.ping();
    console.log("Cloudinary Connected :");
    console.log(result);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
});
