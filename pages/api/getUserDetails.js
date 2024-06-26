import dbConnect from "@/lib/mongodb";
import { authMiddleware } from "@/middleware/authMiddleware";

const handler = async (req, res) => {
    await dbConnect();

    if (req.method === "GET") {
        try {
            // Since the authMiddleware adds the user to req, you can use it here
            const user = req.user;
            res.status(200).json({
                success: true,
                msg: "User details fetched successfully",
                data: user
            });
        } catch (error) {
            res.status(500).json({ success: false, msg: error.message });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default (req, res) => authMiddleware(req, res, () => handler(req, res));
