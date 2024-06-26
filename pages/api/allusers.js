import dbConnect from "@/lib/mongodb";
import Users from "@/models/Users";

export default async function handler(req, res) {
    const { method } = req;
    await dbConnect();


    if (method === "GET") {
        try {

            const user = await Users.find().populate('company_id');
            if (!user) {
                return res.status(200).json({ success: false, msg: "Users not found", data: [] });
            }
            res.status(200).json({
                success: true,
                msg: "Users details fetched successfully",
                data: user
            });
        } catch (error) {
            res.status(500).json({ success: false, msg: error.message });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

