// import dbConnect from "@/lib/mongodb";
// import Users from "@/models/Users";
// import ReferPointsDetails from "@/models/ReferPointsDetails";
// import PointsTransactionsDetails from "@/models/PointsTransactionsDetails";

// export default async function handler(req, res) {
//     const { method } = req;
//     await dbConnect();

//     if (method === "GET") {
//         try {
//             const user = await Users.findById(_id);
//             if (!user || user.length === 0) {
//                 return res.status(200).json({ success: false, msg: "Users not found", data: [] });
//             }

//             const pointTransaction = await PointsTransactionsDetails.find({ user_id: user._id }).populate('refer_details_id')


//             // res.status(200).json({
//             //     success: true,
//             //     msg: "Users details fetched successfully",
//             //     data: users
//             // });
//         } catch (error) {
//             res.status(500).json({ success: false, msg: error.message });
//         }
//     } else {
//         res.setHeader("Allow", ["GET"]);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// }


// pages/api/user-summary.js
// import dbConnect from "@/lib/mongodb";
// import Users from "@/models/Users";
// import PointsTransactionsDetails from "@/models/PointsTransactionsDetails";
// import ReferPointsDetails from "@/models/ReferPointsDetails";

// export default async function handler(req, res) {
//     const { method, query } = req;
//     await dbConnect();

//     if (method === "GET") {
//         const { userId } = query; // Assume userId is passed as a query parameter

//         if (!userId) {
//             return res.status(400).json({ success: false, msg: "User ID is required" });
//         }

//         try {
//             const user = await Users.findById(userId);

//             if (!user) {
//                 return res.status(404).json({ success: false, msg: "User not found", data: {} });
//             }

//             const pointTransactions = await PointsTransactionsDetails.find({ user_id: user._id }).populate('refer_details_id');

//             // Constructing the user summary
//             const userSummary = {
//                 user: user,
//                 pointTransactions: pointTransactions.map(transaction => ({
//                     id: transaction._id,
//                     referDetailsId: transaction.refer_details_id?._id,
//                     type: transaction.type,
//                     credited: transaction.credited,
//                     debited: transaction.debited,
//                     referPoints: transaction.refer_points,
//                     amount: transaction.amount,
//                     message: transaction.message,
//                     txnId: transaction.TXN_ID,
//                     createdAt: transaction.createdAt,
//                     updatedAt: transaction.updatedAt,
//                     referDetails: transaction.refer_details_id ? {
//                         id: transaction.refer_details_id._id,
//                     } : null,
//                 })),
//             };

//             res.status(200).json({
//                 success: true,
//                 msg: "User details fetched successfully",
//                 data: userSummary,
//             });
//         } catch (error) {
//             res.status(500).json({ success: false, msg: error.message });
//         }
//     } else {
//         res.setHeader("Allow", ["GET", "POST"]);
//         res.status(405).end(`Method ${method} Not Allowed`);
//     }
// }



// pages/api/user-summary.js
import dbConnect from "@/lib/mongodb";
import Users from "@/models/Users";
import PointsTransactionsDetails from "@/models/PointsTransactionsDetails";
import ReferPointsDetails from "@/models/ReferPointsDetails";

export default async function handler(req, res) {
    const { method, query } = req;
    await dbConnect();

    if (method === "GET") {
        const { userId } = query; // Assume userId is passed as a query parameter

        if (!userId) {
            return res.status(400).json({ success: false, msg: "User ID is required" });
        }

        try {
            const user = await Users.findById(userId);

            if (!user) {
                return res.status(404).json({ success: false, msg: "User not found", data: {} });
            }

            let pointTransactions = await PointsTransactionsDetails.find({ user_id: user._id }).populate('refer_details_id');

            // Reverse the order of transactions to show the latest entry first
            pointTransactions = pointTransactions.reverse();

            // Constructing the user summary
            const userSummary = {
                user: user,
                pointTransactions: pointTransactions.map(transaction => ({
                    id: transaction._id,
                    referDetailsId: transaction.refer_details_id?._id,
                    type: transaction.type,
                    credited: transaction.credited,
                    debited: transaction.debited,
                    referPoints: transaction.refer_points,
                    amount: transaction.amount,
                    message: transaction.message,
                    txnId: transaction.TXN_ID,
                    createdAt: transaction.createdAt,
                    updatedAt: transaction.updatedAt,
                    referDetails: transaction.refer_details_id ? {
                        id: transaction.refer_details_id._id,
                    } : null,
                })),
            };

            res.status(200).json({
                success: true,
                msg: "User details fetched successfully",
                data: userSummary,
            });
        } catch (error) {
            res.status(500).json({ success: false, msg: error.message });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}
