// pages/api/requests/rejectRequest.js
import dbConnect from "@/lib/mongodb";
import ReferralRequest from '@/models/RefferalRequast';
import ReferPointsDetails from '@/models/ReferPointsDetails';
import PointsTransactionsDetails from '@/models/PointsTransactionsDetails';
import Users from '@/models/Users';
import sendEmail from '@/lib/sendEmail';

export default async function handler(req, res) {
    const { method } = req;
    await dbConnect();

    if (method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }

    const { requestId } = req.body;

    if (!requestId) {
        return res.status(400).json({ success: false, msg: "Request ID is required" });
    }

    try {
        const request = await ReferralRequest.findById(requestId).populate('sender_id').populate('receiver_id');

        if (!request) {
            return res.status(404).json({ success: false, msg: "Referral request not found" });
        }

        // Check if the request status is 'Waiting' or 'Send'
        if (!['Waiting', 'Send'].includes(request.status)) {
            return res.status(400).json({ success: false, msg: `Referral request cannot be rejected as it is currently ${request.status.toLowerCase()}` });
        }

        const sender = request.sender_id;

        // Send email notification to the sender about the rejection
        const message = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email Template</title>
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6;">
                <p>Hi ${sender.first_name},</p>
                <p>Referral request sent to User ${request.receiver_id.first_name} has been rejected. Please try sending to other users. Refer point has been credited back.</p>
                <p>Regards,</p>
                <p>RMJ</p>
            </body>
            </html>
        `;

        const emailInfo = await sendEmail({
            from: process.env.NEXT_GMAIL_USER,
            to: sender.email,
            subject: `Referral Request Rejected`,
            text: message
        });

        // If email is sent successfully, proceed with database updates
        if (emailInfo) {
            // Update the referral request status to 'Rejected'
            request.status = 'Rejected';
            await request.save();

            // Credit back the refer point to the sender
            sender.total_refer_points += 1;
            await sender.save();

            // Create refer points details entry
            const referPointsDetails = new ReferPointsDetails({
                user_id: sender._id,
                type: 'credit',
                credited: true,
                debited: false,
                refer_points: 1,
                message: `Referral request rejected and points credited back`,
                total_refer_points: sender.total_refer_points
            });
            await referPointsDetails.save();

            // Create points transaction entry
            const pointsTransaction = new PointsTransactionsDetails({
                user_id: sender._id,
                refer_details_id: referPointsDetails._id,
                type: 'credit',
                credited: true,
                debited: false,
                refer_points: 1,
                amount: '0',
                message: `Referral request rejected and points credited back`,
                TXN_ID: request._id
            });
            await pointsTransaction.save();

            return res.status(200).json({ success: true, msg: 'Referral request rejected and points credited back' });
        } else {
            return res.status(500).json({ success: false, msg: 'Email could not be sent' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, msg: error.message });
    }
}
