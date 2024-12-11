// src/features/bookDetailsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API_BASE_URL = 'http://184.73.124.211'; 

// Async thunk to fetch book details
export const fetchBookDetails = createAsyncThunk(
  'bookDetails/fetchBookDetails',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/book/${id}`);
      if (response.data.status === 'success') {
        return response.data.o; // Return book details
      } else {
        throw new Error('Failed to fetch book details');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// Async thunk to upload book photo
export const uploadBookPhoto = createAsyncThunk(
  'bookDetails/uploadBookPhoto',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/book/uploadPhoto/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set proper content type for file upload
        },
      });
      if (response.data.status === 'success') {
        return response.data.message; // Return the updated image URL from response
      } else {
        throw new Error('Failed to upload photo');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Book details slice
const bookDetailsSlice = createSlice({
  name: 'bookDetails',
  initialState: {
    book: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBookDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.book = action.payload;
      })
      .addCase(fetchBookDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(uploadBookPhoto.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(uploadBookPhoto.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (state.book) {
          state.book.photoUrl = action.payload; // Update photoUrl in the book state
        }
      })
      .addCase(uploadBookPhoto.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default bookDetailsSlice.reducer;
