import express from "express";
import { AuthProtect } from "../middleware/auth.middleware.js";
import {
  CreateRazorpayOrder,
  VerifyRazorpayPayment,
} from "../controller/payment.controller.js";

const router = express.Router();

router.post("/create-order", AuthProtect, CreateRazorpayOrder);
router.post("/verify", AuthProtect, VerifyRazorpayPayment);

export default router;