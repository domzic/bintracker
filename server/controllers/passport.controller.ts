import passport from 'passport';
import passportGoogle, { Profile, VerifyCallback } from 'passport-google-oauth20';

import User, { IUser, IUserRelationships } from '../models/user.model';

const GoogleStrategy = passportGoogle.Strategy;

passport.serializeUser((user: IUserRelationships, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            callbackURL: '/api/auth/google/callback'
        },
        async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
            User.findOne({ email: profile._json.email }, async (error: string, existingUser: IUser) => {
                if (!existingUser) {
                    done('User is unauthorized', null);
                    return;
                }

                if (error) {
                    done(error, null);
                    return;
                }

                if (!existingUser.confirmed) {
                    existingUser.displayName = profile.displayName;
                    existingUser.confirmed = true;
                    existingUser.googleId = profile.id;
                    try {
                        existingUser = await existingUser.update(existingUser);
                    } catch (error) {
                        done(error, existingUser);
                    }
                }
                done(undefined, existingUser);
            });
        }
    )
);
