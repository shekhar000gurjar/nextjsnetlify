import dbConnect from '@/lib/mongodb';
import { adminAuthMiddleware } from '@/middleware/adminAuthMiddleware';

const handler = async (req, res) => {
    await dbConnect();

    if (req.method === 'GET') {
        try {
            const admin = req.admin;
            res.status(200).json({
                success: true,
                msg: 'Admin details fetched successfully',
                data: admin
            });
        } catch (error) {
            res.status(500).json({ success: false, msg: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default (req, res) => adminAuthMiddleware(req, res, () => handler(req, res));
