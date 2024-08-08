// // middlewares/upload.js
// import multer from 'multer';
// import path from 'path';

// const storage = multer.diskStorage({
//     // destination: function (req, file, cb) {
//     //     const uploadsDir = path.join(process.cwd(), 'public/uploads');
//     //     cb(null, uploadsDir);
//     // },
//     // filename: function (req, file, cb) {
//     //     const fileExt = path.extname(file.originalname);
//     //     cb(null, `vehicle_${Date.now()}-${Math.round(Math.random() * 1E9)}${fileExt}`);
//     // }
//     destination: function (req, file, cb) {
//         // Correctly resolve the path to your `public/uploads` directory
//         const uploadsDir = path.join(__dirname, '../../../../public/uploads');
//         cb(null, uploadsDir);
//     },
//     filename: function (req, file, cb) {
//         // Generate a unique filename for the uploaded file
//         cb(null, "attechment" + Date.now() + '-' + file.originalname);
//     }
// });

// const upload = multer({ storage: storage }).array('attechment', 5);

// export default upload;


// import multer from 'multer';
// import path from 'path';

// // Storage configuration for multer
// const storage = multer.diskStorage({
//     // Set the destination for uploaded files
//     destination: function (req, file, cb) {
//         const uploadsDir = path.join(process.cwd(), 'public/uploads');
//         cb(null, uploadsDir);
//     },
//     // Set the filename for uploaded files
//     filename: function (req, file, cb) {
//         const fileExt = path.extname(file.originalname);
//         cb(null, `attachment_${Date.now()}-${Math.round(Math.random() * 1E9)}${fileExt}`);
//     }
// });

// // Create the multer instance with the storage configuration
// const upload = multer({ storage: storage }).array('attachment', 5);

// export default upload;

// import multer from 'multer';
// import path from 'path';

// // Storage configuration for multer
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         const uploadsDir = path.join(process.cwd(), 'public/uploads');
//         cb(null, uploadsDir);
//     },
//     filename: function (req, file, cb) {
//         const fileExt = path.extname(file.originalname);
//         cb(null, `attachment_${Date.now()}-${Math.round(Math.random() * 1E9)}${fileExt}`);
//     }
// });

// // Create the multer instance with the storage configuration
// const upload = multer({ storage: storage }).array('attachments', 5);

// export default upload;


import multer from 'multer';
import path from 'path';

// Storage configuration for multer
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

export default upload;

