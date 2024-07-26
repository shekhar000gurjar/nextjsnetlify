// pages/api/send-otp.js

import nodemailer from 'nodemailer';
import Users from '@/models/Users';
import dbConnect from '@/lib/mongodb';

export default async function handler(req, res) {
    await dbConnect();

    const { method } = req;

    if (method === 'POST') {
        const { email } = req.body;

        try {
            // Check if the email already exists
            const user = await Users.findOne({ email });
            if (user && user.emailVerified) {
                return res.status(400).json({ success: false, msg: 'Email already registered' });
            }

            // Generate OTP
            const otp = Math.floor(100000 + Math.random() * 900000).toString();

            // Send OTP to user's email
            let transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.NEXT_GMAIL_USER, // Your Gmail address
                    pass: process.env.NEXT_GMAIL_PASS  // Your App Password
                }
            });

            let mailOptions = {
                from: `"ReferMyJob Otp" <${process.env.NEXT_GMAIL_USER}>`, // Sender address
                to: email,
                subject: 'Your OTP Code',
                text: `Your OTP code is ${otp}`,
            };

            await transporter.sendMail(mailOptions);

            // Save OTP to Users collection
            await Users.updateOne({ email }, { email_otp: otp }, { upsert: true });

            res.status(200).json({ success: true, msg: 'OTP sent successfully' });
        } catch (error) {
            res.status(500).json({ success: false, msg: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}