// import dbConnect from "@/lib/mongodb";
// import Users from "@/models/Users";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// export default async function handler(req, res) {
//   const { method } = req;
//   await dbConnect();

//   if (method === "POST") {
//     const { singup_type, first_name, last_name, email, phone_number } = req.body;
//     if (singup_type !== 'normal') {
//       try {
//         const user = await Users.findOne({ email: req.body.email });
//         if (!user) {
//           // Create new user
//           const newUser = new Users({
//             first_name,
//             last_name,
//             email,
//             phone_number: phone_number || '',
//             singup_type,
//           });

//           const savedUser = await newUser.save();
//           const token = jwt.sign({ userId: savedUser._id }, process.env.NEXT_PUBLIC_JWT_SECRET, {
//             expiresIn: "7d",
//           });
//           return res.status(200).json({
//             success: true,
//             msg: "Login successfully",
//             token: token,
//             data: savedUser,
//           });
//         } else {
//           const token = jwt.sign({ userId: user._id }, process.env.NEXT_PUBLIC_JWT_SECRET, {
//             expiresIn: "7d",
//           });
//           return res.status(200).json({
//             success: true,
//             msg: "Login successfully",
//             token: token,
//             data: user,
//           });
//         }

//       } catch (error) {
//         res.status(500).json({ success: false, msg: error.message });
//       }
//     }
//  else {
//       try {
//         const user = await Users.findOne({ email: req.body.email });
//         if (!user) {
//           return res.status(200).json({ success: false, msg: "User not found" });
//         }
//         const isMatch = await bcrypt.compare(req.body.password, user.password);
//         if (!isMatch) {
//           return res
//             .status(200)
//             .json({ success: false, msg: "Invalid credentials" });
//         }
//         const token = jwt.sign({ userId: user._id }, process.env.NEXT_PUBLIC_JWT_SECRET, {
//           expiresIn: "7d",
//         });

//         res.status(200).json({
//           success: true,
//           msg: "Login successfully",
//           token: token,
//           data: user,
//         });
//       } catch (error) {
//         res.status(500).json({ success: false, msg: error.message });
//       }
//     }
//   } else if (method === "GET") {
//     try {
//       res.status(200).json({ success: true, msg: "connect" });
//     } catch (error) {
//       res.status(500).json({ success: false, msg: error.message });
//     }
//   } else {
//     res.setHeader("Allow", ["POST", "GET"]);
//     res.status(405).end(`Method ${method} Not Allowed`);
//   }
// }


import dbConnect from "@/lib/mongodb";
import Users from "@/models/Users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Helper functions
const generateToken = (userId, email) => {
  return jwt.sign({ userId, email }, process.env.NEXT_PUBLIC_JWT_SECRET, {
    expiresIn: "7d",
  });
};

const createUser = async (userData) => {
  const newUser = new Users(userData);
  await newUser.save();
  return newUser;
};

const authenticateUser = async (email, password) => {
  const user = await Users.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }
  return user;
};

// API handler
export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  if (method === "POST") {
    try {
      const { singup_type, first_name, last_name, email, phone_number, password } = req.body;
      if (singup_type !== 'normal') {
        const user = await Users.findOne({ email });
        const userToReturn = user || await createUser({
          first_name,
          last_name,
          email,
          phone_number: phone_number || '',
          singup_type
        });

        const token = generateToken(userToReturn._id, userToReturn.email);
        res.status(200).json({ success: true, msg: "Login successfully", token, data: userToReturn });

      } else {
        const user = await authenticateUser(email, password);
        const token = generateToken(user._id, user.email);
        res.status(200).json({ success: true, msg: "Login successfully", token, data: user });
      }
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message });
    }
  } else if (method === "GET") {
    res.status(200).json({ success: true, msg: "Connect successful" });
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
