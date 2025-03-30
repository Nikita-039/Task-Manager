import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Show Logout only on dashboard pages
  const isDashboardPage = ["/dashboard", "/tasks", "/completed"].includes(location.pathname);

  // 🔑 Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    navigate("/signin"); // Redirect to login page
    window.location.reload(); // Refresh page to reset state
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
      <Container>
        {/* Website Name (Logo) */}
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
          TO-DO
        </Navbar.Brand>

        {/* Conditional Buttons */}
        <div>
          {isDashboardPage ? (
            <Button variant="danger" onClick={handleLogout}>🚪 Logout</Button>
          ) : (
            <>
              {/* <Button as={Link} to="/signin" variant="outline-light" className="me-2">
                Sign In
              </Button>
              <Button as={Link} to="/signup" variant="light" className="text-dark">
                Sign Up
              </Button> */}
            </>
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;

