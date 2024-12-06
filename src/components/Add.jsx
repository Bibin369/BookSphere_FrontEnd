import React, { useState } from "react";
import Header from "./Header";
import axios from "axios";
import Footer from "./Footer";
import "../styles/add.css";

const Add = () => {
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    publicationDate: "",
    isbn: "",
    genre: "",
    rating: "",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Real-time validation
    let error = "";
    switch (name) {
      case "title":
        if (value.length > 100) error = "Title cannot exceed 100 characters.";
        break;
      case "author":
        if (value.length > 50) error = "Author name cannot exceed 50 characters.";
        break;
      case "isbn":
        if (!/^\d{13}$/.test(value)) error = "ISBN must be a 13-digit number.";
        break;
      case "rating":
        if (value < 1 || value > 5) error = "Rating must be between 1 and 5.";
        break;
      default:
        break;
    }

    setErrors({ ...errors, [name]: error });
    setBookData({ ...bookData, [name]: value });
  };

  const validateForm = () => {
    const validationErrors = {};

    if (!bookData.title.trim())
      validationErrors.title = "Title is required.";
    else if (bookData.title.length > 100)
      validationErrors.title = "Title cannot exceed 100 characters.";

    if (!bookData.author.trim())
      validationErrors.author = "Author is required.";
    else if (bookData.author.length > 50)
      validationErrors.author = "Author name cannot exceed 50 characters.";

    if (!bookData.publicationDate)
      validationErrors.publicationDate = "Publication Date is required.";

    if (!/^\d{13}$/.test(bookData.isbn))
      validationErrors.isbn = "ISBN must be a 13-digit number.";

    if (!bookData.genre)
      validationErrors.genre = "Genre is required.";

    if (!bookData.rating)
      validationErrors.rating = "Rating is required.";
    else if (bookData.rating < 1 || bookData.rating > 5)
      validationErrors.rating = "Rating must be between 1 and 5.";

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axios.post(
        "http://localhost:8080/book/new",
        bookData
      );
      setResponseMessage(response.data.message || "Book added successfully!");
      setBookData({
        title: "",
        author: "",
        publicationDate: "",
        isbn: "",
        genre: "",
        rating: "",
      });
    } catch (error) {
      setResponseMessage("Failed to add the book. Please try again.");
      console.error(error);
    }
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
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control custom-input"
                      id="title"
                      name="title"
                      value={bookData.title}
                      onChange={handleChange}
                      required
                    />
                    {errors.title && <small className="text-danger">{errors.title}</small>}
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="author" className="form-label">
                        Author
                      </label>
                      <input
                        type="text"
                        className="form-control custom-input"
                        id="author"
                        name="author"
                        value={bookData.author}
                        onChange={handleChange}
                        required
                      />
                      {errors.author && <small className="text-danger">{errors.author}</small>}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="isbn" className="form-label">
                        ISBN
                      </label>
                      <input
                        type="text"
                        className="form-control custom-input"
                        id="isbn"
                        name="isbn"
                        value={bookData.isbn}
                        onChange={handleChange}
                        required
                      />
                      {errors.isbn && <small className="text-danger">{errors.isbn}</small>}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="publicationDate" className="form-label">
                        Publication Date
                      </label>
                      <input
                        type="date"
                        className="form-control custom-input"
                        id="publicationDate"
                        name="publicationDate"
                        value={bookData.publicationDate}
                        onChange={handleChange}
                        required
                      />
                      {errors.publicationDate && <small className="text-danger">{errors.publicationDate}</small>}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="genre" className="form-label">
                        Genre
                      </label>
                      <select
                        className="form-select custom-input"
                        id="genre"
                        name="genre"
                        value={bookData.genre}
                        onChange={handleChange}
                        required
                      >
                        <option value="" disabled>
                          Select a Genre
                        </option>
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
                  </div>

                  <div className="mb-3">
                    <label htmlFor="rating" className="form-label">
                      Rating (1-5)
                    </label>
                    <input
                      type="number"
                      className="form-control custom-input"
                      id="rating"
                      name="rating"
                      value={bookData.rating}
                      onChange={handleChange}
                      min="1"
                      max="5"
                      required
                    />
                    {errors.rating && <small className="text-danger">{errors.rating}</small>}
                  </div>

                  <button type="submit" className="btn btn-primary w-100">
                    Add Book
                  </button>
                </form>

                {responseMessage && (
                  <div className="mt-3 alert alert-info text-center" role="alert">
                    {responseMessage}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Add;
