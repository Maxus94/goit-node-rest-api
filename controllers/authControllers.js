import fs from "fs/promises";
import gravatar from 'gravatar';
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import compareHash from "../helpers/compareHash.js";
import HttpError from "../helpers/HttpError.js";
import { createToken } from "../helpers/jwt.js";
import { authSignupSchema, subscribeSchema } from "../schemas/authSchemas.js";

import * as authServices from "../services/authServices.js";

const signup = async (req, res, next) => {
  const { error } = authSignupSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }

  try {
    const { email } = req.body;
    const user = await authServices.findUser({ email });
    if (user) {
      throw HttpError(409, "Email in use");
    }
    
    //returns //www.gravatar.com/avatar/93e9084aa289b7f1f5e4ab6716a56c3b?s=200&r=pg&d=404
    const avatarURL = gravatar.url(email);
    const newUser = await authServices.saveUser(req.body);
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  try {
    const { error } = authSignupSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { email, password } = req.body;

    const user = await authServices.findUser({ email });
    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }
    const comparePassword = await compareHash(password, user.password);
    if (!comparePassword) {
      throw HttpError(401, "Email or password is wrong");
    }
    const { _id: id, subscription } = user;

    const payload = { id };

    const token = createToken(payload);
    await authServices.updateUser({ _id: id }, { token });

    res.json({
      token,
      user: {
        email,
        subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getCurrent = (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  try {
    await authServices.updateUser({ _id }, { token: "" });
    res.status(204).json({});
  } catch (error) {
    next(HttpError(401, "Not authorized"));
  }
};

const subscribe = async (req, res, next) => {
  try {
    const { error } = subscribeSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { _id } = req.user;
    const { subscription } = req.body;
    const result = await authServices.updateUser({ _id }, { subscription });
    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  subscribe: ctrlWrapper(subscribe),
};
