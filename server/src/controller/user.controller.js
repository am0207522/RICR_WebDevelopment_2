import User from "../models/user.model.js";
import cloudinary from "../config/cloudinary.config.js";

export const EditUserProfile = async (req, res, next) => {
  try {
    const { email, fullName, phone } = req.body;
    const newPhoto = req.file;

    console.log("Req Body :", req.body);
    console.log("Req File :", req.file);
    if (!email || !fullName || !phone) {
      const error = new Error("All fields Required");
      error.statusCode = 400;
      return next(error);
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const error = new Error("Email not registred");
      error.statusCode = 404;
      return next(error);
    }

    // here If new photo uploded the old photo get deleted from the cloudinary 
    if (newPhoto) {
      existingUser?.photo?.publicId && 
      (await cloudinary.uploader.destroy(existingUser.photo.publicId));

      const b64 = Buffer.from(newPhoto.buffer).toString("base64");
      const dataURI = `data:${newPhoto.mimetype};base64,${b64}`;


      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "Cravings_main/profile",
        width: 500,
        height: 500,
        crop: "fill",
      });

      console.log(result);
      existingUser.photo.url = result.secure_url;
      existingUser.photo.publicId = result.public_id;
    }

    existingUser.fullName = fullName;
    existingUser.phone = phone;

    await existingUser.save();

    res
      .status(200)
      .json({ message: "User Updated Sucessfully", data: existingUser });
  } catch (error) {
    console.log(error.message);
    next();
  }
};

//////////////////////////////////////////////////////////////
// import User from "../models/user.model.js";
// import cloudinary from "../config/cloudinary.config.js";

// export const EditUserProfile = async (req, res, next) => {
//   try {
//     const { email, fullName, phone } = req.body;
//     const newPhoto = req.file;

//     console.log("Req Body :", req.body);
//     console.log("Req File :", req.file);
//     if (!email || !fullName || !phone) {
//       const error = new Error("All fields Required");
//       error.statusCode = 400;
//       return next(error);
//     }

//     const existingUser = await User.findOne({ email });
//     if (!existingUser) {
//       const error = new Error("Email not registred");
//       error.statusCode = 404;
//       return next(error);
//     }

//     if (newPhoto) {
//       const b64 = Buffer.from(newPhoto.buffer).toString("base64");
//       const dataURI = `data:${newPhoto.mimetype};base64,${b64}`;
//       // console.log(dataURI.slice(0, 100));

//       const result = await cloudinary.uploader.upload(dataURI, {
//         folder: "Cravings678/profile",
//         width: 500,
//         height: 500,
//         crop: "fill",
//       });

//       console.log(result);

//       existingUser.photo = {
//         url: result.secure_url,
//         publicId: result.public_id,
//       };
//     }

//     existingUser.fullName = fullName;
//     existingUser.phone = phone;

//     await existingUser.save();

//     res
//       .status(200)
//       .json({ message: "User Updated Sucessfully", data: existingUser });
//   } catch (error) {
//     console.log(error.message);
//     next(error);
//   }
// };

// import User from "../models/user.model.js";
// import cloudinary from "../config/cloudinary.config.js";

// // Ye function ek "controller" hai — jab koi user apna profile update karega,
// // ye function chalega. req = jo data frontend se aaya, res = jo response bhejna hai
// export const EditUserProfile = async (req, res, next) => {
//   try {
//     // Frontend ne FormData ke through jo text fields bheje the (email, naam, phone),
//     // wo sab req.body mein aate hain
//     const { email, fullName, phone } = req.body;

//     // Agar frontend ne koi photo bhi bheji hai, toh multer usse yaha
//     // req.file mein daal deta hai (buffer + mimetype ke saath)
//     const newPhoto = req.file;

//     // Debugging ke liye — terminal mein dikhega kya data aaya hai
//     console.log("Req Body :", req.body);
//     console.log("Req File :", req.file);

//     // Validation: agar zaroori fields khaali hain, toh aage nahi badhna
//     if (!email || !fullName || !phone) {
//       const error = new Error("All fields Required");
//       error.statusCode = 400; // 400 = "Bad Request" (client ki galti)
//       return next(error); // error middleware ko bhej diya, function yahi ruk gaya
//     }

//     // Database mein check karo ki ye email wala user exist karta hai ya nahi
//     const existingUser = await User.findOne({ email });
//     if (!existingUser) {
//       const error = new Error("Email not registred");
//       error.statusCode = 404; // 404 = "Not Found"
//       return next(error);
//     }

//     // Agar photo bheji gayi hai (newPhoto maujood hai), tabhi ye poora block chalega
//     if (newPhoto) {
//       // newPhoto.buffer = raw binary image data (numbers ka array)
//       // Buffer.from(...).toString("base64") — us binary data ko
//       // base64 text format mein convert kar diya (jaise humne pehle discuss kiya tha)
//       const b64 = Buffer.from(newPhoto.buffer).toString("base64");

//       // Cloudinary ko ek specific format chahiye hota hai upload karne ke liye:
//       // "data:<file_type>;base64,<actual_data>"
//       // newPhoto.mimetype = jaise "image/jpeg" ya "image/png"
//       const dataURI = `data:${newPhoto.mimetype};base64,${b64}`;

//       // Ab ye dataURI Cloudinary ko bheja — wo isse apne server pe store kar lega
//       const result = await cloudinary.uploader.upload(dataURI, {
//         folder: "Cravings678/profile", // Cloudinary pe kis folder mein rakhna hai
//         width: 500,   // image ko 500px width mein resize karega
//         height: 500,  // 500px height mein resize karega
//         crop: "fill",  // "fill" matlab: agar image ka ratio match nahi karta,
//                         // toh crop karke 500x500 square bana dega (kuch hissa katega)
//       });

//       // result mein Cloudinary se poora response aata hai — jisme
//       // result.secure_url wo permanent link hota hai jo humein chahiye
//       console.log(result);

//       // ⚠️ NOTICE: Yaha ek important step MISSING hai —
//       // result.secure_url ko kabhi existingUser.photo mein assign nahi kiya!
//       // Isliye upload toh Cloudinary pe ho jaayega, LEKIN database mein
//       // user ka photo field update NAHI hoga.
//     }

//     // Baaki fields update kar diye (fullName, phone)
//     existingUser.fullName = fullName;
//     existingUser.phone = phone;

//     // Database mein final changes save kar diye
//     await existingUser.save();

//     // Success response frontend ko bhej diya
//     res
//       .status(200)
//       .json({ message: "User Updated Sucessfully", data: existingUser });
//   } catch (error) {
//     // Agar kahi bhi upar error aaya (jaise Cloudinary fail ho gaya, ya
//     // database connection issue), toh yaha catch hoga
//     console.log(error.message);
//     next(); // ⚠️ NOTICE: yaha bhi bug hai, next() ko error pass nahi kiya —
//              // niche explain karta hu
//   }
// };
