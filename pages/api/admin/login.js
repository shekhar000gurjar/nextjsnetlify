// pages/api/admin/login.js

import dbConnect from "@/lib/mongodb";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Helper functions
const generateToken = (userId, email) => {
    return jwt.sign({ userId, email }, process.env.NEXT_PUBLIC_JWT_SECRET, {
        expiresIn: "7d",
    });
};

const createAdmin = async (AdminData) => {
    const newAdmin = new Admin(AdminData);
    await newAdmin.save();
    return newAdmin;
};

const authenticateUser = async (email, password) => {
    const admin = await Admin.findOne({ email });
    if (!admin) {
        throw new Error("admin not found");
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }
    return admin;
};

// API handler
export default async function handler(req, res) {
    const { method } = req;
    await dbConnect();

    if (method === "POST") {
        try {
            const { email, password } = req.body;
            // if (signup_type !== 'normal') {
            //     const user = await Users.findOne({ email });
            //     const userToReturn = user || await createUser({
            //         first_name,
            //         last_name,
            //         email,
            //         type,
            //         emailVerified: true
            //     });

            //     const token = generateToken(userToReturn._id, userToReturn.email);
            //     res.status(200).json({ success: true, msg: "Login successfully", token, data: userToReturn });

            // } else {
            const admin = await authenticateUser(email, password);
            const token = generateToken(admin._id, admin.email);
            res.status(200).json({ success: true, msg: "Login successfully", token, data: admin });
            // }
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
