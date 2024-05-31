import express from "express";

import authControllers from "../controllers/authControllers.js";

import { isEmptyBody } from "../middlewares/isEmptyBody.js";

import { authSignupSchema } from "../schemas/authSchemas.js";
import authenticate from "../middlewares/authenticate.js";

const authRouter = express.Router();

authRouter.post("/register", isEmptyBody, authControllers.signup);

authRouter.post("/login", isEmptyBody, authControllers.signin);

authRouter.get("/current", authenticate, authControllers.getCurrent);

authRouter.post("/logout", authenticate, authControllers.logout);

export default authRouter;
