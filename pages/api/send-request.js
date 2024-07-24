import sendEmail from '@/lib/sendEmail';
import dbConnect from '@/lib/mongodb';
import { PermPhoneMsg } from '@mui/icons-material';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        await dbConnect();
        console.log(req.headers, "reqheaders");
        const { email, vacancy_name, first_name, last_name, job_id, job_link, receiver_first_name } = req.body;

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

    
            <p>Regards,</p>
            <p>RMJ</p>
        </body>
        </html>
    `;
        try {
            await sendEmail({
                to: email,
                subject: `Job Application Request For ${first_name} ${last_name}`,
                text: message
            });

            return res.status(200).json({ msg: 'Email sent.' });
        } catch (error) {
            console.log(error, "error")
            return res.status(500).json({ msg: 'Email could not be sent.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}