"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_twitter_1 = require("passport-twitter");
const User_1 = __importDefault(require("./models/User"));
const UserController_1 = require("./controllers/UserController");
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: 'YOUR_GOOGLE_CLIENT_ID',
    clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
    callbackURL: 'http://localhost:5000/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield User_1.default.findOne({ googleId: profile.id });
        if (!user) {
            if (profile.emails) {
                user = new User_1.default({ googleId: profile.id, email: profile.emails[0].value });
            }
            else {
                throw new Error('Email not found in Google profile.');
            }
            yield user.save();
        }
        const token = (0, UserController_1.generateAccessToken)(user._id, user.roles);
        return done(null, token);
    }
    catch (error) {
        return done(new Error('Something went wrong during Google authentication.'));
    }
})));
passport_1.default.use(new passport_twitter_1.Strategy({
    consumerKey: 'YOUR_TWITTER_CONSUMER_KEY',
    consumerSecret: 'YOUR_TWITTER_CONSUMER_SECRET',
    callbackURL: 'http://localhost:5000/auth/twitter/callback',
}, (token, tokenSecret, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield User_1.default.findOne({ twitterId: profile.id });
        if (!user) {
            user = new User_1.default({
                twitterId: profile.id,
                email: '',
            });
            yield user.save();
        }
        const token = (0, UserController_1.generateAccessToken)(user._id, user.roles);
        return done(null, token);
    }
    catch (error) {
        return done(new Error('Something went wrong during Twitter authentication.'));
    }
})));
passport_1.default.serializeUser((user, done) => {
    done(null, user._id);
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(id);
        done(null, user);
    }
    catch (error) {
        done(error, null);
    }
}));
