import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { genToken } from "../utils/auth.service.js";

export const RegisterUser = async (req, res, next) => {
  try {
    const { fullName, email, password, phone, gender, dob } = req.body;

    if (!fullName || !email || !password || !phone || !gender || !dob) {
      const error = new Error("All fields Required");
      error.statusCode = 400;
      return next(error);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("Email already registred");
      error.statusCode = 409;
      return next(error);
    }

    // photo ek simple string hai (object nahi)
    const photoURL = `https://placehold.co/600x400?text=${fullName.charAt(0).toUpperCase()}`;

    const photo = {
      url: photoURL,
      publicId: null,
    };

    const SALT = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, SALT);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      phone,
      gender,
      dob,
      photo,
    });

    res.status(201).json({ message: "User Created Successfully" });
  } catch (error) {
    console.log(error.message);
    next();
  }
};

export const LoginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // check login pass
    if (!email || !password) {
      const error = new Error("All fields Required");
      error.statusCode = 400;
      return next(error);
    }

    //check in database user ?
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const error = new Error("Email not registred");
      error.statusCode = 404;
      return next(error);
    }

// verify user with password
    const isVerified = await bcrypt.compare(password, existingUser.password);
    if (!isVerified) {
      const error = new Error("Incorrect Password");
      error.statusCode = 401;
      return next(error);
    }

    //genrate Token
    await genToken(existingUser, res);

    // then log succesfully welcome back!
    res.status(200).json({
      message: "Welcome Back",
      data: existingUser,
    });
  } catch (error) {
    console.log(error.message);
    next();
  }
};

export const LogoutUser = async (req, res, next) => {
  try {
    res.clearCookie("Cravings", { maxAge: 0 }); //Controller Logic -
    res.status(200).json({ message: "Logout Sucessfully" });
  } catch (error) {
    console.log(error.message);
    next();
  }
};
