import express from "express";
import { AuthProtect } from "../middleware/auth.middleware.js";
import {
  GetAddressBook,
  AddAddress,
  UpdateAddress,
  DeleteAddress,
  GetAllOrders,
} from "../controller/customer.controller.js";

const router = express.Router();

//customer Routes - Address Book
router.get("/address-book", AuthProtect, GetAddressBook);
router.post("/address-book", AuthProtect, AddAddress);
router.put("/address-book/:addressId", AuthProtect, UpdateAddress);
router.delete("/address-book/:addressId", AuthProtect, DeleteAddress);

router.get("/all-orders", AuthProtect, GetAllOrders);

export default router;