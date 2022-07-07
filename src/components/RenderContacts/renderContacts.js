import { useSelector } from 'react-redux';
import {
  useGetAllContactsQuery,
  useDeleteContactMutation,
} from '../../redux/fetchApi';
import s from './renderContact.module.css';

const RenderContacts = () => {
  const [deleteContact, result] = useDeleteContactMutation();
  const { data, error, isLoading } = useGetAllContactsQuery();
  // console.log('DATA', data);
  const filterValue = useSelector(state => state.filter?.value);

  // console.log(filterValue);
  const normalizedFilter = filterValue.toLowerCase();

  const filteredContacts = data?.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <>
      <p className={s.text}>Contacts</p>
      {error && <p>Error! Please, reload a page!</p>}
      {isLoading ? (
        <p>Contacts are loading, please wait.</p>
      ) : (
        <ul className={s.contactsList}>
          {filteredContacts?.map(({ id, name, phone }) => (
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
