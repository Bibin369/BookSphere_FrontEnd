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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/book/new",
        bookData
      );
      setResponseMessage(response.data.message || "Book added successfully!");
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
          <div className="col-md-10 col-lg-8"> {/* Enlarged container */}
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
