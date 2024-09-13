import { Router } from "express";
import { calculate_balances } from "../controllers/user";

const router = Router();

router.post("/", calculate_balances);

export default router;
