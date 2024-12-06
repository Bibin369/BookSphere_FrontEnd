import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/BookDetails.css";
import Header from "./Header";
import Footer from "./Footer";

const BookDetails = () => {
  const { id } = useParams(); // Get book ID from URL
  const navigate = useNavigate(); // For navigation
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // State to show the modal
  const [imageUrl, setImageUrl] = useState(""); // State to hold the image URL input

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

  // Handle opening the modal
  const handleUploadClick = () => {
    setShowModal(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/book/uploadPhoto/${id}`, {
        photoUrl: imageUrl,
      });
      if (response.data.status === "success") {
        // Successfully uploaded the image, update the book state with the new image
        setBook((prevBook) => ({ ...prevBook, coverPhoto: imageUrl }));
        handleCloseModal(); // Close the modal after upload
  
        // Reload the page to show the updated cover photo
        window.location.reload();
      } else {
        console.error("Error uploading photo:", response);
      }
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  };

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

  // Check if book has a cover photo, otherwise use a placeholder
  const coverImage = book.photoUrl
    ? book.photoUrl
    : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="card book-card shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">{book.title}</h2>
            <div className="text-center mb-4">
              <img
                src={coverImage}
                alt={`${book.title} cover`}
                className="img-fluid rounded"
                style={{ maxHeight: "300px", objectFit: "cover" }}
              />
            </div>
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
            <div className="text-center mt-4">
              <button className="btn btn-secondary" onClick={handleUploadClick}>
                Upload Photo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for uploading photo */}
      {showModal && (
        <div className="modal show" style={{ display: "block" }} onClick={handleCloseModal}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Upload Book Cover Photo</h5>
                <button type="button" className="close" onClick={handleCloseModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="photoUrl">Image URL</label>
                    <input
                      type="text"
                      className="form-control"
                      id="photoUrl"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="Enter image URL"
                    />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default BookDetails;
