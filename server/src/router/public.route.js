import express from "express";
import {
  ContactUsForm,
  GetAllRestaurants,
  GetRestaurantDetail,
} from "../controller/public.controller.js";

const router = express.Router();

router.post("/contact-us", ContactUsForm);
router.get("/restaurants", GetAllRestaurants);
router.get("/restaurant-detail/:restaurantId", GetRestaurantDetail);


export default router;