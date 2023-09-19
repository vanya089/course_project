import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    username: string;
    password: string;
    roles: string[];
    twitterId?: string;
    googleId?: string;
}

const UserSchema = new Schema<IUser>({
    email: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    roles: [{ type: String, ref: 'Role' }],
   // twitterId: { type: String, unique: true },
   // googleId: { type: String, unique: true },
});

const User = model<IUser>('User', UserSchema);

export default User;
