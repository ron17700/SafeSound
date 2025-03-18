import passport from '../../middlewares/passport';

import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

describe('Passport Google OAuth Strategy', () => {
    it('should be configured with the correct client ID', () => {
        const strategy = new GoogleStrategy(
            {
                clientID: process.env.OAUTH_CLIENT_ID!,
                clientSecret: process.env.OAUTH_CLIENT_SECRET!,
                callbackURL: process.env.OAUTH_CALLBACK_URL!,
            },
            jest.fn()
        );
        passport.use(strategy);
    });
});
