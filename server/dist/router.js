"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const UserController_1 = __importDefault(require("./controllers/UserController"));
const authMiddleware_1 = require("./middleware/authMiddleware");
const movieMiddleware_1 = require("./middleware/movieMiddleware");
const MovieController_1 = __importDefault(require("./controllers/MovieController"));
const router = express_1.default.Router();
router.post("/registration", [
    (0, express_validator_1.check)("email", "Email must not be empty").notEmpty(),
    (0, express_validator_1.check)("username", "Username must not be empty").notEmpty(),
    (0, express_validator_1.check)("password", "Password must not be less than 6 symbols").isLength({ min: 6, max: 20 })
], UserController_1.default.createNewUser);
router.post("/login", UserController_1.default.loginNewUser);
router.get("/getUsers", authMiddleware_1.authenticateToken, UserController_1.default.getUsers);
router.post("/movies", authMiddleware_1.authenticateToken, movieMiddleware_1.processMovieImage, MovieController_1.default.createMovie);
router.get("/movies", authMiddleware_1.authenticateToken, MovieController_1.default.getMovies);
router.delete("/movies/:id", authMiddleware_1.authenticateToken, MovieController_1.default.deleteMovie);
module.exports = router;
