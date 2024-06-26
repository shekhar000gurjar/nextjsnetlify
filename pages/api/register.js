// pages/api/register.js

import dbConnect from "@/lib/mongodb";
import Users from "@/models/Users";
import CompaniesDetails from "@/models/CompaniesDetails";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  if (method === "POST") {
    const { first_name, last_name, email, password, phone_number, company_name, company_email, position, current_location, last_college } = req.body;

    try {
      // Check if the user already exists
      const existingUser = await Users.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success: false, msg: "User already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = new Users({
        first_name,
        last_name,
        email,
        password: hashedPassword,
        phone_number,
      });

      const savedUser = await newUser.save();

      // Save company details
      const newCompany = new CompaniesDetails({
        company_name,
        company_email,
        position,
        current_location,
        last_college,
        user_id: savedUser._id, // Add user_id to the company details
      });

      const savedCompany = await newCompany.save();

      // Update user with company_id
      savedUser.company_id = savedCompany._id;
      await savedUser.save();

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
        success: true, msg: "User registered successfully", token: token,
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
