import Order from "../models/order.model.js";
import Customer from "../models/customer.model.js";
import Menu from "../models/menu.model.js";

// POST /order/create
// Takes cart items from the frontend, recalculates prices from the DB
// (never trust prices sent by the client), and creates a "pending" order.
export const CreateOrder = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const { restaurantId, paymentMethod, orderItems, deliveryAddress } =
      req.body;

    if (!restaurantId || !orderItems || !orderItems.length) {
      const error = new Error("restaurantId and orderItems are required");
      error.statusCode = 400;
      return next(error);
    }

    let customer = await Customer.findOne({ customerId: currentUser._id });
    if (!customer) {
      customer = await Customer.create({ customerId: currentUser._id });
    }

    const menuDoc = await Menu.findOne({ restaurantId });
    if (!menuDoc) {
      const error = new Error("Menu not found for this restaurant");
      error.statusCode = 404;
      return next(error);
    }

    // Recalculate total from the actual DB prices (source of truth)
    let totalAmount = 0;
    for (const orderedItem of orderItems) {
      const menuItem = menuDoc.menuItems.id(orderedItem.itemId);
      if (!menuItem) {
        const error = new Error(
          `Menu item ${orderedItem.itemId} not found`,
        );
        error.statusCode = 404;
        return next(error);
      }
      totalAmount += menuItem.price * orderedItem.quantity;
    }

    const platformFee = 5;
    const convenienceFee = 3;
    const taxAmount = Math.round(totalAmount * 0.05 * 100) / 100; // 5% tax
    const deliveryCharge = 0;
    const discountAmount = 0;
    const finalAmount =
      totalAmount +
      platformFee +
      convenienceFee +
      taxAmount +
      deliveryCharge -
      discountAmount;

    // Fall back to the customer's default saved address if none is provided
    let resolvedAddress = deliveryAddress;
    if (!resolvedAddress) {
      const defaultAddress =
        customer.addressBook.find((a) => a.isDefault) ||
        customer.addressBook[0];
      if (defaultAddress) {
        resolvedAddress = {
          name: defaultAddress.name,
          address: defaultAddress.address,
          city: defaultAddress.city,
          state: defaultAddress.state,
          pinCode: defaultAddress.pinCode,
          country: defaultAddress.country,
          geoLocation: defaultAddress.geoLocation,
        };
      }
    }

    if (!resolvedAddress) {
      const error = new Error(
        "No delivery address provided and no saved address found",
      );
      error.statusCode = 400;
      return next(error);
    }

    const newOrder = await Order.create({
      restaurantId,
      customerId: customer._id,
      orderItems,
      billDetails: {
        totalAmount,
        platformFee,
        convenienceFee,
        taxAmount,
        deliveryCharge,
        discountAmount,
        finalAmount,
      },
      deliveryAddress: resolvedAddress,
      paymentDetails: {
        paymentMethod: paymentMethod || "upi",
      },
    });

    res.status(201).json({
      message: "Order created successfully",
      data: newOrder,
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};