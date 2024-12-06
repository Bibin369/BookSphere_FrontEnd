import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/BookDetails.css";
import Header from "./Header";

const BookDetails = () => {
  const { id } = useParams(); // Get book ID from URL
  const navigate = useNavigate(); // For navigation
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/book/${id}`);
        if (response.data.status === "success" && response.data.o) {
          setBook(response.data.o); // Set the book details
        } else {
          console.error("Unexpected response format:", response);
        }
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container mt-5">
        <h3 className="text-center text-danger">Book details not found.</h3>
        <div className="text-center">
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="card book-card shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">{book.title}</h2>
            <p className="card-text">
              <strong>Author:</strong> {book.author}
            </p>
            <p className="card-text">
              <strong>Genre:</strong> {book.genre}
            </p>
            <p className="card-text">
              <strong>Publication Date:</strong>{" "}
              {new Date(book.publicationDate).toLocaleDateString("en-GB")}
            </p>
            <div className="text-center mt-4">
              <button className="btn btn-primary btn-lg" onClick={() => navigate("/")}>
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
