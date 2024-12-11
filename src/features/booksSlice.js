import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_PORT = process.env.REACT_APP_API_PORT;

// Thunks for adding, fetching, and deleting books
export const addBook = createAsyncThunk(
  'books/addBook',
  async (bookData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}:${API_PORT}/book/new`, bookData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to add the book.');
    }
  }
);

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async () => {
    const response = await axios.get(`${API_BASE_URL}:${API_PORT}/book/listAll`);
    return Array.isArray(response.data.o) ? response.data.o : [];
  }
);

export const deleteBook = createAsyncThunk(
  'books/deleteBook',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE_URL}:${API_PORT}/book/delete/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete the book.');
    }
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    items: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch books
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to load books.';
      })
      
      // Add a new book
      .addCase(addBook.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(addBook.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to add the book.';
      })
      
      // Delete a book
      .addCase(deleteBook.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.filter((book) => book.id !== action.payload);
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to delete the book.';
      });
  },
});

export default booksSlice.reducer;
