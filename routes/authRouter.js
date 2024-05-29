import express from "express";

import authControllers from "../controllers/authControllers.js";

import { isEmptyBody } from "../middlewares/isEmptyBody.js";

import { authSignupSchema } from "../schemas/authSchemas.js";

const authRouter = express.Router();

authRouter.post("/register", isEmptyBody, authControllers.signup);

export default authRouter;
