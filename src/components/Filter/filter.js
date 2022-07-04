import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFilter } from '../../redux/store';
import s from './/filter.module.css';

const Filter = () => {
  const dispatch = useDispatch();
  const value = useSelector(state => state.contacts.filter);

  const changeFilter = evnt => {
    dispatch(addFilter(evnt.currentTarget.value));
  };

  return (
    <>
      <p className={s.text}>Find contacts by name</p>
      <input
        className={s.text}
        type="text"
        value={value}
        onChange={changeFilter}
      />
    </>
  );
};

export default Filter;
