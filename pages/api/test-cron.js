// File: pages/api/test-cron.js
import dbConnect from "@/lib/mongodb";
import ReferralRequest from "@/models/ReferralRequest";
import dayjs from "dayjs";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ message: `Method ${req.method} Not Allowed` });
  }

  await dbConnect();

  // Schedule a task to run every minute using setInterval
  setInterval(async () => {
    console.log("Running scheduled task...");
    const referralRequests = await ReferralRequest.find({ status: "Send" });
    const now = dayjs();

    referralRequests.forEach(async (request) => {
      const createdTime = dayjs(request.createdAt);
      const hoursDiff = now.diff(createdTime, "hour");

      // Check if 72 hours have passed
      if (hoursDiff >= 72) {
        request.status = "Expired";
        await request.save();
        console.log(`Referral request ${request._id} expired.`);
      }
    });
  }, 60000); // Runs every 1 minute (60000 ms)

  return res.status(200).json({ message: "Test cron job started" });
}
