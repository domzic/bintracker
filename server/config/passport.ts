import passport from 'passport';
import passportGoogle, { Profile, VerifyCallback} from 'passport-google-oauth20';
import mongoose from 'mongoose';
import UserService from '../services/UserService';

import User, { IUser } from '../models/User';

const GoogleStrategy = passportGoogle.Strategy;

passport.serializeUser((user: IUser, done) => {
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
        callbackURL: "/auth/google/callback"
    },
    async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
        //const userService = new UserService(User, mongoose);
        /*let user: IUser = await this.userModel.findOne({ email: email });
        if (user) {
          return done(null, user);
        }
        done("User is not registered yet.", user);*/
        User.findOne({ email: profile._json.email }, (err, existingUser) => {
            if (err) { 
                return done(err); 
            }
            if (!existingUser) {
                done("User is not registered", null);
            }
            done(err, existingUser);
        });
    }
  )
);