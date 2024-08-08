import jwt from 'jsonwebtoken';
import Admin from '@/models/Admin';

export const adminAuthMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, msg: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
        const admin = await Admin.findById(decoded.userId).select('-password');

        if (!admin) {
            return res.status(404).json({ success: false, msg: 'Admin not found' });
        }

        req.admin = admin;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ success: false, msg: 'Token is not valid' });
    }
};
