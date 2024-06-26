import axios from 'axios';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    const { code } = req.query;
    if (!code) {
        return res.status(400).json({ error: 'Code not provided' });
    }

    try {
        // Exchange the code for a token
        const tokenResponse = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
            params: {
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: process.env.NEXT_LINKEDIN_REDIRECT_URI,
                client_id: process.env.NEXT_LINKEDIN_CLIENT_ID,
                client_secret: process.env.NEXT_LINKEDIN_CLIENT_SECRET,
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const { access_token } = tokenResponse.data;
        // Fetch user's profile data using the access token
        const profileResponse = await axios.get('https://api.linkedin.com/v2/me', {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });

        const userData = profileResponse.data;

        // You might also want to fetch the email address, which requires a separate API call:
        const emailResponse = await axios.get('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });

        // Email data extraction depends on your needs, here is a basic example:
        const userEmail = emailResponse.data.elements[0]['handle~'].emailAddress;

        // Optionally: Implement user creation or lookup in your database here

        // Generate your own app-specific JWT or session token
        const appToken = jwt.sign({ userId: userData.id }, 'your_secret_key');

        // Return both user data and your app-specific token
        res.status(200).json({
            success: true,
            message: 'Authentication successful',
            data: {
                user: {
                    id: userData.id,
                    firstName: userData.localizedFirstName,
                    lastName: userData.localizedLastName,
                    email: userEmail,
                },
                appToken: appToken,
                linkedInToken: access_token // You might want to use this token on the client side, depending on your application's requirements.
            }
        });
    } catch (error) {
        console.error('Authentication with LinkedIn failed:', error);
        res.status(500).json({ error: 'Failed to authenticate', details: error.message });
    }
}
