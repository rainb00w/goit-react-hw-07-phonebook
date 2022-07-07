import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createFilter } from '../../redux/filterSlice';
import s from './/filter.module.css';

const Filter = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector(state => state.filter.value);

  const changeFilter = evnt => {
    dispatch(createFilter(evnt.currentTarget.value));
  };

  return (
    <>
      <p className={s.text}>Find contacts by name</p>
      <input
        className={s.text}
        type="text"
        value={filterValue}
        onChange={changeFilter}
      />
    </>
  );
};

export default Filter;
