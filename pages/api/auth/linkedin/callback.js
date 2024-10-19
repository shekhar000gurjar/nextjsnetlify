// import axios from 'axios';
// import jwt from 'jsonwebtoken';

// export default async function handler(req, res) {
//     const { code } = req.query;
//     if (!code) {
//         return res.status(400).json({ error: 'Code not provided' });
//     }

//     try {
//         // Exchange the code for a token
//         const tokenResponse = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
//             params: {
//                 grant_type: 'authorization_code',
//                 code: code,
//                 redirect_uri: process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI,
//                 client_id: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID,
//                 client_secret: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_SECRET,
//             },
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             }
//         });

//         const { access_token } = tokenResponse.data;
//         // Fetch user's profile data using the access token
//         const profileResponse = await axios.get('https://api.linkedin.com/v2/me', {
//             headers: {
//                 Authorization: `Bearer ${access_token}`
//             }
//         });

//         const userData = profileResponse.data;

//         // You might also want to fetch the email address, which requires a separate API call:
//         const emailResponse = await axios.get('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
//             headers: {
//                 Authorization: `Bearer ${access_token}`
//             }
//         });

//         // Email data extraction depends on your needs, here is a basic example:
//         const userEmail = emailResponse.data.elements[0]['handle~'].emailAddress;

//         // Optionally: Implement user creation or lookup in your database here

//         // Generate your own app-specific JWT or session token
//         const appToken = jwt.sign({ userId: userData.id }, 'your_secret_key');

//         // Return both user data and your app-specific token
//         res.status(200).json({
//             success: true,
//             message: 'Authentication successful',
//             data: {
//                 user: {
//                     id: userData.id,
//                     firstName: userData.localizedFirstName,
//                     lastName: userData.localizedLastName,
//                     email: userEmail,
//                 },
//                 appToken: appToken,
//                 linkedInToken: access_token // You might want to use this token on the client side, depending on your application's requirements.
//             }
//         });
//     } catch (error) {
//         console.error('Authentication with LinkedIn failed:', error);
//         res.status(500).json({ error: 'Failed to authenticate', details: error.message });
//     }
// }

//=================================================================--------------------------

// import axios from "axios";
// import jwt from "jsonwebtoken";

// export default async function handler(req, res) {
//   const { code } = req.query;

//   // Validate that the authorization code is present
//   if (!code) {
//     return res.status(400).json({ error: "Authorization code not provided" });
//   }

//   try {
//     // Exchange the authorization code for an access token
//     const tokenResponse = await axios.post(
//       "https://www.linkedin.com/oauth/v2/accessToken",
//       null,
//       {
//         params: {
//           grant_type: "authorization_code",
//           code: code,
//           redirect_uri: process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI,
//           client_id: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID,
//           client_secret: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_SECRET,
//         },
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//       }
//     );

//     console.log(tokenResponse, "tokenresponse");

//     const { access_token } = tokenResponse.data;

//     // Fetch user profile using access token
//     const profileResponse = await axios.get("https://api.linkedin.com/v2/me", {
//       headers: {
//         Authorization: `Bearer ${access_token}`,
//       },
//     });

//     const userData = profileResponse.data;

//     // Fetch email address
//     const emailResponse = await axios.get(
//       "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))",
//       {
//         headers: {
//           Authorization: `Bearer ${access_token}`,
//         },
//       }
//     );

//     const userEmail =
//       emailResponse.data.elements?.[0]?.["handle~"]?.emailAddress;

//     // Generate a JWT for your app
//     const appToken = jwt.sign(
//       { userId: userData.id, email: userEmail },
//       process.env.JWT_SECRET_KEY, // Ensure this secret is set in .env.local
//       { expiresIn: "1h" } // Token expires in 1 hour
//     );

//     // Return response with user info and tokens
//     res.status(200).json({
//       success: true,
//       message: "Authentication successful",
//       data: {
//         user: {
//           id: userData.id,
//           firstName: userData.localizedFirstName,
//           lastName: userData.localizedLastName,
//           email: userEmail,
//         },
//         appToken: appToken, // Your app's JWT token
//         linkedInToken: access_token, // LinkedIn token (optional to return)
//       },
//     });
//   } catch (error) {
//     console.error("LinkedIn authentication failed:", error.message);
//     res.status(500).json({
//       error: "Authentication with LinkedIn failed",
//       details: error.message,
//     });
//   }
// }

// import axios from "axios";
// import jwt from "jsonwebtoken";

// export default async function handler(req, res) {
//   console.log(req.query, "reqqueary");
//   const { code } = req.query;

//   // Validate that the authorization code is present
//   if (!code) {
//     return res.status(400).json({ error: "Authorization code not provided" });
//   }

//   try {
//     // Exchange the authorization code for an access token
//     const tokenResponse = await axios.post(
//       "https://www.linkedin.com/oauth/v2/accessToken",
//       null,
//       {
//         params: {
//           grant_type: "authorization_code",
//           code: code,
//           redirect_uri: process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI,
//           client_id: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID,
//           client_secret: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_SECRET,
//         },
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//       }
//     );

//     console.log(tokenResponse, "tokenResponse");
//     const { access_token, expires_in } = tokenResponse.data; // Capture token expiry time

//     // Fetch user profile using access token
//     const profileResponse = await axios.get("https://api.linkedin.com/v2/me", {
//       headers: {
//         Authorization: `Bearer ${access_token}`,
//       },
//     });

//     const userData = profileResponse.data;

//     console.log(profileResponse, "profileResponse");
//     // Fetch email address
//     const emailResponse = await axios.get(
//       "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))",
//       {
//         headers: {
//           Authorization: `Bearer ${access_token}`,
//         },
//       }
//     );

//     console.log(emailResponse, "emailResponse");
//     const userEmail =
//       emailResponse.data.elements?.[0]?.["handle~"]?.emailAddress;

//     // Generate a JWT for your app
//     const appToken = jwt.sign(
//       { userId: userData.id, email: userEmail },
//       process.env.JWT_SECRET_KEY, // Ensure this secret is set in .env.local
//       { expiresIn: "1h" } // Token expires in 1 hour
//     );

//     // Return response with user info and tokens
//     res.status(200).json({
//       success: true,
//       message: "Authentication successful",
//       data: {
//         user: {
//           id: userData.id,
//           firstName: userData.localizedFirstName,
//           lastName: userData.localizedLastName,
//           email: userEmail,
//         },
//         appToken: appToken, // Your app's JWT token
//         linkedInToken: access_token, // LinkedIn token (optional to return)
//         linkedInTokenExpiresIn: expires_in, // LinkedIn token expiration time (optional to return)
//       },
//     });
//   } catch (error) {
//     console.error(
//       "LinkedIn authentication failed:",
//       error.response?.data || error.message
//     );
//     res.status(500).json({
//       error: "Authentication with LinkedIn failed",
//       details: error.response?.data || error.message,
//     });
//   }
// }

import axios from "axios";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  console.log(req.query, "reqquery");
  const { code } = req.query;

  // Validate that the authorization code is present
  if (!code) {
    return res.status(400).json({ error: "Authorization code not provided" });
  }

  try {
    // Exchange the authorization code for an access token
    const tokenResponse = await axios.post(
      "https://www.linkedin.com/oauth/v2/accessToken",
      null,
      {
        params: {
          grant_type: "authorization_code",
          code: code,
          redirect_uri: process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI,
          client_id: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID,
          client_secret: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_SECRET,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token } = tokenResponse.data; // Capture the access token

    // Fetch user profile using the access token
    const userInfoResponse = await axios.get(
      "https://api.linkedin.com/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const userData = userInfoResponse.data;

    // Optionally fetch email address (if required)
    // Uncomment this block if you also need the email address
    /*
    const emailResponse = await axios.get(
      "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const userEmail = emailResponse.data.elements?.[0]?.["handle~"]?.emailAddress;
    */

    // Generate a JWT for your app
    const appToken = jwt.sign(
      { userId: userData.id, email: userData.email }, // Adjust according to your data structure
      process.env.NEXT_PUBLIC_JWT_SECRET, // Ensure this secret is set in .env.local
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // Return response with user info and tokens
    res.status(200).json({
      success: true,
      message: "Authentication successful",
      data: {
        user: {
          id: userData.id,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email, // Adjust according to your data structure
        },
        appToken: appToken, // Your app's JWT token
        linkedInToken: access_token, // LinkedIn token (optional to return)
      },
    });
  } catch (error) {
    console.error(
      "LinkedIn authentication failed:",
      error.response?.data || error.message
    );
    res.status(500).json({
      error: "Authentication with LinkedIn failed",
      details: error.response?.data || error.message,
    });
  }
}
