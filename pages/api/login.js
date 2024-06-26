import dbConnect from "@/lib/mongodb";
import Users from "@/models/Users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  if (method === "POST") {
    try {
      const user = await Users.findOne({ email: req.body.email });
      if (!user) {
        return res.status(200).json({ success: false, msg: "User not found" });
      }
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res
          .status(200)
          .json({ success: false, msg: "Invalid credentials" });
      }
      const token = jwt.sign({ userId: user._id }, process.env.NEXT_PUBLIC_JWT_SECRET, {
        expiresIn: "7d",
      });

      res.status(200).json({
        success: true,
        msg: "Login successfully",
        token: token,
        data: user,
      });
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message });
    }
  } else if (method === "GET") {
    try {
      res.status(200).json({ success: true, msg: "connect" });
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
