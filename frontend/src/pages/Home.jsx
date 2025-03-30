import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container className="mt-4 d-flex align-items-center" style={{ minHeight: "90vh" }}>
      <Row className="align-items-center w-100">
        {/* Left Section - Text Content */}
        <Col md={6} className="text-center text-md-start">
          <h1 className="fw-bold">Welcome to TO-DO</h1>
          <p className="fst-italic">"The secret to getting ahead is getting started."</p>
          <Button as={Link} to="/signup" variant="primary" size="lg">
            Get Started
          </Button>
        </Col>

        {/* Right Section - Image */}
        <Col md={6} className="text-center">
          <img 
            src="/landing-image.png" 
            alt="Task Manager" 
            className="img-fluid rounded" 
            style={{ maxWidth: "80%", height: "auto" }} 
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;

