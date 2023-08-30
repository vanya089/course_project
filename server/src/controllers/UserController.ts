import {validationResult} from 'express-validator';
import { ObjectId } from 'mongodb';
import ApiError from '../error/ApiError';
import {Request, Response, NextFunction} from 'express';
import User from "../models/User";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import Role from "../models/Role";
require("dotenv").config();



const generateAccessToken = (id: ObjectId, roles: string[]): string => {
    const payload = { id, roles };
    return jwt.sign(payload, process.env.SECRET_KEY!, { expiresIn: '12h' });
};



class UserController {
    public async createNewUser(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(new ApiError(400, 'Fields must not be empty!'));
            }
            const {email, username, password} = req.body;
            const candidate = await User.findOne({email, username});
            if (!candidate) {
                const userRole = await Role.findOne({value: "USER"});
                if (!userRole) {
                    return next(new ApiError(400, "Role not found"));
                }
                const hashPassword = bcrypt.hashSync(password, 5);
                const user = new User({
                    username,
                    email,
                    password: hashPassword,
                    roles: [userRole.value],

                });
                await user.save();
                return res.status(200).json({message: 'Registration successful'});
            } else {
                return next(new ApiError(400, 'The user is already registered!'));
            }
        } catch (e) {
            return next(new ApiError(500, 'Server error!'));
        }
    }

    public async loginNewUser(req: Request, res: Response, next: NextFunction) {
        try {
            const {username, password} = req.body;
            const user = await User.findOne({username});
            if (!user) {
                return next(new ApiError(400, 'User is not found!'));
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return next(new ApiError(400, 'Password error!'));
            }
            const token = generateAccessToken(user._id, user.roles)
            return res.status(200).json({token});
        } catch (e) {
            return next(new ApiError(400, 'Login failed!'));
        }
    }

    public async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await User.find();
            return res.json(users);
        } catch (e) {
            return next(new ApiError(400, 'Server error!'));
        }
    }


}

export default new UserController();
