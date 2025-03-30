import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios"; // Import axios for API requests

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming you're using JWT
        const response = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` }, // Send token for authentication
        });

        setUser(response.data); // Set user data in state
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Container fluid>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <Card className="shadow-lg p-4 border-0">
            <Card.Body className="text-center">
              <h2 className="mb-3">Your Profile</h2>
              <p className="text-muted">Manage your account details</p>

              {user ? (
                <Card className="p-3 border-0 bg-light">
                  <Card.Body>
                    <h4 className="fw-bold">{user.name}</h4>
                    <p className="text-muted">{user.email}</p>
                    <p><strong>Role:</strong> {user.role || "User"}</p>
                    <p><strong>Joined:</strong> {new Date(user.createdAt).toDateString()}</p>
                  </Card.Body>
                </Card>
              ) : (
                <p>Loading...</p> // Show loading message while fetching data
              )}

              {/* <Button variant="primary" className="mt-3">
                ✏️ Edit Profile
              </Button> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;

