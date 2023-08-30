import {Schema, model} from 'mongoose';


export interface IUser extends Document {
    email: string;
    username: string;
    password: string;
    roles: string[];
}

const UserSchema = new Schema<IUser>({
    email: {type: String, unique: true, required: true},
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    roles: [{type: String, ref: 'Role'}],
});

const User = model<IUser>('User', UserSchema);

export default User;