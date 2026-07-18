import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const AuthProtect = async (req, res, next) => {
  try {
    // FIXED: this was `req.cookies.` with no cookie name at all (invalid / always
    // undefined). genToken() sets the cookie as "Cravings", so read that here.
    const token = req.cookies.Cravings;
    if (!token) {
      const error = new Error("Session Expired");
      error.statusCode = 401;
      return next(error);
    }

    // console.log("Token From MiddleWare : ", token);

    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      const error = new Error("Session Expired");
      error.statusCode = 401;
      return next(error);
    }

    // console.log("Decode:", decode);

    const verifiedUser = await User.findById(decode.id);
    // console.log("VerifiedUser:", verifiedUser);
    if (!verifiedUser) {
      const error = new Error("Session Expired");
      error.statusCode = 401;
      return next(error);
    }

    // Send the verified user to the Controller for further processing
    req.user = verifiedUser;
    next();

  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
export const OTPAuthProtect = async (req, res, next) => {
  try {
    const token = req.cookies.kitkat;
    if (!token) {
      const error = new Error("Session Expired");
      error.statusCode = 401;
      return next(error);
    }

    // console.log("Token From MiddleWare : ", token);

    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      const error = new Error("Session Expired");
      error.statusCode = 401;
      return next(error);
    }

    // console.log("Decode:", decode);

    const verifiedUser = await User.findById(decode.id);
    // console.log("VerifiedUser:", verifiedUser);
    if (!verifiedUser) {
      const error = new Error("Session Expired");
      error.statusCode = 401;
      return next(error);
    }

    // Send the verified user to the Controller for further processing
    req.user = verifiedUser;
    next();

  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export const RestaurantAuthProtect = async (req, res, next) => {
  try {
    // FIXED: was reading "Oreo" — genToken() actually sets the cookie as "Cravings".
    const token = req.cookies.Cravings;
    if (!token) {
      const error = new Error("Session Expired");
      error.statusCode = 401;
      return next(error);
    }

    // console.log("Token From MiddleWare : ", token);

    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      const error = new Error("Session Expired");
      error.statusCode = 401;
      return next(error);
    }

    // console.log("Decode:", decode);

    const verifiedUser = await User.findById(decode.id);
    // console.log("VerifiedUser:", verifiedUser);
    if (!verifiedUser) {
      const error = new Error("Session Expired");
      error.statusCode = 401;
      return next(error);
    }

    if(verifiedUser.userType !== "restaurant") {
      const error = new Error("Unauthorized Access");
      error.statusCode = 403;
      return next(error);
    }

    // Send the verified user to the Controller for further processing
    req.user = verifiedUser;
    next();

  } catch (error) {
    console.log(error.message);
    next(error);
  }
};