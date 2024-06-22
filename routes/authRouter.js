import express from "express";

import authControllers from "../controllers/authControllers.js";

import { isEmptyBody } from "../middlewares/isEmptyBody.js";

import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  //   upload.single("avatar"),
  isEmptyBody,
  authControllers.signup
);

authRouter.post("/login", isEmptyBody, authControllers.signin);

authRouter.get("/current", authenticate, authControllers.getCurrent);

authRouter.post("/logout", isEmptyBody, authenticate, authControllers.logout);

authRouter.patch("/", isEmptyBody, authenticate, authControllers.subscribe);

authRouter.patch("/avatars", upload.single("avatar"), isEmptyBody, authenticate, authControllers.changeAvatar);


export default authRouter;
