// import mongoose from 'mongoose';

// const refferalRequastSchema = new mongoose.Schema(
//     {
//         sender_id: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Users',
//             required: true
//         },
//         receiver_id: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Users',
//             required: true
//         },
//         request_id: {
//             type: String,
//             required: true
//         },
//         status: {
//             type: String,
//             enum: ['Accept', 'Reject', 'Successfull', 'Expired'],
//         },
//         expireOn: {

//         },
//         isDeleted: {
//             type: Boolean,
//             default: false,
//         },
//     },
//     { timestamps: true }
// );

// export default mongoose.models.RefferalRequast || mongoose.model('RefferalRequast', refferalRequastSchema);


import mongoose from 'mongoose';
import Users from './Users';

const refferalRequastSchema = new mongoose.Schema(
    {
        sender_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true
        },
        receiver_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true
        },
        request_id: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ['Accepted', 'Rejected', 'Successful', 'Expired', 'Waiting', 'Cancled', 'Send'],
        },
        verification: {
            type: Boolean,
            default: false
        },
        vacancy_name: {
            type: String,
            required: true,
            default: ""
        },
        job_id: {
            type: String,
            required: true,
            default: ""
        },
        job_link: {
            type: String,
            required: true,
            default: ""
        },
        expireOn: {
            type: Date,
            required: true,
            default: () => new Date(Date.now() + 72 * 60 * 60 * 1000), // 72 hours from now
        },
        expired: {
            type: Boolean,
            default: false
        },
        comment: {
            type: String,
            default: ""
        },
        refer_points: {
            type: Number,
            default: 0
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

// Middleware to automatically expire the request after 72 hours
refferalRequastSchema.pre('save', function (next) {
    if (!this.expireOn) {
        this.expireOn = new Date(Date.now() + 72 * 60 * 60 * 1000); // 72 hours from now
    }
    next();
});

// Static method to check and update the status of expired requests
refferalRequastSchema.statics.expireRequests = async function () {
    const expiredRequests = await this.find({
        createdAt: { $lt: new Date(Date.now() - 72 * 60 * 60 * 1000) },
        status: { $in: ['Send', 'Accepted', 'Waiting'] }
    }).populate('sender_id').populate('receiver_id');

    for (const request of expiredRequests) {
        request.status = 'Expired';
        request.expired = true;
        await request.save();

        // Return the referral point to the sender
        const sender = request.sender_id;
        sender.total_refer_points += 1;
        await sender.save();

        // Create refer points details entry for the sender
        const referPointsDetails = new ReferPointsDetails({
            user_id: sender._id,
            type: 'credit',
            credited: true,
            debited: false,
            refer_points: 1,
            message: `Referral request expired and points credited back`,
            total_refer_points: sender.total_refer_points
        });
        await referPointsDetails.save();

        // Create points transaction entry for the sender
        const pointsTransaction = new PointsTransactionsDetails({
            user_id: sender._id,
            refer_details_id: referPointsDetails._id,
            type: 'credit',
            credited: true,
            debited: false,
            refer_points: 1,
            amount: '0',
            message: `Referral request expired and points credited back`,
            TXN_ID: request._id
        });
        await pointsTransaction.save();

        // Send email notification to the sender about the expiration
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
                <p>Your referral request has expired. The referral point has been credited back to your account.</p>
                <p>Regards,</p>
                <p>RMJ</p>
            </body>
            </html>
        `;

        await sendEmail({
            from: process.env.NEXT_GMAIL_USER,
            to: sender.email,
            subject: `Referral Request Expired`,
            text: senderMessage
        });

        // Send email notification to the receiver about the expiration
        const receiver = request.receiver_id;
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
                <p>The referral request sent to you has expired. Please check the referral requests in your account for more details.</p>
                <p>Regards,</p>
                <p>RMJ</p>
            </body>
            </html>
        `;

        await sendEmail({
            from: process.env.NEXT_GMAIL_USER,
            to: receiver.email,
            subject: `Referral Request Expired`,
            text: receiverMessage
        });
    }
};


export default mongoose.models.RefferalRequast || mongoose.model('RefferalRequast', refferalRequastSchema);