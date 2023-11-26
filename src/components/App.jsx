import { useState,  useEffect } from 'react';
import { nanoid } from 'nanoid';
import ClientName from './ClientName/ClientName';
import ContactsList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';
import css from './App.module.css'
export const App = () => {
  const [contacts, setContacts] = useState(()=>JSON.parse(localStorage.getItem('contacts')) || []);
  const [filter, setFilter] = useState('');
  
  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, [])

  useEffect(() => {        
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);
  

  const addContact = (name, number) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    setContacts(prevContacts => [...prevContacts, newContact])
     };
  const handleFilterChange = filter => {
    setFilter(filter)
  };

 const filteredContacts = () => {
   
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId))   
  };

  
    return (
      <div className={css.container}>
        <h1>Phonebook</h1>
        <ClientName
          addContact={addContact}
          contacts={contacts}
        />
        <h2>Contacts</h2>
        <Filter
          filter={filter}
          onFilterChange={handleFilterChange}
          deleteContact={deleteContact} 
        />
        <ContactsList contacts={filteredContacts()} deleteContact={deleteContact} />
      </div>
    );
  }

