// // pages/api/submitVerification.js
// import nc from 'next-connect';
// import dbConnect from '@/lib/mongodb';
// import RefferalRequast from '@/models/RefferalRequast';
// import RequestVerification from '@/models/RequestVerification';
// import upload from '@/middleware/upload'; // Ensure this path is correct

// const handler = nc({
//     onError: (err, req, res, next) => {
//         console.error(err.stack);
//         res.status(500).json({ success: false, message: "Server error: " + err.message });
//     },
//     onNoMatch: (req, res) => {
//         res.status(405).json({ success: false, message: `Method '${req.method}' Not Allowed` });
//     },
// })
//     .use(upload)  // Apply multer middleware to parse form data
//     .post(async (req, res) => {
//         try {
//             await dbConnect();

//             const { requestId, remark } = req.body;

//             if (!req.files || req.files.length === 0) {
//                 return res.status(400).json({ success: false, message: 'No attachments were uploaded.' });
//             }

//             const request = await RefferalRequast.findById(requestId);
//             if (!request) {
//                 return res.status(404).json({ success: false, message: 'Referral request not found.' });
//             }

//             if (request.status !== 'Accepted') {
//                 return res.status(400).json({ success: false, message: 'Only accepted requests can be verified.' });
//             }

//             const attachments = req.files.map(file => `/uploads/${file.filename}`); // Modify path for database saving

//             const newVerification = new RequestVerification({
//                 request_id: request._id,
//                 attachment: attachments,
//                 remark,
//             });

//             await newVerification.save();

//             request.verification = true;
//             await request.save();

//             res.status(201).json({ success: true, message: 'Verification submitted successfully', data: newVerification });

//         } catch (err) {
//             console.error(err);
//             res.status(500).json({ success: false, message: "Database connection error" });
//         }
//     });

// export default handler;

// export const config = {
//     api: {
//         bodyParser: false,  // Necessary for multer
//     },
// };


// pages/api/submitVerification.js
// import nc from 'next-connect';
// import dbConnect from '@/lib/mongodb';
// import RefferalRequast from '@/models/RefferalRequast';
// import RequestVerification from '@/models/RequestVerification';
// import upload from '@/middleware/upload'; // Ensure this path is correct

// const handler = nc({
//     onError: (err, req, res, next) => {
//         console.error(err.stack);
//         res.status(500).json({ success: false, message: "Server error: " + err.message });
//     },
//     onNoMatch: (req, res) => {
//         res.status(405).json({ success: false, message: `Method '${req.method}' Not Allowed` });
//     },
// })
//     .use(upload)  // Apply multer middleware to parse form data
//     .post(async (req, res) => {
//         try {
//             await dbConnect();

//             const { requestId, remark } = req.body;

//             if (!req.files || req.files.length === 0) {
//                 return res.status(400).json({ success: false, message: 'No attachments were uploaded.' });
//             }

//             const request = await RefferalRequast.findById(requestId);
//             if (!request) {
//                 return res.status(404).json({ success: false, message: 'Referral request not found.' });
//             }

//             if (request.status !== 'Accepted') {
//                 return res.status(400).json({ success: false, message: 'Only accepted requests can be verified.' });
//             }

//             const attachments = req.files.map(file => `/uploads/${file.filename}`); // Modify path for database saving

//             const newVerification = new RequestVerification({
//                 request_id: request._id,
//                 attachment: attachments,
//                 remark,
//             });

//             await newVerification.save();

//             request.verification = true;
//             await request.save();

//             res.status(201).json({ success: true, message: 'Verification submitted successfully', data: newVerification });

//         } catch (err) {
//             console.error(err);
//             res.status(500).json({ success: false, message: "Database connection error" });
//         }
//     });

// export default handler;

// export const config = {
//     api: {
//         bodyParser: false,  // Necessary for multer
//     },
// };

// // pages/api/submitVerification.js
// import nextConnect from 'next-connect';
// import dbConnect from '@/lib/mongodb';
// import RefferalRequast from '@/models/RefferalRequast';
// import RequestVerification from '@/models/RequestVerification';
// import upload from '@/middleware/upload'; // Ensure this path is correct

// const handler = nextConnect({
//     onError: (err, req, res) => {
//         console.error(err.stack);
//         res.status(500).json({ success: false, message: "Server error: " + err.message });
//     },
//     onNoMatch: (req, res) => {
//         res.status(405).json({ success: false, message: `Method '${req.method}' Not Allowed` });
//     },
// })
//     .use(upload)  // Apply multer middleware to parse form data
//     .post(async (req, res) => {
//         try {
//             await dbConnect();

//             const { requestId, remark } = req.body;

//             if (!req.files || req.files.length === 0) {
//                 return res.status(400).json({ success: false, message: 'No attachments were uploaded.' });
//             }

//             const request = await RefferalRequast.findById(requestId);
//             if (!request) {
//                 return res.status(404).json({ success: false, message: 'Referral request not found.' });
//             }

//             if (request.status !== 'Accepted') {
//                 return res.status(400).json({ success: false, message: 'Only accepted requests can be verified.' });
//             }

//             const attachments = req.files.map(file => `/uploads/${file.filename}`); // Modify path for database saving

//             const newVerification = new RequestVerification({
//                 request_id: request._id,
//                 attachment: attachments,
//                 remark,
//             });

//             await newVerification.save();

//             request.verification = true;
//             await request.save();

//             res.status(201).json({ success: true, message: 'Verification submitted successfully', data: newVerification });

//         } catch (err) {
//             console.error(err);
//             res.status(500).json({ success: false, message: "Database connection error" });
//         }
//     });

// export default handler;

// export const config = {
//     api: {
//         bodyParser: false,  // Necessary for multer
//     },
// };


import dbConnect from '@/lib/mongodb';
import RefferalRequast from '@/models/RefferalRequast';
import RequestVerification from '@/models/RequestVerification';
import multer from 'multer';
import path from 'path';

// Configure Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadsDir = path.join(process.cwd(), 'public/uploads');
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        const fileExt = path.extname(file.originalname);
        cb(null, `attachment_${Date.now()}-${Math.round(Math.random() * 1E9)}${fileExt}`);
    }
});

const upload = multer({ storage: storage });

const uploadMiddleware = upload.array('attachments', 5);

export const config = {
    api: {
        bodyParser: false,  // Necessary for multer
    },
};

const runMiddleware = (req, res, fn) => {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    await runMiddleware(req, res, uploadMiddleware);

    try {
        await dbConnect();

        const { requestId, remark } = req.body;

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: 'No attachments were uploaded.' });
        }

        const request = await RefferalRequast.findById(requestId);
        if (!request) {
            return res.status(404).json({ success: false, message: 'Referral request not found.' });
        }

        if (request.status !== 'Accepted') {
            return res.status(400).json({ success: false, message: 'Only accepted requests can be verified.' });
        }

        const attachments = req.files.map(file => `/uploads/${file.filename}`);

        const newVerification = new RequestVerification({
            request_id: request._id,
            attachment: attachments,
            remark,
        });

        await newVerification.save();

        request.verification = true;
        request.status = "Waiting";
        await request.save();

        res.status(201).json({ success: true, message: 'Verification submitted successfully', data: newVerification });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Database connection error" });
    }
}
