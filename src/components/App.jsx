import { useState, useEffect, useCallback } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Title, Subtitle, Container } from './App.styled';

const LS_KEY = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const dataNumbers = localStorage.getItem(LS_KEY);

    if (dataNumbers) {
      setContacts(JSON.parse(dataNumbers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = useCallback(
    data => {
      const isContactExists = contacts.find(contact => contact.name === data.name);
      if (isContactExists) {
        alert(`${data.name} is already in contacts`);
      } else {
        setContacts(prevContacts => [data, ...prevContacts]);
      }
    },
    [contacts]
  );

  const handleFilter = useCallback(e => {
    const { value } = e.currentTarget;
    setFilter(value);
  }, []);

  const handleDeleteContact = useCallback(
    contactId => {
      setContacts(prevContacts => prevContacts.filter(contact => contact.id !== contactId));
    },
    []
  );

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container>
      <Title>Phonebook</Title>
      <ContactForm onSubmit={handleSubmit} />

      <Subtitle>Contacts</Subtitle>
      <Filter value={filter} onFilter={handleFilter} />
      <ContactList deleteContact={handleDeleteContact} contacts={filteredContacts} />
    </Container>
  );
};
