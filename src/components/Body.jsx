import React from "react";
import "../styles/body.css";

const Body = () => {
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
                      Update 1: New feature added to the system!
                    </span>
                    <span className="update-date">Dec 5, 2024 10:00</span>
                  </div>
                </li>
                <li>
                  <div className="update-item">
                    <span className="update-message">
                      Update 2: Maintenance scheduled for tomorrow.
                    </span>
                    <span className="update-date">Dec 5, 2024 09:00</span>
                  </div>
                </li>
                <li>
                  <div className="update-item">
                    <span className="update-message">
                      Update 3: New blog post on the homepage!
                    </span>
                    <span className="update-date">Dec 4, 2024 15:30</span>
                  </div>
                </li>
                <li>
                  <div className="update-item">
                    <span className="update-message">
                      Update 4: Performance improvements deployed.
                    </span>
                    <span className="update-date">Dec 4, 2024 14:00</span>
                  </div>
                </li>
                <li>
                  <div className="update-item">
                    <span className="update-message">
                      Update 5: Security patch released for the system.
                    </span>
                    <span className="update-date">Dec 5, 2024 08:30</span>
                  </div>
                </li>
                <li>
                  <div className="update-item">
                    <span className="update-message">
                      Update 6: New version of the mobile app now available for
                      download.
                    </span>
                    <span className="update-date">Dec 5, 2024 07:45</span>
                  </div>
                </li>
                <li>
                  <div className="update-item">
                    <span className="update-message">
                      Update 7: Bug fix applied to the user registration
                      process.
                    </span>
                    <span className="update-date">Dec 4, 2024 16:20</span>
                  </div>
                </li>
                <li>
                  <div className="update-item">
                    <span className="update-message">
                      Update 8: New user interface update for the dashboard
                      released.
                    </span>
                    <span className="update-date">Dec 4, 2024 13:00</span>
                  </div>
                </li>
                <li>
                  <div className="update-item">
                    <span className="update-message">
                      Update 9: Data backup completed successfully.
                    </span>
                    <span className="update-date">Dec 4, 2024 12:15</span>
                  </div>
                </li>
                <li>
                  <div className="update-item">
                    <span className="update-message">
                      Update 10: New API endpoints for payment processing added.
                    </span>
                    <span className="update-date">Dec 3, 2024 18:00</span>
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
