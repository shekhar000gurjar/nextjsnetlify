// pages/api/userdetails-byid.js

import Users from '@/models/Users';
import dbConnect from '@/lib/mongodb';

export default async function handler(req, res) {
    await dbConnect();

    const { method } = req;

    if (method === 'POST') {
        const { _id } = req.body;

        try {
            // Check if the email already exists
            const user = await Users.findById(_id);
            if (!user) {
                return res.status(400).json({ success: false, msg: 'No user found' });
            }
            return res.status(200).json({ success: true, msg: 'User Details', data: user });
        } catch (error) {
            res.status(500).json({ success: false, msg: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}