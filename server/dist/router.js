"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const express_validator_1 = require("express-validator");
const UserController_1 = __importDefault(require("./controllers/UserController"));
const reviewMiddleware_1 = require("./middleware/reviewMiddleware");
const ReviewController_1 = __importDefault(require("./controllers/ReviewController"));
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
const router = express_1.default.Router();
router.post("/registration", [
    (0, express_validator_1.check)("email", "Email must not be empty").notEmpty(),
    (0, express_validator_1.check)("username", "Username must not be empty").notEmpty(),
    (0, express_validator_1.check)("password", "Password must not be less than 6 symbols").isLength({ min: 6, max: 20 })
], UserController_1.default.createNewUser);
router.post("/login", UserController_1.default.loginNewUser);
router.get("/getUser/:email", UserController_1.default.getUser);
router.get('/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport_1.default.authenticate('google'), UserController_1.default.authCallback);
router.get('/twitter', passport_1.default.authenticate('twitter'));
router.get('/twitter/callback', passport_1.default.authenticate('twitter'), UserController_1.default.authCallback);
router.post("/createReview", upload.single('file'), reviewMiddleware_1.processMovieImage, ReviewController_1.default.createReview);
router.get("/getReviews", ReviewController_1.default.getReviews);
router.delete("/review/:id", ReviewController_1.default.deleteReview);
module.exports = router;
