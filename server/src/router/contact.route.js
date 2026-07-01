import express from "express";
import { contactUser } from "../controller/contact.controller.js";

const router = express.Router();

router.post("/", contactUser);

export default router;