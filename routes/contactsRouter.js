import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from "../controllers/contactsControllers.js";
import HttpError from "../helpers/HttpError.js";

const isEmptyBody = (req, res, next) => {
  const { length } = Object.keys(req.body);
  if (length === 0) {
    return next(HttpError(400, "Body must have at least one key"));
  }
  next();
};

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", isEmptyBody, createContact);

contactsRouter.put("/:id", isEmptyBody, updateContact);

export default contactsRouter;
