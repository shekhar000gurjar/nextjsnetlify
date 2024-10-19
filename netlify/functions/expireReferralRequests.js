// netlify/functions/expireReferralRequests.js

import dbConnect from "../../lib/mongodb";
import ReferralRequest from "@/models/RefferalRequast";
import User from "@/models/Users";
import ReferPointsDetails from "@/models/ReferPointsDetails";
import PointsTransactionsDetails from "@/models/PointsTransactionsDetails";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

export const handler = async (event, context) => {
  try {
    await dbConnect();

    const referralRequests = await ReferralRequest.find({ status: "Send" });

    const now = dayjs();
    let expiredCount = 0;

    for (const request of referralRequests) {
      const createdTime = dayjs(request.createdAt);
      const hoursDiff = now.diff(createdTime, "hour");

      if (hoursDiff >= 72) {
        const sender = await User.findById(request.sender_id);
        if (!sender) continue;

        request.status = "Expired";
        await request.save();

        sender.total_refer_points += 1;
        await sender.save();

        const referPointsDetails = new ReferPointsDetails({
          user_id: request.sender_id,
          type: "credit",
          credited: true,
          debited: false,
          refer_points: 1,
          message: `Referral request for ${request.vacancy_name} expired.`,
          total_refer_points: sender.total_refer_points,
        });
        await referPointsDetails.save();

        const pointsTransaction = new PointsTransactionsDetails({
          user_id: request.sender_id,
          refer_details_id: referPointsDetails._id,
          type: "credit",
          credited: true,
          debited: false,
          refer_points: 1,
          amount: "0",
          message: `Referral request for ${request.vacancy_name} expired.`,
          TXN_ID: uuidv4(),
        });
        await pointsTransaction.save();

        expiredCount++;
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `${expiredCount} referral requests expired and points refunded.`,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error expiring referral requests" }),
    };
  }
};
