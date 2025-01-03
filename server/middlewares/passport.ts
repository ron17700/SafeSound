import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from "dotenv";

dotenv.config();

passport.use(
    <passport.Strategy>new GoogleStrategy(
        {
            clientID: process.env.OAUTH_CLIENT_ID || '',
            clientSecret: process.env.OAUTH_CLIENT_SECRET || '',
            callbackURL: process.env.OAUTH_CALLBACK_URL || '',
        },
        async (accessToken, refreshToken, profile, done) => {
            const user = {
                email: profile.emails?.[0]?.value || '',
                userName: profile.displayName,
                profileImage: profile.photos?.[0].value || '',
            };
            done(null, user);
        }
    )
);

export default passport;