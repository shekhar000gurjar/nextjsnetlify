// // pages/api/requests/getRequests.js
// import dbConnect from "@/lib/mongodb";
// import Users from "@/models/Users";
// import ReferralRequest from '@/models/RefferalRequast';


// export default async function handler(req, res) {
//     const { method, query } = req;
//     await dbConnect();

//     if (method === "GET") {
//         const { userId, type } = query; // Assume userId is passed as a query parameter

//         if (!userId) {
//             return res.status(400).json({ success: false, msg: "ID is required" });
//         }

//         try {
//             const user = await Users.findById(userId);

//             if (!user) {
//                 return res.status(404).json({ success: false, msg: "User not found", data: {} });
//             }
//             let request;
//             let requestList;
//             if (type === "sender") {
//                 request = "Send"
//                 requestList = await ReferralRequest.find({ sender_id: user._id }).populate('sender_id').populate('receiver_id');
//             }
//             if (type === "receiver") {
//                 request = "Receive"
//                 requestList = await ReferralRequest.find({ receiver_id: user._id }).populate('sender_id').populate('receiver_id');
//             }
//             // Reverse the order of transactions to show the latest entry first
//             const requests = await requestList.reverse();
//             res.status(200).json({
//                 success: true,
//                 msg: `${request} Request details fetched successfully`,
//                 data: requests,
//             });
//         } catch (error) {
//             res.status(500).json({ success: false, msg: error.message });
//         }
//     } else {
//         res.setHeader("Allow", ["GET"]);
//         res.status(405).end(`Method ${method} Not Allowed`);
//     }
// }


// pages/api/requests/getRequests.js
import dbConnect from "@/lib/mongodb";
import Users from "@/models/Users";
import ReferralRequest from '@/models/RefferalRequast';

export default async function handler(req, res) {
    const { method, query } = req;
    await dbConnect();

    if (method === "GET") {
        const { userId, type } = query; // Assume userId is passed as a query parameter

        if (!userId) {
            return res.status(400).json({ success: false, msg: "ID is required" });
        }

        if (type && !['sender', 'receiver'].includes(type)) {
            return res.status(400).json({ success: false, msg: "Valid type ('sender' or 'receiver') is required" });
        }

        try {
            const user = await Users.findById(userId);

            if (!user) {
                return res.status(404).json({ success: false, msg: "User not found", data: {} });
            }

            let requestList = [];

            if (!type || type === "sender") {
                const sentRequests = await ReferralRequest.find({ sender_id: user._id })
                    .populate('sender_id') // Populate necessary fields
                    .populate('receiver_id'); // Populate necessary fields
                requestList = requestList.concat(sentRequests);
            }

            if (!type || type === "receiver") {
                const receivedRequests = await ReferralRequest.find({ receiver_id: user._id })
                    .populate('sender_id') // Populate necessary fields
                    .populate('receiver_id'); // Populate necessary fields
                requestList = requestList.concat(receivedRequests);
            }

            // Reverse the order of transactions to show the latest entry first
            const requests = requestList.reverse();

            return res.status(200).json({
                success: true,
                msg: `Request details fetched successfully`,
                data: requests,
            });
        } catch (error) {
            return res.status(500).json({ success: false, msg: error.message });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}
