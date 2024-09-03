// import sendEmail from '@/lib/sendEmail';
// import dbConnect from '@/lib/mongodb';
// import { PermPhoneMsg } from '@mui/icons-material';

// export default async function handler(req, res) {
//     if (req.method === 'POST') {
//         await dbConnect();
//         console.log(req.headers, "reqheaders");
//         const { user_id, sender_email, email, vacancy_name, first_name, last_name, job_id, job_link, receiver_first_name } = req.body;

//         const message = `
//         <!DOCTYPE html>
//         <html lang="en">
//         <head>
//             <meta charset="UTF-8">
//             <meta name="viewport" content="width=device-width, initial-scale=1.0">
//             <title>Email Template</title>
//         </head>
//         <body style="font-family: Arial, sans-serif; line-height: 1.6;">
//             <p>Hi ${receiver_first_name},</p>

//             <p>Greetings from ReferMyJob.</p>

//             <p>You’ve received a job refer request from <strong>${first_name} ${last_name}</strong> for <strong>${vacancy_name}</strong> vacancy available in your company.</p>

//             <p>Please accept or reject the request in the application.</p>

//             <p>Job Id :- ${job_id}.</p>

//             <p>Job Link :- ${job_link}.</p>


//             <p>Regards,</p>
//             <p>RMJ</p>
//         </body>
//         </html>
//     `;
//         try {
//             await sendEmail({
//                 from: sender_email,
//                 to: email,
//                 subject: `Job Application Request For ${first_name} ${last_name}`,
//                 text: message
//             });

//             return res.status(200).json({ msg: 'Email sent.' });
//         } catch (error) {
//             console.log(error, "error")
//             return res.status(500).json({ msg: 'Email could not be sent.' });
//         }
//     } else {
//         res.setHeader('Allow', ['POST']);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// }


import sendEmail from '@/lib/sendEmail';
import dbConnect from '@/lib/mongodb';
import ReferralRequest from '@/models/RefferalRequast';
import ReferPointsDetails from '@/models/ReferPointsDetails';
import PointsTransactionsDetails from '@/models/PointsTransactionsDetails';
import User from '@/models/Users'; // Assuming there is a User model
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        await dbConnect();

        const { user_id, sender_id, sender_email, email, vacancy_name, first_name, last_name, job_id, job_link, receiver_first_name } = req.body;

        const message = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Template</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
            <p>Hi ${receiver_first_name},</p>
    
            <p>Greetings from ReferMyJob.</p>
    
            <p>You’ve received a job refer request from <strong>${first_name} ${last_name}</strong> for <strong>${vacancy_name}</strong> vacancy available in your company.</p>
            
            <p>Please accept or reject the request in the application.</p>

            <p>Job Id :- ${job_id}.</p>

            <p>Job Link :- ${job_link}.</p>

           <p>
              <a href="${process.env.NEXT_PUBLIC_API_URL}requests-received" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Accept</a>
              <a href="${process.env.NEXT_PUBLIC_API_URL}requests-received" style="background-color: #f44336; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reject</a>
            </p>

    
            <p>Regards,</p>
            <p>RMJ</p>
        </body>
        </html>
    `;

        try {
            const emailInfo = await sendEmail({
                from: sender_email,
                to: email,
                subject: `Job Application Request For ${first_name} ${last_name}`,
                text: message
            });

            // If email is sent successfully, proceed with database updates
            if (emailInfo) {
                // Deduct 1 refer point from sender
                const sender = await User.findById(user_id);
                if (!sender) {
                    return res.status(404).json({ msg: 'Sender not found.' });
                }
                if (sender.total_refer_points < 1) {
                    return res.status(400).json({ msg: 'Insufficient refer points.' });
                }
                sender.total_refer_points -= 1;
                await sender.save();

                // Create referral request entry
                const referralRequest = new ReferralRequest({
                    sender_id: user_id,
                    receiver_id: sender_id, // Assuming receiver_id is the email
                    request_id: uuidv4(),
                    status: 'Send',
                    vacancy_name: vacancy_name,
                    job_id: job_id,
                    job_link: job_link,
                    refer_points: 1
                });
                await referralRequest.save();

                // Create refer points details entry
                const referPointsDetails = new ReferPointsDetails({
                    user_id: user_id,
                    type: 'debit',
                    credited: false,
                    debited: true,
                    refer_points: 1,
                    message: `Referral request for ${vacancy_name}`,
                    total_refer_points: sender.total_refer_points
                });
                await referPointsDetails.save();

                // Create points transaction entry
                const pointsTransaction = new PointsTransactionsDetails({
                    user_id: user_id,
                    refer_details_id: referPointsDetails._id,
                    type: 'debit',
                    credited: false,
                    debited: true,
                    refer_points: 1,
                    amount: '0',
                    message: `Referral request for ${vacancy_name}`,
                    TXN_ID: uuidv4()
                });
                await pointsTransaction.save();

                return res.status(200).json({ msg: 'Email sent and referral recorded.' });
            }
        } catch (error) {
            console.log(error, "error");
            return res.status(500).json({ msg: 'Email could not be sent.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
