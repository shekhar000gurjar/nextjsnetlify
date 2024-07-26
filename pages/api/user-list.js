// pages/api/user-list.js

import Users from '@/models/Users';
import dbConnect from '@/lib/mongodb';

export default async function handler(req, res) {
    await dbConnect();

    const { method } = req;

    if (method === 'POST') {
        const { company_name } = req.body;

        try {
            // Check if the email already exists
            const userList = await Users.find({ currentCompanyName: company_name });
            if (!userList) {
                return res.status(400).json({ success: false, msg: 'No user availabe in selected company' });
            }
            return res.status(200).json({ success: true, msg: 'User List', data: userList });
        } catch (error) {
            res.status(500).json({ success: false, msg: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}