// pages/api/login.js

import dbConnect from "@/lib/mongodb";
import Users from "@/models/Users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";


// Helper functions
const generateToken = (userId, email) => {
  return jwt.sign({ userId, email }, process.env.NEXT_PUBLIC_JWT_SECRET, {
    expiresIn: "7d",
  });
};

const createUser = async (userData) => {
  const newUser = new Users(userData);
  await newUser.save();
  return newUser;
};

const authenticateUser = async (email, password) => {
  const user = await Users.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }
  return user;
};

// API handler
export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  if (method === "POST") {
    try {
      const {
        signup_type,
        first_name,
        last_name,
        email,
        phone_number,
        password,
      } = req.body;
      if (signup_type !== "normal") {
        const user = await Users.findOne({ email });
        const userToReturn =
          user ||
          (await createUser({
            first_name,
            last_name,
            email,
            phone_number: phone_number || "",
            signup_type,
            emailVerified: true,
          }));

        const token = generateToken(userToReturn._id, userToReturn.email);
        res
          .status(200)
          .json({
            success: true,
            msg: "Login successfully",
            token,
            data: userToReturn,
          });
      } else {
        const user = await authenticateUser(email, password);
        const token = generateToken(user._id, user.email);
        res
          .status(200)
          .json({
            success: true,
            msg: "Login successfully",
            token,
            data: user,
          });
      }
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message });
    }
  } else if (method === "GET") {
    res.status(200).json({ success: true, msg: "Connect successful" });
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
