// pages/api/register.js

import dbConnect from "@/lib/mongodb";
import Users from "@/models/Users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  if (method === "POST") {
    const { first_name, last_name, email, password, phone_number, company_name, company_email, current_location, position, graduationCollege, postGradCollege, degree, sector, signup_type } = req.body;

    try {
      // Check if the email has been verified
      const existingUser = await Users.findOne({ email });
      if (!existingUser || !existingUser.emailVerified) {
        return res.status(400).json({ success: false, msg: "Please verify your email address" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Update existing user with the remaining details
      existingUser.first_name = first_name;
      existingUser.last_name = last_name;
      existingUser.password = hashedPassword;
      existingUser.phone_number = phone_number;
      existingUser.currentCompanyName = company_name;
      existingUser.currentCompanyEmail = company_email;
      existingUser.current_location = current_location;
      existingUser.position = position;
      existingUser.graduationCollege = graduationCollege;
      existingUser.postGradCollege = postGradCollege;
      existingUser.degree = degree;
      existingUser.sector = sector;
      existingUser.signup_type = signup_type;

      const savedUser = await existingUser.save();

      // Generate JWT token
      const token = jwt.sign(
        {
          userId: savedUser._id,
          email: savedUser.email,
        },
        process.env.NEXT_PUBLIC_JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      res.status(201).json({
        success: true,
        msg: "User registered successfully",
        token: token,
        data: savedUser,
      });
    } catch (error) {
      res.status(400).json({ success: false, msg: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
