import jwt from 'jsonwebtoken';
import Users from '@/models/Users';
import dbConnect from '@/lib/mongodb';

// export const authMiddleware = async (req, res, next) => {
//     const token = req.headers.authorization?.split(' ')[1];

//     if (!token) {
//         return res.status(401).json({ success: false, msg: 'No token provided' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
//         const user = await Users.findById(decoded.userId).select('-password');

//         if (!user) {
//             return res.status(404).json({ success: false, msg: 'User not found' });
//         }

//         req.user = user;
//         next();
//     } catch (error) {
//         console.log(error, "err");
//         return res.status(401).json({ success: false, msg: 'Token is not valid' });
//     }
// };



export const authMiddleware = async (req, res, next) => {
    try {
        await dbConnect();  // Ensure DB is connected before proceeding

        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, msg: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
        const user = await Users.findById(decoded.userId).select('-password');

        if (!user) {
            return res.status(404).json({ success: false, msg: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Error in authMiddleware:', error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, msg: 'Token has expired' });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, msg: 'Invalid token' });
        }
        if (error.name === 'MongooseError') {
            return res.status(500).json({ success: false, msg: 'Database connection error' });
        }
        return res.status(500).json({ success: false, msg: 'Internal server error' });
    }
};