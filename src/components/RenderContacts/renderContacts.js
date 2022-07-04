import { useSelector, useDispatch } from 'react-redux';
import { deleteOneContact } from '../../redux/store';
import s from './renderContact.module.css';

const RenderContacts = () => {
  const dispatch = useDispatch();

  const deleteContact = ID => {
    dispatch(deleteOneContact(ID));
  };

  const contactsRedux = useSelector(state => state.contacts.items);
  const filterRedux = useSelector(state => state.contacts.filter);

  const normalizedFilter = filterRedux.toLowerCase();
  const filteredContacts = contactsRedux.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <>
      <p className={s.text}>Contacts</p>
      <ul className={s.contactsList}>
        {filteredContacts.map(({ id, name, number }) => (
          <li key={id}>
            <p>
              <span className="boldFont">{name}</span> : ( {number} )
              <button className={s.button24} onClick={() => deleteContact(id)}>
                Delete
              </button>
            </p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default RenderContacts;
