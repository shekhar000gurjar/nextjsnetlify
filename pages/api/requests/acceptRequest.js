// pages/api/requests/acceptRequest.js
import dbConnect from "@/lib/mongodb";
import ReferralRequest from "@/models/RefferalRequast";
import sendEmail from "@/lib/sendEmail";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  if (method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  const { requestId } = req.body;

  if (!requestId) {
    return res
      .status(400)
      .json({ success: false, msg: "Request ID is required" });
  }

  try {
    const request = await ReferralRequest.findById(requestId)
      .populate("sender_id")
      .populate("receiver_id");

    if (!request) {
      return res
        .status(404)
        .json({ success: false, msg: "Referral request not found" });
    }

    // Check if the request is already expired
    if (request.expired || request.expireOn < new Date()) {
      request.status = "Expired";
      request.expired = true;
      await request.save();
      return res
        .status(400)
        .json({ success: false, msg: "Referral request is already expired" });
    }

    // Check if the request status is 'Waiting', 'Send', or 'Canceled'
    if (!["Send", "Cancled"].includes(request.status)) {
      return res.status(400).json({
        success: false,
        msg: `Referral request cannot be accepted as it is currently ${request.status.toLowerCase()}`,
      });
    }

    // Check if the request status is 'Canceled'
    if (request.status === "Cancled") {
      return res.status(400).json({
        success: false,
        msg: "Referral request has already been canceled",
      });
    }

    // Update the referral request status to 'Accepted' and set the expiration date
    request.status = "Accepted";
    request.expireOn = new Date(Date.now() + 72 * 60 * 60 * 1000); // 72 hours from now
    await request.save();

    const sender = request.sender_id;
    const receiver = request.receiver_id;

    // Send email notification to the sender about the acceptance
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
                <p>Your referral request has been accepted by ${receiver.first_name}.</p>
                <p>Regards,</p>
                <p>RMJ</p>
            </body>
            </html>
        `;

    const emailInfo = await sendEmail({
      from: process.env.NEXT_GMAIL_USER,
      to: sender.email,
      subject: `Referral Request Accepted`,
      text: message,
    });

    if (emailInfo) {
      return res.status(200).json({
        success: true,
        msg: "Referral request accepted and email notification sent",
      });
    } else {
      return res
        .status(500)
        .json({ success: false, msg: "Email could not be sent" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
}
