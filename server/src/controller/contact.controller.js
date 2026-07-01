import Contact from "../models/contact.model.js";

export const contactUser = async (req, res) => {
  try {
    const { fullName, email, phone, subject, message } = req.body;

    await Contact.create({
      fullName,
      email,
      phone,
      subject,
      message,
    });

    res.status(200).json({ message: "Contact saved successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};