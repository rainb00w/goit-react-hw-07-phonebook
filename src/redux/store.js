import { configureStore } from '@reduxjs/toolkit';
import { createAction, createReducer } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const contacts = {
  items: [],
  filter: '',
};

export const addContact = createAction('add/contact');
export const deleteOneContact = createAction('delete/contact');
export const addFilter = createAction('add/filter');

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['filter'],
};

const myReducer = createReducer(contacts, {
  [addContact]: (state, action) => {
    state.items.push(action.payload);
  },
  [deleteOneContact]: (state, action) => {
    state.items = state.items.filter(item => item.id !== action.payload);
  },
  [addFilter]: (state, action) => {
    state.filter = action.payload;
  },
});

const persistedMyReducer = persistReducer(persistConfig, myReducer);

export const store = configureStore({
  reducer: {
    contacts: persistedMyReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
