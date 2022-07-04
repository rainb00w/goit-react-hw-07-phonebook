import React from 'react';
import Form from './components/Form';
import RenderContacts from './components/RenderContacts';
import Section from './components/Section';
import Filter from './components/Filter';
import { useSelector } from 'react-redux';

const App = () => {
  const contactsRedux = useSelector(state => state.contacts.items);

  return (
    <Section>
      <Form />
      {contactsRedux.length > 0 ? <Filter /> : ''}
      {contactsRedux.length > 0 ? (
        <RenderContacts />
      ) : (
        'There are no contacts at this moment'
      )}
    </Section>
  );
};

export default App;
