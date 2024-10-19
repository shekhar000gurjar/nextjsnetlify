// Authentication services for social logins
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase-config";

// Google Authentication
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    console.log(user, "user");
    return { user, token };
  } catch (error) {
    console.log(error);
    return null;
  }
};

// LinkedIn Authentication (Placeholder for custom implementation)
// export const signInWithLinkedIn = () => {
//     const LINKEDIN_URL = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI)}&scope=r_liteprofile%20r_emailaddress`;
//     window.location.href = LINKEDIN_URL;
// };

// Frontend: Trigger LinkedIn login
// export const signInWithLinkedIn = () => {
//   //   const LINKEDIN_URL = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${
//   //     process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID
//   //   }&redirect_uri=${encodeURIComponent(
//   //     process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI
//   //   )}&scope=r_liteprofile%20r_emailaddress%20openid`;

//   const linkedinAuthURL = "https://www.linkedin.com/oauth/v2/authorization";
//   const params = new URLSearchParams({
//     response_type: "code",
//     client_id: "86swg57auhj37a",
//     redirect_uri: "http://localhost:3000/api/auth/linkedin/callback",
//     scope: "openid profile email", // Request basic profile and email addresser OpenID scopes
//     state: "yygyy", // For CSRF protection
//   });

//   const LINKEDIN_URL = `${linkedinAuthURL}?${params.toString()}`;

//   console.log(LINKEDIN_URL, "LINKEDIN_URL");

//   window.location.href = LINKEDIN_URL;
// };

// Frontend: Trigger LinkedIn login
export const signInWithLinkedIn = () => {
  const linkedinAuthURL = "https://www.linkedin.com/oauth/v2/authorization";
  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID, // Use environment variables for security
    redirect_uri: "http://localhost:3000/api/auth/linkedin/callback", // Your callback URL
    scope: "openid profile email", // Request the correct scopes
    state: "yygyy", // For CSRF protection
  });

  const LINKEDIN_URL = `${linkedinAuthURL}?${params.toString()}`;

  console.log(LINKEDIN_URL, "LINKEDIN_URL");

  // Redirect to LinkedIn for authentication
  window.location.href = LINKEDIN_URL;
};
