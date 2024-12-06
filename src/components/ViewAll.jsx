import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/BookList.css";
import Header from "./Header";
import Footer from "./Footer";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const navigate = useNavigate(); // For navigation
  const itemsPerPage = 10; // Number of books per page

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/book/listAll");
        console.log(response.data); // Log the response for debugging
        setBooks(Array.isArray(response.data.o) ? response.data.o : []);
      } catch (error) {
        console.error("Error fetching the books:", error);
        setBooks([]); // Set to an empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/book/delete/${id}`);
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting the book:", error);
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedBooks = [...books].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setBooks(sortedBooks);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // Formats to dd/mm/yyyy
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
        <table className="table table-hover table-bordered custom-table">
          <thead className="table-primary">
            <tr>
              <th scope="col">#</th> {/* Index column */}
              <th scope="col" onClick={() => handleSort("title")}>
                Book Id
              </th>
              <th scope="col" onClick={() => handleSort("title")}>
                Title
              </th>
              <th scope="col" onClick={() => handleSort("author")}>
                Author
              </th>
              <th scope="col" onClick={() => handleSort("publicationDate")}>
                Publication Date
              </th>
              <th scope="col" onClick={() => handleSort("isbn")}>
                ISBN
              </th>
              <th scope="col" onClick={() => handleSort("genre")}>
                Genre
              </th>
              <th scope="col" onClick={() => handleSort("rating")}>
                Rating
              </th>
              <th scope="col">Delete</th>
              <th scope="col">View</th>
            </tr>
          </thead>
          <tbody>
            {currentBooks.map((book, index) => (
              <tr key={book.id}>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td> {/* Index */}
                <td>{book.uniqueId}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{formatDate(book.publicationDate)}</td> {/* Formatted Date */}
                <td>{book.isbn}</td>
                <td>{book.genre}</td>
                <td>{book.rating}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm me-2"
                    onClick={() => deleteBook(book.id)}
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
