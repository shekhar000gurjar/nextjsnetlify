// pages/api/add-company.js

import dbConnect from "@/lib/mongodb";
import Users from "@/models/Users";

export default async function handler(req, res) {
    await dbConnect();

    const { method } = req;

    if (method === "POST") {
        const { userId, currentCompanyName, currentCompanyEmail, position, current_location, graduationCollege, postGradCollege, degree, sector } = req.body;

        try {
            // Check if the user exists
            const existingUser = await Users.findById(userId);
            if (!existingUser) {
                return res.status(400).json({ success: false, msg: "User does not exist" });
            }

            // Update user with company details
            existingUser.currentCompanyName = currentCompanyName;
            existingUser.currentCompanyEmail = currentCompanyEmail;
            existingUser.position = position;
            existingUser.current_location = current_location;
            existingUser.graduationCollege = graduationCollege;
            existingUser.postGradCollege = postGradCollege;
            existingUser.degree = degree;
            existingUser.sector = sector;

            await existingUser.save();

            res.status(201).json({
                success: true,
                msg: "Company details added successfully",
                data: {
                    currentCompanyName: existingUser.currentCompanyName,
                    currentCompanyEmail: existingUser.currentCompanyEmail,
                    position: existingUser.position,
                    current_location: existingUser.current_location,
                    graduationCollege: existingUser.graduationCollege,
                    postGradCollege: existingUser.postGradCollege,
                    degree: existingUser.degree,
                    sector: existingUser.sector,
                }
            });
        } catch (error) {
            res.status(400).json({ success: false, msg: error.message });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}
