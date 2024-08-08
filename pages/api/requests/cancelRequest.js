// pages/api/requests/cancelRequest.js
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

    const { requestId, senderId } = req.body;

    if (!requestId || !senderId) {
        return res.status(400).json({ success: false, msg: "Request ID and Sender ID are required" });
    }

    try {
        const request = await ReferralRequest.findById(requestId).populate('sender_id').populate('receiver_id');

        if (!request) {
            return res.status(404).json({ success: false, msg: "Referral request not found" });
        }

        // Check if the request is already canceled or in a final state
        if (['Canceled', 'Rejected', 'Successful', 'Expired'].includes(request.status)) {
            return res.status(400).json({ success: false, msg: `Referral request cannot be canceled as it is currently ${request.status.toLowerCase()}` });
        }

        // Check if the request is within 24 hours of being sent
        const now = new Date();
        const sentTime = new Date(request.createdAt);
        const timeDiff = now - sentTime;

        if (timeDiff > 24 * 60 * 60 * 1000) { // 24 hours in milliseconds
            return res.status(400).json({ success: false, msg: "Referral request can only be canceled within 24 hours of being sent" });
        }

        // Check if the sender is the one making the request
        if (request.sender_id._id.toString() !== senderId) {
            return res.status(403).json({ success: false, msg: "Only the sender can cancel this referral request" });
        }

        // Update the referral request status to 'Canceled'
        request.status = 'Canceled';
        await request.save();

        const sender = request.sender_id;

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
            message: `Referral request canceled and points credited back`,
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
            message: `Referral request canceled and points credited back`,
            TXN_ID: request._id
        });
        await pointsTransaction.save();

        // Send email notification to the sender about the cancellation
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
                <p>Your referral request has been canceled successfully. Refer points have been credited back to your account.</p>
                <p>Regards,</p>
                <p>RMJ</p>
            </body>
            </html>
        `;

        const emailInfo = await sendEmail({
            from: process.env.NEXT_GMAIL_USER,
            to: sender.email,
            subject: `Referral Request Canceled`,
            text: message
        });

        if (emailInfo) {
            return res.status(200).json({ success: true, msg: 'Referral request canceled and email notification sent' });
        } else {
            return res.status(500).json({ success: false, msg: 'Email could not be sent' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, msg: error.message });
    }
}
