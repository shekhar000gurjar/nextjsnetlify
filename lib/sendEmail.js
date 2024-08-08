// // lib/sendEmail.js
// import nodemailer from 'nodemailer';

// const sendEmail = async ({ to, subject, text, html }) => {
//     // Create a transporter object using Gmail SMTP transport
//     let transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: process.env.NEXT_GMAIL_USER, // Your Gmail address
//             pass: process.env.NEXT_GMAIL_PASS  // Your App Password
//         }
//     });

//     // Send mail with defined transport object
//     let info = await transporter.sendMail({
//         from: `"ReferMyJob" <${process.env.NEXT_GMAIL_USER}>`, // Sender address
//         to: to,                                         // List of receivers
//         subject: subject,                               // Subject line
//         text: text,                                     // Plain text body
//         html: html || text                              // HTML body
//     });

//     console.log('Message sent: %s', info.messageId);
//     return info;
// };

// export default sendEmail;


// lib/sendEmail.js
import nodemailer from 'nodemailer';

const sendEmail = async ({ from, to, subject, text, html }) => {
    // Create a transporter object using Gmail SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.NEXT_GMAIL_USER, // Your Gmail address
            pass: process.env.NEXT_GMAIL_PASS  // Your App Password
        }
    });

    // Send mail with defined transport object
    let info = await transporter.sendMail({
        from: `"ReferMyJob" <${from}>`, // Sender address
        to: to,                         // List of receivers
        subject: subject,               // Subject line
        text: text,                     // Plain text body
        html: html || text              // HTML body
    });

    console.log('Message sent: %s', info.messageId);
    return info;
};

export default sendEmail;
