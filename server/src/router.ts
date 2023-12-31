import express from "express";
import passport from 'passport'
import {check} from "express-validator";
import UserController from "./controllers/UserController";
import {authenticateToken} from "./middleware/authMiddleware";
import {processMovieImage} from "./middleware/reviewMiddleware";
import ReviewController from "./controllers/ReviewController";
import multer from "multer";

const upload = multer();

const router = express.Router();

router.post(
    "/registration",
    [
        check("email", "Email must not be empty").notEmpty(),
        check("username", "Username must not be empty").notEmpty(),
        check("password", "Password must not be less than 6 symbols").isLength({min: 6, max: 20})
    ],
    UserController.createNewUser
);
router.post("/login", UserController.loginNewUser);
router.get("/getUser/:email", UserController.getUser);


router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/google/callback', passport.authenticate('google'), UserController.authCallback);

router.get('/twitter', passport.authenticate('twitter'));
router.get('/twitter/callback', passport.authenticate('twitter'), UserController.authCallback);


router.post(
    "/createReview",
    upload.single('file'),
    processMovieImage,
    authenticateToken,
    ReviewController.createReview
);
router.get("/getReviews", ReviewController.getReviews);
router.get("/reviews/search", ReviewController.searchReviews);
router.delete("/review/:id",authenticateToken, ReviewController.deleteReview);

export = router;
