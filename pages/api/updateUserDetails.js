// // pages/api/updateUser.js

import dbConnect from "@/lib/mongodb";
import Users from "@/models/Users";
import { verifyToken } from "@/middleware/verifyToken";
import multer from "multer";
import fs from "fs";
import path from "path";

// Ensure the public/uploads directories exist
const ensureDirectoryExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Set up multer storage for file uploads (profile picture and resume)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = "";

    if (file.fieldname === "profilePicture") {
      uploadPath = path.join(process.cwd(), "public/uploads/profile"); // Use absolute path to public folder
    } else if (file.fieldname === "resume") {
      uploadPath = path.join(process.cwd(), "public/uploads/resumes"); // Use absolute path to public folder
    }

    // Ensure the directory exists
    ensureDirectoryExists(uploadPath);

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Multer middleware to handle the file upload
const uploadMiddleware = upload.fields([
  { name: "profilePicture", maxCount: 1 },
  { name: "resume", maxCount: 1 },
]);

export const config = {
  api: {
    bodyParser: false, // Disable body parsing so multer can handle it
  },
};

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;

  if (method === "PUT") {
    // Use the upload middleware
    uploadMiddleware(req, res, async (err) => {
      if (err) {
        console.error("Error in file upload middleware:", err);
        return res.status(500).json({
          success: false,
          msg: "File upload failed",
          error: err.message,
        });
      }

      // Check if files and body data were successfully processed
      console.log(req.body, req.files, "Request Body and Files");

      const {
        first_name,
        last_name,
        currentCompanyName,
        upi_id,
        sector,
        experience,
      } = req.body;
      const { profilePicture, resume } = req.files;

      try {
        // Verify the user's authentication token
        const user = await verifyToken(req, res);
        if (!user) {
          return res.status(401).json({ success: false, msg: "Unauthorized" });
        }

        // Prepare update data object
        let updateData = {};
        if (first_name) updateData.first_name = first_name;
        if (last_name) updateData.last_name = last_name;
        if (currentCompanyName)
          updateData.currentCompanyName = currentCompanyName;
        if (upi_id) updateData.upi_id = upi_id;
        if (sector) updateData.sector = sector;
        if (experience) updateData.experience = experience;

        // Handle profile picture if uploaded
        if (profilePicture) {
          const profilePicturePath = `/uploads/profile/${profilePicture[0].filename}`;
          updateData.profilePicture = profilePicturePath;
        }

        // Handle resume if uploaded
        if (resume) {
          const resumePath = `/uploads/resumes/${resume[0].filename}`;
          updateData.resume = resumePath;
        }

        // Update user data in the database
        const updatedUser = await Users.findByIdAndUpdate(
          user._id,
          { $set: updateData },
          { new: true }
        );

        res.status(200).json({
          success: true,
          msg: "User details updated successfully",
          data: updatedUser,
        });
      } catch (error) {
        console.error("Error updating user details:", error);
        res.status(400).json({ success: false, msg: error.message });
      }
    });
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
