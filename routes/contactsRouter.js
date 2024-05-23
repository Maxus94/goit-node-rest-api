import express from "express";

import contactsControllers from "../controllers/contactsControllers.js";

import HttpError from "../helpers/HttpError.js";
import isValidId from "../middlewares/isValidId.js";

const isEmptyBody = (req, res, next) => {
  const { length } = Object.keys(req.body);
  if (length === 0) {
    return next(HttpError(400, "Body must have at least one key"));
  }
  next();
};

const contactsRouter = express.Router();

contactsRouter.get("/", contactsControllers.getAllContacts);

contactsRouter.get("/:id", isValidId, contactsControllers.getOneContact);

contactsRouter.delete("/:id", isValidId, contactsControllers.deleteContact);

contactsRouter.post("/", isEmptyBody, contactsControllers.createContact);

contactsRouter.put(
  "/:id",
  isValidId,
  isEmptyBody,
  contactsControllers.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  isEmptyBody,
  contactsControllers.updateStatus
);

export default contactsRouter;
