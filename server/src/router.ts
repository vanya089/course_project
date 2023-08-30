import express from "express";
import {check} from "express-validator";
import UserController from "./controllers/UserController";
import {authenticateToken} from "./middleware/authMiddleware";
import {processMovieImage} from "./middleware/movieMiddleware";
import MovieController from "./controllers/MovieController";

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
router.get("/getUsers", authenticateToken, UserController.getUsers);

router.post(
    "/movies",
    authenticateToken,
    processMovieImage,
    MovieController.createMovie
);
router.get("/movies", authenticateToken, MovieController.getMovies);
router.delete("/movies/:id", authenticateToken, MovieController.deleteMovie);

export = router;
