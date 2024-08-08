// pages/api/admin/acceptRequest.js
import dbConnect from "@/lib/mongodb";
import ReferralRequest from '@/models/RefferalRequast';
import ReferPointsDetails from '@/models/ReferPointsDetails';
import PointsTransactionsDetails from '@/models/PointsTransactionsDetails';
import RequestVerification from '@/models/RequestVerification';
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

        // Check if the request status is 'Waiting'
        if (request.status !== 'Waiting') {
            return res.status(400).json({ success: false, msg: `Referral request cannot be accepted as it is currently ${request.status.toLowerCase()}` });
        }

        const sender = request.sender_id;
        const receiver = request.receiver_id;

        // Send email notification to the receiver about the acceptance
        const receiverMessage = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email Template</title>
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6;">
                <p>Hi ${receiver.first_name},</p>
                <p>Verification complete. Refer point credited. Thank you for your efforts.</p>
                <p>Regards,</p>
                <p>RMJ</p>
            </body>
            </html>
        `;

        const receiverEmailInfo = await sendEmail({
            from: process.env.NEXT_GMAIL_USER,
            to: receiver.email,
            subject: `Verification Complete`,
            text: receiverMessage
        });

        // Send email notification to the sender about the successful submission
        const senderMessage = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email Template</title>
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6;">
                <p>Hi ${sender.first_name},</p>
                <p>Your referral has been successfully submitted by User ${receiver.first_name}.</p>
                <p>Regards,</p>
                <p>RMJ</p>
            </body>
            </html>
        `;

        const senderEmailInfo = await sendEmail({
            from: process.env.NEXT_GMAIL_USER,
            to: sender.email,
            subject: `Referral Successfully Submitted`,
            text: senderMessage
        });

        // If emails are sent successfully, proceed with database updates
        if (receiverEmailInfo && senderEmailInfo) {
            // Update the referral request status to 'Successful' and set verification to true
            request.status = 'Successful';
            request.verification = true;
            await request.save();

            // Update the verification entry in the RequestVerification table
            const verificationEntry = await RequestVerification.findOne({ request_id: requestId });
            if (verificationEntry) {
                verificationEntry.verified = true;
                await verificationEntry.save();
            }

            // Credit one refer point to the receiver
            receiver.total_refer_points += 1;
            await receiver.save();

            // Create refer points details entry for the receiver
            const referPointsDetails = new ReferPointsDetails({
                user_id: receiver._id,
                type: 'credit',
                credited: true,
                debited: false,
                refer_points: 1,
                message: `Verification complete and points credited`,
                total_refer_points: receiver.total_refer_points
            });
            await referPointsDetails.save();

            // Create points transaction entry for the receiver
            const pointsTransaction = new PointsTransactionsDetails({
                user_id: receiver._id,
                refer_details_id: referPointsDetails._id,
                type: 'credit',
                credited: true,
                debited: false,
                refer_points: 1,
                amount: '0',
                message: `Verification complete and points credited`,
                TXN_ID: request._id
            });
            await pointsTransaction.save();

            return res.status(200).json({ success: true, msg: 'Referral request accepted and points credited' });
        } else {
            return res.status(500).json({ success: false, msg: 'Emails could not be sent' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, msg: error.message });
    }
}

