import passport from 'passport';
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import User from './models/User';
import {generateAccessToken} from './controllers/UserController';


passport.use(
    new GoogleStrategy(
        {
            clientID: 'YOUR_GOOGLE_CLIENT_ID',
            clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
            callbackURL: 'http://localhost:5000/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ googleId: profile.id });

                if (!user) {
                    if (profile.emails) {
                        user = new User({ googleId: profile.id, email: profile.emails[0].value });
                    } else {
                        throw new Error('Email not found in Google profile.');
                    }
                    await user.save();
                }

                const token = generateAccessToken(user._id, user.roles);
                return done(null, token);
            } catch (error) {
                return done(new Error('Something went wrong during Google authentication.'));
            }
        }
    )
);


passport.use(
    new TwitterStrategy(
        {
            consumerKey: 'YOUR_TWITTER_CONSUMER_KEY',
            consumerSecret: 'YOUR_TWITTER_CONSUMER_SECRET',
            callbackURL: 'http://localhost:5000/auth/twitter/callback',
        },
        async (token, tokenSecret, profile, done) => {
            try {
                let user = await User.findOne({ twitterId: profile.id });

                if (!user) {
                    user = new User({
                        twitterId: profile.id,
                        email: '',
                    });

                    await user.save();
                }

                const token = generateAccessToken(user._id, user.roles);
                return done(null, token);
            } catch (error) {
                return done(new Error('Something went wrong during Twitter authentication.'));
            }
        }
    )
);

passport.serializeUser((user: any, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});






