import passport from 'passport';
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import User, {IUser} from './models/User';
import {generateAccessToken} from './controllers/UserController';

passport.use(
    <passport.Strategy>new GoogleStrategy(
        {
            clientID: 'YOUR_GOOGLE_CLIENT_ID',
            clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
            callbackURL: 'http://localhost:5000/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({googleId: profile.id});

                if (!user) {
                    if (profile.emails) {
                        user = new User({googleId: profile.id, email: profile.emails[0].value});
                    }
                    await user.save();
                }

                const token = generateAccessToken(user._id, user.roles);
                return done(null, token);
            } catch (error) {
                return done(error);
            }
        }
    )
);
passport.use(
    <passport.Strategy>new TwitterStrategy(
        {
            consumerKey: 'YOUR_TWITTER_CONSUMER_KEY',
            consumerSecret: 'YOUR_TWITTER_CONSUMER_SECRET',
            callbackURL: 'http://localhost:5000/auth/twitter/callback',
        },
        async (token, tokenSecret, profile, done) => {
            try {
                let user = await User.findOne({ twitterId: profile.id });

                if (!user) {
                    // Создайте нового пользователя на основе данных из Twitter
                    user = new User({
                        twitterId: profile.id,
                        email: '', // У Twitter нет email, так что оставьте его пустым или заполните по своему усмотрению
                        // Другие данные пользователя
                    });

                    await user.save();
                }

                // Генерируйте JWT-токен для пользователя
                const token = generateAccessToken(user._id, user.roles);
                return done(null, token);
            } catch (error) {
                return done(error);
            }
        }
    )
);
passport.serializeUser((user: IUser, done) => {
    done(null, user);
});

passport.deserializeUser((user: IUser, done) => {
    done(null, user);
});
