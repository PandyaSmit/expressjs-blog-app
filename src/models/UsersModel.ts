import mongoose, { Schema } from "mongoose";
import { user_roles_enum } from "../constants/users";

const UsersSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    dob: { type: Date, default: new Date() },
    role: {
      type: String,
      default: user_roles_enum.user,
      required: true,
    },
    created_at: { type: Date, default: new Date() },
    updated_at: { type: Date, default: new Date() },
  },
  { collection: "Users" }
);

const UsersModel = mongoose.model("Users", UsersSchema);

export default UsersModel;
