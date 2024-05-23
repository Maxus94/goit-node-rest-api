import path from "path";
import fs from "fs/promises";
import { nanoid } from "nanoid";
import Contact from "../models/Contact.js";

const contactsPath = path.resolve("db", "contacts.json");

function listContacts() {
  return Contact.find();
}

function getContactById(_id) {
  return Contact.findById(_id);
}

function removeContact(_id) {
  return Contact.findByIdAndDelete(_id);
}

const addContact = (name, email, phone) =>
  Contact.create({ ...name, ...email, ...phone });

const updateContactById = (id, data) =>
  Contact.findByIdAndUpdate(id, data, { new: true });

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
