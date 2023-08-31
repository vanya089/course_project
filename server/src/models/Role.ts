import { Schema, model} from "mongoose";

interface IRole extends Document {
    value: string;
}

const RoleSchema = new Schema<IRole>({
    value: { type: String, unique: true, default: "USER" }
});

const Role = model<IRole>('Role', RoleSchema);

export default Role;