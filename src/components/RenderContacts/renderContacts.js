import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import {
  useGetAllContactsQuery,
  useDeleteContactMutation,
} from '../../redux/fetchApi';
import s from './renderContact.module.css';
import { createSelector } from '@reduxjs/toolkit';

const useContacts = () => {
  const filterValue = useSelector(state => state.filter?.value);
  const normalizedFilter = filterValue.toLowerCase();

  const selectedContacts = useMemo(() => {
    return createSelector(
      [response => response.data, (_, filter) => filter],
      (contacts, filter) => {
        return (
          contacts?.filter(contact =>
            contact.name.toLowerCase().includes(filter)
          ) ?? []
        );
      }
    );
  }, []);

  return useGetAllContactsQuery(undefined, {
    selectFromResult(result) {
      return {
        ...result,
        filteredContatcs: selectedContacts(result, normalizedFilter),
      };
    },
  });
};

const RenderContacts = () => {
  const { filteredContatcs, error, isLoading } = useContacts();
  const [deleteContact, result] = useDeleteContactMutation();

  return (
    <>
      <p className={s.text}>Contacts</p>
      {error && <p>Error! Please, reload a page!</p>}
      {isLoading ? (
        <p>Contacts are loading, please wait.</p>
      ) : (
        <ul className={s.contactsList}>
          {filteredContatcs?.map(({ id, name, phone }) => (
            <li key={id}>
              <p>
                <span className="boldFont">{name}</span> : ( {phone} )
                <button
                  className={s.button24}
                  disabled={result.isLoading}
                  onClick={() => deleteContact(id)}
                >
                  Delete
                </button>
              </p>
            </li>
          ))}
        </ul>
      )}
      {result.isLoading && <p>Deleting contact...</p>}
    </>
  );
};

export default RenderContacts;
