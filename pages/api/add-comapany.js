// pages/api/add-company.js

// import dbConnect from "@/lib/mongodb";
// import Users from "@/models/Users";
// import ReferPointsDetails from "@/models/ReferPointsDetails";
// import PointsTransactionsDetails from "@/models/PointsTransactionsDetails";

// export default async function handler(req, res) {
//   await dbConnect();

//   const { method } = req;

//   if (method === "POST") {
//     const {
//       userId,
//       currentCompanyName,
//       currentCompanyEmail,
//       position,
//       current_location,
//       graduationCollege,
//       postGradCollege,
//       degree,
//       sector,
//       graduationPassingYear,
//       postGradPassingYear,
//       phone_number,
//     } = req.body;

//     try {
//       // Check if the user exists
//       const existingUser = await Users.findById(userId);
//       if (!existingUser) {
//         return res
//           .status(400)
//           .json({ success: false, msg: "User does not exist" });
//       }

//       // Update user with company details
//       existingUser.currentCompanyName = currentCompanyName;
//       existingUser.currentCompanyEmail = currentCompanyEmail;
//       existingUser.position = position;
//       existingUser.current_location = current_location;
//       existingUser.graduationCollege = graduationCollege;
//       existingUser.graduationPassingYear = graduationPassingYear;
//       existingUser.postGradPassingYear = postGradPassingYear;
//       existingUser.postGradCollege = postGradCollege;
//       existingUser.degree = degree;
//       existingUser.sector = sector;
//       existingUser.phone_number = phone_number;
//       existingUser.registration = true;
//       existingUser.total_refer_points = 2; // Credit initial refer points

//       const savedUser = await existingUser.save();

//       // Create a refer points detail record
//       const referPointsDetails = new ReferPointsDetails({
//         user_id: savedUser._id,
//         type: "credit",
//         credited: true,
//         debited: false,
//         refer_points: 2,
//         message: "Initial refer points credited",
//         total_refer_points: 2,
//       });

//       const savedReferPointsDetails = await referPointsDetails.save();

//       // Create a points transaction detail record
//       const pointsTransactionDetails = new PointsTransactionsDetails({
//         user_id: savedUser._id,
//         refer_details_id: savedReferPointsDetails._id,
//         type: "credit",
//         credited: true,
//         debited: false,
//         refer_points: 2,
//         TXN_ID: uuidv4(), // Generate unique transaction ID
//         message: "Initial refer points credited",
//       });

//       await pointsTransactionDetails.save();

//       res.status(201).json({
//         success: true,
//         msg: "User details added successfully",
//       });
//     } catch (error) {
//       res.status(400).json({ success: false, msg: error.message });
//     }
//   } else {
//     res.setHeader("Allow", ["POST"]);
//     res.status(405).end(`Method ${method} Not Allowed`);
//   }
// }

// import dbConnect from "@/lib/mongodb";
// import Users from "@/models/Users";
// import ReferPointsDetails from "@/models/ReferPointsDetails";
// import PointsTransactionsDetails from "@/models/PointsTransactionsDetails";
// import { v4 as uuidv4 } from "uuid";

// export default async function handler(req, res) {
//   await dbConnect();

//   const { method } = req;

//   if (method !== "POST") {
//     res.setHeader("Allow", ["POST"]);
//     return res.status(405).end(`Method ${method} Not Allowed`);
//   }

//   const {
//     userId,
//     currentCompanyName,
//     currentCompanyEmail,
//     position,
//     current_location,
//     graduationCollege,
//     postGradCollege,
//     degree,
//     sector,
//     graduationPassingYear,
//     postGradPassingYear,
//     phone_number,
//   } = req.body;

//   try {
//     // Check if the user exists
//     const existingUser = await Users.findById(userId);
//     if (!existingUser) {
//       return res
//         .status(400)
//         .json({ success: false, msg: "User does not exist" });
//     }

//     // Update user details
//     Object.assign(existingUser, {
//       currentCompanyName,
//       currentCompanyEmail,
//       position,
//       current_location,
//       graduationCollege,
//       graduationPassingYear,
//       postGradCollege,
//       postGradPassingYear,
//       degree,
//       sector,
//       phone_number,
//       registration: true,
//       total_refer_points: 2, // Credit initial refer points
//     });

//     const savedUser = await existingUser.save();

//     // Create refer points details record
//     const referPointsDetails = await ReferPointsDetails.create({
//       user_id: savedUser._id,
//       type: "credit",
//       credited: true,
//       debited: false,
//       refer_points: 2,
//       message: "Initial refer points credited",
//       total_refer_points: 2,
//     });

//     // Create points transaction details record
//     await PointsTransactionsDetails.create({
//       user_id: savedUser._id,
//       refer_details_id: referPointsDetails._id,
//       type: "credit",
//       credited: true,
//       debited: false,
//       refer_points: 2,
//       TXN_ID: uuidv4(), // Generate unique transaction ID
//       message: "Initial refer points credited",
//     });

//     res.status(201).json({
//       success: true,
//       msg: "User details added successfully",
//     });
//   } catch (error) {
//     res.status(400).json({ success: false, msg: error.message });
//   }
// }
// import dbConnect from "@/lib/mongodb";
// import Users from "@/models/Users";
// import ReferPointsDetails from "@/models/ReferPointsDetails";
// import PointsTransactionsDetails from "@/models/PointsTransactionsDetails";
// import { v4 as uuidv4 } from "uuid";
// import multer from "multer";
// import nextConnect from "next-connect";

// // Multer configuration to handle PDF uploads
// const upload = multer({
//   storage: multer.diskStorage({
//     destination: "./public/uploads/resumes", // Store files in a specific folder
//     filename: (req, file, cb) => {
//       cb(null, `${Date.now()}-${file.originalname}`);
//     },
//   }),
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype !== "application/pdf") {
//       return cb(new Error("Only PDFs are allowed!"), false);
//     }
//     cb(null, true);
//   },
// });

// // Handler to support both file uploads and normal JSON data
// const handler = nextConnect();
// handler.use(upload.single("resume")); // Expect a single file upload with the key "resume"

// handler.post(async (req, res) => {
//   await dbConnect();

//   const {
//     userId,
//     currentCompanyName,
//     currentCompanyEmail,
//     position,
//     current_location,
//     graduationCollege,
//     postGradCollege,
//     degree,
//     sector,
//     graduationPassingYear,
//     postGradPassingYear,
//     phone_number,
//   } = req.body;

//   try {
//     // Check if the user exists
//     const existingUser = await Users.findById(userId);
//     if (!existingUser) {
//       return res
//         .status(400)
//         .json({ success: false, msg: "User does not exist" });
//     }

//     // Save resume if uploaded
//     const resumePath = req.file
//       ? `/uploads/resumes/${req.file.filename}`
//       : existingUser.resume;

//     // Update user details
//     Object.assign(existingUser, {
//       currentCompanyName,
//       currentCompanyEmail,
//       position,
//       current_location,
//       graduationCollege,
//       graduationPassingYear,
//       postGradCollege,
//       postGradPassingYear,
//       degree,
//       sector,
//       phone_number,
//       resume: resumePath, // Store the resume file path
//       registration: true,
//       total_refer_points: 2, // Credit initial refer points
//     });

//     const savedUser = await existingUser.save();

//     // Create refer points details record
//     const referPointsDetails = await ReferPointsDetails.create({
//       user_id: savedUser._id,
//       type: "credit",
//       credited: true,
//       debited: false,
//       refer_points: 2,
//       message: "Initial refer points credited",
//       total_refer_points: 2,
//     });

//     // Create points transaction details record
//     await PointsTransactionsDetails.create({
//       user_id: savedUser._id,
//       refer_details_id: referPointsDetails._id,
//       type: "credit",
//       credited: true,
//       debited: false,
//       refer_points: 2,
//       TXN_ID: uuidv4(), // Generate unique transaction ID
//       message: "Initial refer points credited",
//     });

//     res.status(201).json({
//       success: true,
//       msg: "User details and resume added successfully",
//     });
//   } catch (error) {
//     res.status(400).json({ success: false, msg: error.message });
//   }
// });

// export const config = {
//   api: {
//     bodyParser: false, // Disables the default bodyParser to let multer handle multipart/form-data
//   },
// };

// export default handler;

import dbConnect from "@/lib/mongodb";
import Users from "@/models/Users";
import ReferPointsDetails from "@/models/ReferPointsDetails";
import PointsTransactionsDetails from "@/models/PointsTransactionsDetails";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import nextConnect from "next-connect";

// Multer configuration to handle PDF uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads/resumes", // Store files in a specific folder
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed"), false);
    }
    cb(null, true);
  },
});

// nextConnect to support both middleware and route handling
const handler = nextConnect();

// Use multer middleware to handle single file upload for "resume"
handler.use(upload.single("resume"));

// Handle only POST requests
handler.post(async (req, res) => {
  await dbConnect();

  const {
    userId,
    currentCompanyName,
    currentCompanyEmail,
    position,
    current_location,
    graduationCollege,
    postGradCollege,
    degree,
    sector,
    experience,
    graduationPassingYear,
    postGradPassingYear,
    phone_number,
  } = req.body;

  try {
    // Check if the user exists
    const existingUser = await Users.findById(userId);
    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, msg: "User does not exist" });
    }

    // Save resume path if a file is uploaded
    const resumePath = req.file
      ? `/uploads/resumes/${req.file.filename}`
      : existingUser.resume;

    // Update user details
    Object.assign(existingUser, {
      currentCompanyName,
      currentCompanyEmail,
      position,
      current_location,
      graduationCollege,
      graduationPassingYear,
      postGradCollege,
      postGradPassingYear,
      experience,
      degree,
      sector,
      phone_number,
      resume: resumePath, // Store the resume file path
      registration: true,
      total_refer_points: 2, // Credit initial refer points
    });

    // Save updated user data
    const savedUser = await existingUser.save();

    // Create refer points details record
    const referPointsDetails = await ReferPointsDetails.create({
      user_id: savedUser._id,
      type: "credit",
      credited: true,
      debited: false,
      refer_points: 2,
      message: "Initial refer points credited",
      total_refer_points: 2,
    });

    // Create points transaction details record
    await PointsTransactionsDetails.create({
      user_id: savedUser._id,
      refer_details_id: referPointsDetails._id,
      type: "credit",
      credited: true,
      debited: false,
      refer_points: 2,
      TXN_ID: uuidv4(), // Generate unique transaction ID
      message: "Initial refer points credited",
    });

    // Send success response
    res.status(201).json({
      success: true,
      msg: "User details and resume added successfully",
    });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(400).json({ success: false, msg: error.message });
  }
});

// Handle unsupported HTTP methods
handler.all((req, res) => {
  res.setHeader("Allow", ["POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
});

// Config to disable default body parser for Multer to handle multipart form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
