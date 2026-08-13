import crypto from "crypto";
import Razorpay from "razorpay";
import Order from "../models/order.model.js";
import Customer from "../models/customer.model.js";

// Lazily create Razorpay instance so missing keys fail loudly
const getRazorpayInstance = () =>
  new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

// ─── Helper: find a customer's order safely ─────────────────────────────────
const getCustomerOrder = async (userId, orderId) => {
  const customer = await Customer.findOne({ customerId: userId });
  if (!customer) return null;
  return Order.findOne({ _id: orderId, customerId: customer._id });
};

// ─── POST /payment/create-order ──────────────────────────────────────────────
export const CreateRazorpayOrder = async (req, res, next) => {
  try {
    const { orderId } = req.body;
    if (!orderId) {
      const err = new Error("orderId is required");
      err.statusCode = 400;
      return next(err);
    }

    const order = await getCustomerOrder(req.user._id, orderId);
    if (!order) {
      const err = new Error("Order not found");
      err.statusCode = 404;
      return next(err);
    }

    if (order.paymentDetails?.paymentStatus === "completed") {
      const err = new Error("Payment already completed for this order");
      err.statusCode = 400;
      return next(err);
    }

    const razorpay = getRazorpayInstance();

    // Razorpay expects amount in the SMALLEST currency unit (paise for INR)
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(order.billDetails.finalAmount * 100),
      currency: "INR",
      receipt: `receipt_${order._id}`,
      notes: { appOrderId: String(order._id) },
    });

    order.paymentDetails.razorpayOrderId = razorpayOrder.id;
    await order.save({ validateModifiedOnly: true });

    return res.status(200).json({
      message: "Razorpay order created",
      data: {
        key: process.env.RAZORPAY_KEY_ID,
        razorpayOrderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        appOrderId: order._id,
      },
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

// ─── POST /payment/verify ────────────────────────────────────────────────────
export const VerifyRazorpayPayment = async (req, res, next) => {
  try {
    const {
      orderId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (
      !orderId ||
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      const err = new Error("All payment verification fields are required");
      err.statusCode = 400;
      return next(err);
    }

    const order = await getCustomerOrder(req.user._id, orderId);
    if (!order) {
      const err = new Error("Order not found");
      err.statusCode = 404;
      return next(err);
    }

    // Razorpay signs: "razorpay_order_id|razorpay_payment_id"
    // using your Key Secret as the HMAC key.
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      order.paymentDetails.paymentStatus = "failed";
      order.orderStatus = "failed";
      await order.save({ validateModifiedOnly: true });

      const err = new Error("Payment signature verification failed");
      err.statusCode = 400;
      return next(err);
    }

    order.paymentDetails.paymentStatus = "completed";
    order.paymentDetails.razorpayOrderId = razorpay_order_id;
    order.paymentDetails.razorpayPaymentId = razorpay_payment_id;
    order.paymentDetails.razorpaySignature = razorpay_signature;
    order.paymentDetails.paidAt = new Date();
    order.orderStatus = "accepted";
    await order.save({ validateModifiedOnly: true });

    return res.status(200).json({
      message: "Payment verified and order successful",
      data: order,
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};