// // pages/api/updateUser.js

// import dbConnect from "@/lib/mongodb";
// import Users from "@/models/Users";
// import { verifyToken } from "@/middleware/verifyToken";

// export default async function handler(req, res) {
//     await dbConnect();

//     const { method } = req;

//     if (method === "PUT") {
//         const { currentCompanyName, currentCompanyEmail, upi_id } = req.body;

//         try {
//             const user = await verifyToken(req, res);
//             if (!user) {
//                 return; // Error response already handled in verifyToken
//             }

//             // Update UPI ID and company details in Users model
//             const updatedUser = await Users.findByIdAndUpdate(
//                 user._id,
//                 { currentCompanyName, currentCompanyEmail, upi_id },
//                 { new: true }
//             );

//             res.status(200).json({
//                 success: true,
//                 msg: "User details updated successfully",
//                 data: updatedUser
//             });
//         } catch (error) {
//             res.status(400).json({ success: false, msg: error.message });
//         }
//     } else {
//         res.setHeader("Allow", ["PUT"]);
//         res.status(405).end(`Method ${method} Not Allowed`);
//     }
// }


// pages/api/updateUser.js

import dbConnect from "@/lib/mongodb";
import Users from "@/models/Users";
import { verifyToken } from "@/middleware/verifyToken";

export default async function handler(req, res) {
    await dbConnect();

    const { method } = req;

    if (method === "PUT") {
        const { currentCompanyName, upi_id } = req.body;

        try {
            const user = await verifyToken(req, res);
            if (!user) {
                return; // Error response already handled in verifyToken
            }

            // Update UPI ID and company details in Users model
            const updatedUser = await Users.findByIdAndUpdate(
                user._id,
                { currentCompanyName, upi_id },
                { new: true }
            );

            res.status(200).json({
                success: true,
                msg: "User details updated successfully",
                data: updatedUser
            });
        } catch (error) {
            res.status(400).json({ success: false, msg: error.message });
        }
    } else {
        res.setHeader("Allow", ["PUT"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}
