import React, { useEffect } from "react";
import "../styles/body.css";

const Body = () => {
  useEffect(() => {
    document.title = "Books App:  Home";
  });
  return (
    <div className="d-flex justify-content-center mt-4">
      <div
        className="carousel-container"
        style={{ width: "50%", marginRight: "30px" }}
      >
        <div
          id="carouselExample"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://images.unsplash.com/photo-1518373714866-3f1478910cc0?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3N0b3JlfGVufDB8fDB8fHww"
                className="d-block w-100"
                alt="First Slide"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>First Slide Heading</h5>
                <p>Description for the first slide.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="https://www.reganagency.com/wp-content/uploads/2023/10/Library-Management.jpg"
                className="d-block w-100"
                alt="Second Slide"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Second Slide Heading</h5>
                <p>Description for the second slide.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="https://studentprojectguide.com/wp-content/uploads/2019/09/Library-management-system-synopsis-1024x683.jpg"
                className="d-block w-100"
                alt="Third Slide"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Third Slide Heading</h5>
                <p>Description for the third slide.</p>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* Card with scrolling messages */}
      <div className="card mt-4" style={{ width: "30%", height: "30%" }}>
        <div className="card-body text-center">
          <h5 className="card-title">
            <b>Latest Updates</b>
          </h5>
          <div
            className="scrolling-text-container"
            style={{ height: "325px", overflow: "hidden" }}
          >
            <div style={{ animation: "scroll-up 5s linear infinite" }}>
              <ul>
                <li>
                  <div className="update-item">
                    <span className="update-message">
                      Quote: "A room without books is like a body without a
                      soul." – Marcus Tullius Cicero
                    </span>
                    <span className="update-date">Dec 6, 2024 11:00</span>
                  </div>
                </li>
                <li>
                  <div className="update-item">
                    <span className="update-message">
                      Quote: "Books are a uniquely portable magic." – Stephen
                      King
                    </span>
                    <span className="update-date">Dec 6, 2024 11:05</span>
                  </div>
                </li>
                <li>
                  <div className="update-item">
                    <span className="update-message">
                      Quote: "Reading is a conversation. All books talk. But a
                      good book listens as well." – Mark Haddon
                    </span>
                    <span className="update-date">Dec 6, 2024 11:10</span>
                  </div>
                </li>
                <li>
                  <div className="update-item">
                    <span className="update-message">
                      Quote: "A book is a dream that you hold in your hand." –
                      Neil Gaiman
                    </span>
                    <span className="update-date">Dec 6, 2024 11:15</span>
                  </div>
                </li>
                <li>
                  <div className="update-item">
                    <span className="update-message">
                      Quote: "The only thing you absolutely have to know is the
                      location of the library." – Albert Einstein
                    </span>
                    <span className="update-date">Dec 6, 2024 11:20</span>
                  </div>
                </li>
                <li>
                  <div className="update-item">
                    <span className="update-message">
                      Quote: "Books are mirrors: you only see in them what you
                      already have inside you." – Carlos Ruiz Zafón
                    </span>
                    <span className="update-date">Dec 6, 2024 11:25</span>
                  </div>
                </li>
                <li>
                  <div className="update-item">
                    <span className="update-message">
                      Quote: "So many books, so little time." – Frank Zappa
                    </span>
                    <span className="update-date">Dec 6, 2024 11:30</span>
                  </div>
                </li>
                <li>
                  <div className="update-item">
                    <span className="update-message">
                      Quote: "The world was hers for the reading." – Betty
                      Smith, A Tree Grows in Brooklyn
                    </span>
                    <span className="update-date">Dec 6, 2024 11:35</span>
                  </div>
                </li>
                <li>
                  <div className="update-item">
                    <span className="update-message">
                      Quote: "Books are the bees which carry the quickening
                      pollen from one to another mind." – James Russell Lowell
                    </span>
                    <span className="update-date">Dec 6, 2024 11:40</span>
                  </div>
                </li>
                <li>
                  <div className="update-item">
                    <span className="update-message">
                      Quote: "If you don’t like to read, you haven’t found the
                      right book." – J.K. Rowling
                    </span>
                    <span className="update-date">Dec 6, 2024 11:45</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
