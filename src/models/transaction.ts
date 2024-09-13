import { Document, model, Schema } from "mongoose";
import { User } from "../types/user";

interface ITransaction extends Document {
  transaction_id: string;
  balance: User[];
}

const transactionSchema = new Schema({
  transaction_id: { type: String, required: true },
  balance: {
    user_id: { type: String },
    amount: { type: Number },
  },
});

const Transaction = model<ITransaction>("Transaction", transactionSchema);
export default Transaction;
