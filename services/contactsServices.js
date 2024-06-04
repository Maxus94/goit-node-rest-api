import Contact from "../models/Contact.js";

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

const updateContact = (filter, data) =>
  Contact.findOneAndUpdate(filter, data, { new: true });

const updateContactById = (id, data) =>
  Contact.findByIdAndUpdate(id, data, { new: true });

export default {
  listContacts,
  getContact,
  removeContact,
  addContact,
  updateContact,
  updateContactById,
};
