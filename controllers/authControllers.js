import ctrlWrapper from "../decorators/ctrlWrapper.js";
import compareHash from "../helpers/compareHash.js";
import HttpError from "../helpers/HttpError.js";
import { createToken } from "../helpers/jwt.js";
import { authSignupSchema } from "../schemas/authSchemas.js";

import * as authServices from "../services/authServices.js";

const signup = async (req, res, next) => {
  console.log(req.body);

  const { error } = authSignupSchema.validate(req.body);
  console.log(error);
  if (error) {
    throw HttpError(400, error.message);
  }

  try {
    const { email } = req.body;
    const user = await authServices.findUser({ email });
    if (user) {
      throw HttpError(409, "User with this email already exists");
    }

    const newUser = await authServices.saveUser(req.body);
    res.status(201).json({ email: newUser.email });
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  console.log(req.body);

  try {
    const { error } = authSignupSchema.validate(req.body);
    console.log(error);
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
    const { _id: id } = user;

    const payload = { id };

    const token = createToken(payload);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
};
