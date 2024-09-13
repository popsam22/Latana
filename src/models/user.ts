import { Document, model, Schema } from "mongoose";

interface IUser extends Document {
  user_id: string;
  amount: number;
}

const userSchema = new Schema({
  user_id: { type: String, required: true },
  amount: { type: Number, required: true },
});

const Users = model<IUser>("User", userSchema);
export default Users;
