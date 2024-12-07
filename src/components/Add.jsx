import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar, Alert } from '@mui/material';
import { addBook } from '../features/booksSlice';
import Header from './Header';
import Footer from './Footer';
import "../styles/add.css";

const Add = () => {
  const dispatch = useDispatch();
  const bookStatus = useSelector((state) => state.books.status);
  const bookError = useSelector((state) => state.books.error);

  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    publicationDate: '',
    isbn: '',
    genre: '',
    rating: '',
  });

  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Handle Snackbar messages based on Redux state
  useEffect(() => {
    if (bookStatus === 'succeeded') {
      setSnackbar({ open: true, message: 'Book added successfully!', severity: 'success' });
    } else if (bookStatus === 'failed') {
      setSnackbar({
        open: true,
        message: `Failed to add book: ${bookError}`,
        severity: 'error',
      });
    }
  }, [bookStatus, bookError]);

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Field validation logic
  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'title':
        if (!value.trim()) error = 'Title is required.';
        else if (value.length > 100) error = 'Title must not exceed 100 characters.';
        break;
      case 'author':
        if (!value.trim()) error = 'Author is required.';
        else if (value.length > 50) error = 'Author must not exceed 50 characters.';
        break;
      case 'publicationDate':
        if (!value) error = 'Publication Date is required.';
        break;
      case 'isbn':
        if (!/^\d{13}$/.test(value)) error = 'ISBN must be a 13-digit number.';
        break;
      case 'genre':
        if (!value) error = 'Genre is required.';
        break;
      case 'rating':
        if (!value || value < 1 || value > 5) error = 'Rating must be between 1 and 5.';
        break;
      default:
        break;
    }

    return error;
  };

  // Handle input change with live validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    const fieldError = validateField(name, value);

    setBookData({ ...bookData, [name]: value });
    setErrors({ ...errors, [name]: fieldError });
  };

  // Validate all fields before submission
  const validateForm = () => {
    const validationErrors = {};
    Object.keys(bookData).forEach((key) => {
      const error = validateField(key, bookData[key]);
      if (error) validationErrors[key] = error;
    });
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    dispatch(addBook(bookData));

    // Clear form after successful submission
    setBookData({
      title: '',
      author: '',
      publicationDate: '',
      isbn: '',
      genre: '',
      rating: '',
    });
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="container mt-5 flex-grow-1">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <div className="card shadow-sm">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">Add a New Book</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      value={bookData.title}
                      onChange={handleChange}
                      required
                    />
                    {errors.title && <small className="text-danger">{errors.title}</small>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="author" className="form-label">Author</label>
                    <input
                      type="text"
                      className="form-control"
                      id="author"
                      name="author"
                      value={bookData.author}
                      onChange={handleChange}
                      required
                    />
                    {errors.author && <small className="text-danger">{errors.author}</small>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="publicationDate" className="form-label">Publication Date</label>
                    <input
                      type="date"
                      className="form-control"
                      id="publicationDate"
                      name="publicationDate"
                      value={bookData.publicationDate}
                      onChange={handleChange}
                      required
                    />
                    {errors.publicationDate && (
                      <small className="text-danger">{errors.publicationDate}</small>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="isbn" className="form-label">ISBN</label>
                    <input
                      type="text"
                      className="form-control"
                      id="isbn"
                      name="isbn"
                      value={bookData.isbn}
                      onChange={handleChange}
                      required
                    />
                    {errors.isbn && <small className="text-danger">{errors.isbn}</small>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="genre" className="form-label">Genre</label>
                    <select
                      className="form-select"
                      id="genre"
                      name="genre"
                      value={bookData.genre}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Genre</option>
                      <option value="Fiction">Fiction</option>
                      <option value="Non-Fiction">Non-Fiction</option>
                      <option value="Mystery">Mystery</option>
                      <option value="Fantasy">Fantasy</option>
                      <option value="Romance">Romance</option>
                      <option value="Sci-Fi">Sci-Fi</option>
                      <option value="Others">Others</option>
                    </select>
                    {errors.genre && <small className="text-danger">{errors.genre}</small>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="rating" className="form-label">Rating</label>
                    <input
                      type="number"
                      className="form-control"
                      id="rating"
                      name="rating"
                      min="1"
                      max="5"
                      value={bookData.rating}
                      onChange={handleChange}
                      required
                    />
                    {errors.rating && <small className="text-danger">{errors.rating}</small>}
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    {bookStatus === 'loading' ? 'Adding...' : 'Add Book'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {/* Snackbar for success/failure messages */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Add;
