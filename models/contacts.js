const fs = require('fs').promises;
const path = require('path');
const {v4: uuidv4} = require('uuid');

const pathContacts = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(pathContacts);
  const contacts = await JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = await contacts.find(contact => contact.id === contactId);
  
  if(!contact){
    return null;
  }
  return contact;
};

const addContact = async (body) => {
  const id = await uuidv4();
  const newContact = await {id, ...body};
  const contacts = await listContacts();
  const newContacts = await [...contacts, newContact];
  
  fs.writeFile(pathContacts, JSON.stringify(newContacts, null, 2));
  return newContact;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const removedContact = await contacts.find(contact => contact.id === contactId.toString());
  
  if(!removedContact){
    return null;
  }
  
  const newContacts = await contacts.filter(contact => contact.id !== contactId.toString());
  
  fs.writeFile(pathContacts, JSON.stringify(newContacts, null, 2));
  return removedContact;
};
  
const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = await contacts.findIndex(contact => contact.id === contactId.toString());
  
  if(index === -1){
    return null;
  };
  
  const id = await contactId;
  contacts[index] = await {id, ...body};

  fs.writeFile(pathContacts, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
