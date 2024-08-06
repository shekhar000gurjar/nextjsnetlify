// pages/api/forgot-password.js
import Users from '@/models/Users';
import sendEmail from '@/lib/sendEmail';
import dbConnect from '@/lib/mongodb';
import cryptoRandomString from 'crypto-random-string';


// export default async function handler(req, res) {
//     if (req.method === 'POST') {
//         await dbConnect();

//         const { email } = req.body;
//         const user = await Users.findOne({ email });

//         if (!user) {
//             return res.status(404).json({ message: 'No user found with this email.' });
//         }

//         const token = crypto.randomBytes(32).toString('hex');
//         user.resetPasswordToken = token;
//         user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
//         await user.save();

//         const resetUrl = `${req.headers.origin}/reset-password?token=${token}`;

//         const message = `
//             <h1>You have requested a password reset</h1>
//             <p>Please go to this link to reset your password:</p>
//             <a href="${resetUrl}" target="_blank">${resetUrl}</a>
//         `;

//         try {
//             await sendEmail({
//                 to: user.email,
//                 subject: 'Password Reset Link',
//                 text: message
//             });

//             res.status(200).json({ message: 'Email sent.' });
//         } catch (error) {
//             console.log(error, "error")
//             user.resetPasswordToken = undefined;
//             user.resetPasswordExpires = undefined;
//             await user.save();
//             return res.status(500).json({ message: 'Email could not be sent.' });
//         }
//     } else {
//         res.setHeader('Allow', ['POST']);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// }


export default async function handler(req, res) {
    if (req.method === 'POST') {
        await dbConnect();
        console.log(req.headers, "reqheaders");
        const { email } = req.body;
        const user = await Users.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'No user found with this email.' });
        }

        // Generate a secure random token
        const resetToken = cryptoRandomString({ length: 32, type: 'url-safe' });
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        const resetUrl = `http://${req.headers.host}/resetPassword?token=${resetToken}`; // change the req.headers.host to req.headers.origin to live server

        const message = `
            <h1>You have requested a password reset</h1>
            <p>Please go to this link to reset your password:</p>
            <a href="${resetUrl}" target="_blank">${resetUrl}</a>
        `;

        try {
            await sendEmail({
                to: user.email,
                subject: 'Password Reset Link',
                text: message
            });

            res.status(200).json({ message: 'Email Sent Successfully.' });
        } catch (error) {
            console.log(error, "error")
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save();
            return res.status(500).json({ message: 'Email could not be sent.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}