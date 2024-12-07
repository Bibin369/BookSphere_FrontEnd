import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '../features/booksSlice';
import bookDetailsReducer from '../features/bookDetailsSlice';

const store = configureStore({
  reducer: {
    books: booksReducer,
    bookDetails: bookDetailsReducer,
  },
});

export default store;

