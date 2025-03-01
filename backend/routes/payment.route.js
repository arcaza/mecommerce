import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";

import { checkouteSuccess, createCheckoutSession } from "../controllers/payment.controller.js";


const router = express.Router();

router.post("/create-checkout-session", protectRoute, createCheckoutSession);
router.post("/create-success", protectRoute, checkouteSuccess);

export default router;
