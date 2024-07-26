// pages/api/verify-otp.js

import Users from '@/models/Users';
import dbConnect from '@/lib/mongodb';

export default async function handler(req, res) {
    await dbConnect();

    const { method } = req;

    if (method === 'POST') {
        const { email, otp } = req.body;

        try {
            // Check if the email and OTP match
            const user = await Users.findOne({ email, email_otp: otp });
            if (!user) {
                return res.status(400).json({ success: false, msg: 'Invalid OTP' });
            }

            // Mark email as verified
            user.emailVerified = true;
            user.email_otp = '';
            await user.save();

            res.status(200).json({ success: true, msg: 'Email verified successfully' });
        } catch (error) {
            res.status(500).json({ success: false, msg: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}