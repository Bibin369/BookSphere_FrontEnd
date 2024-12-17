import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBookDetails,
  uploadBookPhoto,
} from "../features/bookDetailsSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/BookDetails.css";
import Header from "./Header";
import Footer from "./Footer";

const BookDetails = () => {
  useEffect(() => {
    document.title = "Books App:  Book Details";
  });
  const { id } = useParams(); // Get book ID from URL
  const navigate = useNavigate(); // For navigation
  const dispatch = useDispatch();

  // Access the Redux state
  const { book, status, error } = useSelector((state) => state.bookDetails);

  const [showModal, setShowModal] = useState(false); // State to show the modal
  const [file, setFile] = useState(null); // State to hold the file input

  // Fetch book details when the component mounts
  useEffect(() => {
    dispatch(fetchBookDetails(id));
  }, [id, dispatch]);

  const handleUploadClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile); // Update file state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("file", file); // Append the file to FormData

      // Dispatch the upload action
      dispatch(uploadBookPhoto({ id, formData }));
      setShowModal(false); // Close the modal
    }
  };

  if (status === "loading") {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="container mt-5">
        <h3 className="text-center text-danger">{error}</h3>
        <div className="text-center">
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Back to Home
          </button>
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

  const coverImage = book.photoUrl
    ? `/images/upload/directory/${book.photoUrl.split("/").pop()}`
    : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";

  return (
    <div>
      <Header />
      <div className={`container mt-5 ${showModal ? "blurred" : ""}`}>
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
              <button
                className="btn btn-primary btn-lg"
                onClick={() => navigate("/viewAll")}
              >
                Back to List
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
        <div
          className="modal show"
          style={{ display: "block" }}
          onClick={handleCloseModal}
        >
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Upload Book Cover Photo</h5>
                <button
                  type="button"
                  className="close"
                  onClick={handleCloseModal}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="file">Choose Image</label>
                    <input
                      type="file"
                      className="form-control"
                      id="file"
                      onChange={handleFileChange}
                      required
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleCloseModal}
                    >
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
