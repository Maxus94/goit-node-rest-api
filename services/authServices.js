import User from "../models/User.js";

export const saveUser = (data) => User.create(data);
