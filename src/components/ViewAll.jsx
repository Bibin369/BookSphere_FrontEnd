import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks, deleteBook } from "../features/booksSlice";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/BookList.css";
import Header from "./Header";
import Footer from "./Footer";

const BookList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access Redux state
  const { items: books, loading } = useSelector((state) => state.books);

  const [currentPage, setCurrentPage] = useState(1);
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const itemsPerPage = 10;

  useEffect(() => {
    document.title = "Books App:  BookList";
  });

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteBook(id));
    setSuccessMessage("Book deleted successfully!"); // Show success message
    setTimeout(() => {
      setSuccessMessage(""); // Hide the message after 3 seconds
    }, 3000);
  };

  const currentBooks = books.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(books.length / itemsPerPage);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <h2 className="text-center mb-4">Book List</h2>

        {/* Show success message */}
        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}

        <table className="table table-hover table-bordered custom-table">
          <thead className="table-primary">
            <tr>
              <th>#</th>
              <th>Book Id</th>
              <th>Title</th>
              <th>Author</th>
              <th>Publication Date</th>
              <th>ISBN</th>
              <th>Genre</th>
              <th>Rating</th>
              <th>Delete</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {currentBooks.map((book, index) => (
              <tr key={book.id}>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td>{book.uniqueId}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{new Date(book.publicationDate).toLocaleDateString()}</td>
                <td>{book.isbn}</td>
                <td>{book.genre}</td>
                <td>{book.rating}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm me-2"
                    onClick={() => handleDelete(book.id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate(`/book/${book.id}`)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-between align-items-center">
          <button
            className="btn btn-primary"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-primary"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookList;
