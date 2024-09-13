import { Request, Response } from "express";
import Transaction from "../models/transaction";
import { TransactionDTO } from "../dtos/trsanction.dto";
import crypto from "crypto";

export async function calculate_balances(
  req: Request<{}, {}, TransactionDTO>,
  res: Response
) {
  const transaction_id = crypto.randomUUID();
  const { users } = req.body;
  if (!users || !Array.isArray(users)) {
    return res.status(400).json({ error: "Cannot find list of transactions" });
  }
  try {
    const transaction = users.reduce((balance, user) => {
      const userExists = balance.find((u) => u.user_id === user.user_id);
      if (userExists) {
        userExists.amount += user.amount;
      } else {
        balance.push({ ...user });
      }
      return balance;
    }, [] as { user_id: string; amount: number }[]);

    const user_balance = transaction.reduce((acc, user) => {
      acc[user.user_id] = user.amount;
      return acc;
    }, {} as Record<string, number>);

    const finalBalance = new Transaction({
      transaction_id,
      balance: transaction,
    });
    await finalBalance.save();
    return res.status(201).json({
      message: "Transaction created successfully.",
      finalBalance,
      user_balance,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
