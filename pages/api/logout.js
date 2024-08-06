// pages/api/logout.js

export default async function handler(req, res) {
    const { method } = req;

    if (method === "POST") {
        try {
            // Here you can handle any server-side logout logic if necessary.
            // For example, you could invalidate tokens or log the logout event.

            res.status(200).json({ success: true, msg: "Logout successfully" });
        } catch (error) {
            res.status(500).json({ success: false, msg: error.message });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}
