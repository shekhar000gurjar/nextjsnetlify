import jwt from 'jsonwebtoken';
import Users from '@/models/Users';

export const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, msg: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
        const user = await Users.findById(decoded.userId).select('-password').populate('company_id');

        if (!user) {
            return res.status(404).json({ success: false, msg: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error,"err");
        return res.status(401).json({ success: false, msg: 'Token is not valid' });
    }
};
