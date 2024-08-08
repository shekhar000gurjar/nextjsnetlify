// // pages/api/admin/allRequests.js
// import dbConnect from "@/lib/mongodb";
// import ReferralRequest from '@/models/RefferalRequast';

// export default async function handler(req, res) {
//     const { method, query } = req;
//     await dbConnect();

//     if (method === "GET") {
//         const { status } = query; // Assume userId is passed as a query parameter

//         try {
//             // Reverse the order of transactions to show the latest entry first

//             const requestList = await ReferralRequest.find({})
//                 .populate('sender_id') // Populate necessary fields
//                 .populate('receiver_id'); // Populate necessary fields

//             const requests = requestList.reverse();

//             if(status){

//             }


//             return res.status(200).json({
//                 success: true,
//                 msg: `Request details fetched successfully`,
//                 data: requests,
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
    const { method, query } = req;
    await dbConnect();

    if (method === "GET") {
        const { status } = query; // Assume status is passed as a query parameter

        try {
            // Fetch all requests and reverse the order to show the latest entry first
            const requestList = await ReferralRequest.find({})
                .populate('sender_id') // Populate necessary fields
                .populate('receiver_id'); // Populate necessary fields

            const requests = requestList.reverse();

            // Calculate total counts for each status
            const totalRequests = requests.length;
            const totalSendRequests = requests.filter(req => req.status === 'Send').length;
            const totalAcceptedRequests = requests.filter(req => req.status === 'Accepted').length;
            const totalApprovedRequests = requests.filter(req => req.status === 'Successful').length;

            // Filter requests based on the status query parameter if provided
            let filteredRequests = requests;
            if (status) {
                filteredRequests = requests.filter(req => req.status === status);
            }

            return res.status(200).json({
                success: true,
                msg: `Request details fetched successfully`,
                data: {
                    totalRequests,
                    totalSendRequests,
                    totalAcceptedRequests,
                    totalApprovedRequests,
                    requests: filteredRequests
                },
            });
        } catch (error) {
            return res.status(500).json({ success: false, msg: error.message });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}
