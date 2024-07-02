// import dbConnect from "@/lib/mongodb";
// import Users from "@/models/Users";
// import CompaniesDetails from "@/models/CompaniesDetails";
// import jwt from "jsonwebtoken";
// // import { authMiddleware } from "@/middleware/authMiddleware";



// export default async function handler(req, res) {
//     await dbConnect();

//     const { method } = req;

//     if (method === "PUT") {
//         const { company_id, company_name, upi } = req.body;
//         try {

//             const token = req.headers.authorization?.split(' ')[1];

//             if (!token) {
//                 return res.status(401).json({ success: false, msg: 'No token provided' });
//             }

//             const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
//             // Check if the user already exists
//             const existingUser = await Users.findById(decoded.userId);
//             if (!existingUser) {
//                 return res.status(400).json({ success: false, msg: "Not valid user" });
//             }

//             const updateUser = Users.findByIdAndUpdate();

//             const newCompany = CompaniesDetails.findByIdAndUpdate();


//             res.status(200).json({
//                 success: true, msg: "User update successfully",
//             });
//         } catch (error) {
//             res.status(400).json({ success: false, msg: error.message });
//         }
//     } else {
//         res.setHeader("Allow", ["POST"]);
//         res.status(405).end(`Method ${method} Not Allowed`);
//     }
// }


import dbConnect from "@/lib/mongodb";
import Users from "@/models/Users";
import CompaniesDetails from "@/models/CompaniesDetails";
import { verifyToken } from "@/middleware/verifyToken";

export default async function handler(req, res) {
    await dbConnect();

    const { method } = req;

    if (method === "PUT") {
        const { company_id, company_name, upi_id } = req.body;

        try {
            const user = await verifyToken(req, res);
            if (!user) {
                return; // Error response already handled in verifyToken
            }

            // Update UPI ID in Users model
            await Users.findByIdAndUpdate(user._id, { upi_id });

            // Update company details in CompaniesDetails model
            await CompaniesDetails.findByIdAndUpdate(company_id, { company_name });

            res.status(200).json({
                success: true,
                msg: "User and company details updated successfully",
            });
        } catch (error) {
            res.status(400).json({ success: false, msg: error.message });
        }
    } else {
        res.setHeader("Allow", ["PUT"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}
