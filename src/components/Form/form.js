import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from '../../redux/store';
import s from './form.module.css';

const Form = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contactsRedux = useSelector(state => state.contacts.items);
  const dispatch = useDispatch();

  const handleInputText = evt => {
    const { name, value } = evt.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;

      default:
        console.log('Error !!!');
    }
  };

  const formSubmit = e => {
    e.preventDefault();

    const normalizedName = name.toLowerCase();

    if (
      contactsRedux.find(
        contact => contact.name.toLowerCase() === normalizedName
      )
    ) {
      alert(` ${name} is already in contacts`);
      return;
    }

    const contact = {
      name,
      id: nanoid(),
      number,
    };
    dispatch(addContact(contact));

    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={s.form} onSubmit={formSubmit}>
      <label className={s.text}>
        Name
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleInputText}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>

      <label className={s.text}>
        Number
        <input
          type="tel"
          name="number"
          value={number}
          onChange={handleInputText}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button className={s.button3} type="submit">
        Add contact
      </button>
    </form>
  );
};

export default Form;
