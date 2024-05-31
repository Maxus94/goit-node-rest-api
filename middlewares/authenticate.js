import HttpError from "../helpers/HttpError.js";
import { verifyToken } from "../helpers/jwt.js";
import { findUser } from "../services/authServices.js";

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    next(HttpError(401, "Authorization header not found"));
    return;
  }

  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401, "Bearer not found"));
  }

  try {
    const { id } = verifyToken(token);
    const user = await findUser({ _id: id });
    if (!user) {
      next(HttpError(401, "User not found"));
      return;
    }

    if (!user.token) {
      next(HttpError(401, "User logout"));
    }
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, error.mesage));
  }
};

export default authenticate;
