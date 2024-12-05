import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/BookList.css";
import Header from "./Header";
import Footer from "./Footer";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/book/listAll");
        setBooks(response.data); // Assuming the response data is an array of books
      } catch (error) {
        console.error("Error fetching the books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

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
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Publication Date</th>
              <th scope="col">ISBN</th>
              <th scope="col">Genre</th>
              <th scope="col">Rating</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={index}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publicationDate}</td>
                <td>{book.isbn}</td>
                <td>{book.genre}</td>
                <td>{book.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default BookList;
