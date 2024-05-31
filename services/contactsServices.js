// import path from "path";
import Contact from "../models/Contact.js";

// const contactsPath = path.resolve("db", "contacts.json");

function listContacts(search = {}) {
  const { filter = {}, fields = "", settings = {} } = search;
  return Contact.find(filter, fields, settings);
}

function getContact(filter) {
  return Contact.findOne(filter);
}

function removeContact(filter) {
  return Contact.findOneAndDelete(filter);
}

const addContact = (name, email, phone) =>
  Contact.create({ ...name, ...email, ...phone });

const updateContact = (filter, data) => Contact.findOneAndUpdate(filter, data);

export default {
  listContacts,
  getContact,
  removeContact,
  addContact,
  updateContact,
};
