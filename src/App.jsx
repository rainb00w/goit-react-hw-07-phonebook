import React from 'react';
import Form from './components/Form';
import RenderContacts from './components/RenderContacts';
import Section from './components/Section';
import Filter from './components/Filter';
import { useGetAllContactsQuery } from './redux/fetchApi';

const App = () => {
  const { data } = useGetAllContactsQuery();

  return (
    <Section>
      <Form />
      {data?.length > 0 ? <Filter /> : ''}
      {data?.length > 0 ? (
        <RenderContacts />
      ) : (
        'There are no contacts at this moment'
      )}
    </Section>
  );
};

export default App;
