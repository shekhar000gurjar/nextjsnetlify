import jwt from 'jsonwebtoken';
import Users from "@/models/Users";

export async function verifyToken(req, res) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, msg: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
        const user = await Users.findById(decoded.userId);

        if (!user) {
            return res.status(400).json({ success: false, msg: "Not valid user" });
        }

        return user;
    } catch (error) {
        return res.status(400).json({ success: false, msg: 'Token is not valid' });
    }
}
