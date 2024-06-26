// // lib/sendEmail.js
// import nodemailer from 'nodemailer';

// const sendEmail = async ({ to, subject, text, html }) => {
//     // Create a transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//         host: 'smtp.gmail.com',  // Your SMTP host
//         port: 587,                // Your SMTP port
//         secure: false,            // True for 465, false for other ports
//         auth: {
//             user: 'yogesh@kifwatindia.com',  // Your email
//             pass: 'yogesh@1234'            // Your email password
//         }
//     });

//     // Send mail with defined transport object
//     let info = await transporter.sendMail({
//         from: 'gurjaryogesh6049@gmail.com', // Sender address
//         to: to,                                       // List of receivers
//         subject: subject,                             // Subject line
//         text: text,                                   // Plain text body
//         html: html || text                            // HTML body
//     });

//     console.log('Message sent: %s', info.messageId);
//     return info;
// };

// export default sendEmail;



// // lib/sendEmail.js
// // import sgMail from '@sendgrid/mail';

// // sgMail.setApiKey(process.env.SENDGRID_API_KEY); // Set your API key from environment variables

// // const sendEmail = async ({ to, subject, text, html }) => {
// //     const msg = {
// //         to: to,                              // Recipient
// //         from: 'your-email@example.com',      // Verified sender
// //         subject: subject,
// //         text: text,
// //         html: html || text,
// //     };

// //     try {
// //         await sgMail.send(msg);
// //         console.log('Email sent successfully');
// //     } catch (error) {
// //         console.error('Error sending email:', error);
// //         if (error.response) {
// //             console.error(error.response.body)
// //         }
// //     }
// // };

// // export default sendEmail;


// lib/sendEmail.js
import nodemailer from 'nodemailer';

const sendEmail = async ({ to, subject, text, html }) => {
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
        from: `"Your Name" <${process.env.NEXT_GMAIL_USER}>`, // Sender address
        to: to,                                         // List of receivers
        subject: subject,                               // Subject line
        text: text,                                     // Plain text body
        html: html || text                              // HTML body
    });

    console.log('Message sent: %s', info.messageId);
    return info;
};

export default sendEmail;
