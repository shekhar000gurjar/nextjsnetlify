// // pages/api/admin/getVerificationDetails.js
// import dbConnect from "@/lib/mongodb";
// import ReferralRequest from '@/models/RefferalRequast';
// import RequestVerification from '@/models/RequestVerification';

// export default async function handler(req, res) {
//     const { method, query } = req;
//     await dbConnect();

//     if (method === "GET") {
//         try {
//             const { requestId } = query;
//             if (!requestId) {
//                 return res.status(400).json({ success: false, msg: 'Please Provide the Request Id!' })
//             }
//             // Fetch all requests where status is "Waiting" and reverse the order to show the latest entry first
//             const requestList = await ReferralRequest.findById(requestId)
//                 .populate('sender_id') // Populate necessary fields
//                 .populate('receiver_id'); // Populate necessary fields

//             if (!requestList) {
//                 return res.status(400).json({ success: false, msg: 'Please Provide the Valid Request Id!' })
//             }


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
import RequestVerification from '@/models/RequestVerification';

export default async function handler(req, res) {
    const { method, query } = req;
    await dbConnect();

    if (method === "GET") {
        try {
            const { requestId } = query;
            if (!requestId) {
                return res.status(400).json({ success: false, msg: 'Please Provide the Request Id!' });
            }

            // Fetch the referral request by requestId
            const requestList = await ReferralRequest.findById(requestId)
                .populate('sender_id') // Populate necessary fields
                .populate('receiver_id'); // Populate necessary fields

            if (!requestList) {
                return res.status(400).json({ success: false, msg: 'Invalid Request Id!' });
            }

            // Fetch the verification details for the referral request
            const verificationDetails = await RequestVerification.findOne({ request_id: requestList._id });

            return res.status(200).json({
                success: true,
                msg: `Request and verification details fetched successfully`,
                data: {
                    request: requestList,
                    verification: verificationDetails
                }
            });
        } catch (error) {
            return res.status(500).json({ success: false, msg: error.message });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}
