// pages/api/admin/register.js

import dbConnect from '@/lib/mongodb';
import Admin from '@/models/Admin';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const { first_name, last_name, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ success: false, msg: 'All fields are required' });
    }

    try {
        const existingAdmin = await Admin.findOne({ email });

        if (existingAdmin) {
            return res.status(400).json({ success: false, msg: 'Admin already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = new Admin({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            type: 'admin'
        });

        await newAdmin.save();

        const payload = {
            userId: newAdmin._id,
            email: newAdmin.email,
            type: newAdmin.type
        };

        const token = jwt.sign(payload, process.env.NEXT_PUBLIC_JWT_SECRET, { expiresIn: '1d' });

        res.status(201).json({
            success: true,
            msg: 'Admin registered successfully',
            token,
            admin: {
                first_name: newAdmin.first_name,
                last_name: newAdmin.last_name,
                email: newAdmin.email,
                type: newAdmin.type
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: 'Server error' });
    }
}
