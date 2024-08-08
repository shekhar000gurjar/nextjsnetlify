// // pages/api/admin/getWaitingRequests.js



// import dbConnect from "@/lib/mongodb";
// import ReferralRequest from '@/models/RefferalRequast';
// import ReferPointsDetails from '@/models/ReferPointsDetails';
// import PointsTransactionsDetails from '@/models/PointsTransactionsDetails';
// import RequestVerification from '@/models/RequestVerification';

// export default async function handler(req, res) {
//     const { method, query } = req;
//     await dbConnect();

//     if (method === "GET") {
//         const { status } = query; // Assume status is passed as a query parameter

//         try {
//             // Fetch all requests and reverse the order to show the latest entry first
//             const requestList = await ReferralRequest.find({ status: status })
//                 .populate('sender_id') // Populate necessary fields
//                 .populate('receiver_id'); // Populate necessary fields

//             const requests = requestList.reverse();

//             return res.status(200).json({
//                 success: true,
//                 msg: `Request details fetched successfully`,
//                 data: requests
//             });
//         } catch (error) {
//             return res.status(500).json({ success: false, msg: error.message });
//         }
//     } else {
//         res.setHeader("Allow", ["GET"]);
//         res.status(405).end(`Method ${method} Not Allowed`);
//     }
// }


import dbConnect from "@/lib/mongodb";
import ReferralRequest from '@/models/RefferalRequast';

export default async function handler(req, res) {
    const { method } = req;
    await dbConnect();

    if (method === "GET") {
        try {
            // Fetch all requests where status is "Waiting" and reverse the order to show the latest entry first
            const requestList = await ReferralRequest.find({ status: 'Waiting' })
                .populate('sender_id') // Populate necessary fields
                .populate('receiver_id'); // Populate necessary fields

            const requests = requestList.reverse();

            return res.status(200).json({
                success: true,
                msg: `Request details fetched successfully`,
                data: requests
            });
        } catch (error) {
            return res.status(500).json({ success: false, msg: error.message });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}
