// pages/api/add-comapany.js

import dbConnect from "@/lib/mongodb";
import Users from "@/models/Users";
import CompaniesDetails from "@/models/CompaniesDetails";

export default async function handler(req, res) {
    await dbConnect();

    const { method } = req;

    if (method === "POST") {
        const { userId, company_name, company_email, position, current_location, last_college } = req.body;

        try {
            // Check if the user already exists
            const existingUser = await Users.findById(userId);
            if (!existingUser) {
                return res.status(400).json({ success: false, msg: "User not exists" });
            }

            // Save company details
            const newCompany = new CompaniesDetails({
                company_name,
                company_email,
                position,
                current_location,
                last_college,
                user_id: existingUser._id, // Add user_id to the company details
            });

            const savedCompany = await newCompany.save();

            // Update user with company_id
            existingUser.company_id = savedCompany._id;
            await existingUser.save();

            res.status(201).json({
                success: true, msg: "company details add successfully",
                data: savedCompany,
            });
        } catch (error) {
            res.status(400).json({ success: false, msg: error.message });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}
