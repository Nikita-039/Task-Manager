import React from "react";
import { Link } from "react-router-dom";
import { FaTasks, FaCheckCircle, FaUser, FaSignOutAlt, FaHome } from "react-icons/fa";
import { Navbar, Nav } from "react-bootstrap";

const Sidebar = ({ onLogout }) => {
  return (
    <Navbar bg="dark" variant="dark" className="d-flex flex-column vh-100 p-3 sidebar">
      <Navbar.Brand as={Link} to="/dashboard" className="fw-bold fs-4 text-white">
        TO-DO
      </Navbar.Brand>

      <Nav className="flex-column w-100 gap-3 mt-3">
        <Nav.Link as={Link} to="/dashboard" className="text-white">
          <FaHome className="me-2" /> Home
        </Nav.Link>
        <Nav.Link as={Link} to="/tasks" className="text-white">
          <FaTasks className="me-2" /> My Tasks
        </Nav.Link>
        <Nav.Link as={Link} to="/completed" className="text-white">
          <FaCheckCircle className="me-2" /> Completed
        </Nav.Link>
        <Nav.Link as={Link} to="/profile" className="text-white">
          <FaUser className="me-2" /> Profile
        </Nav.Link>
      </Nav>

      {/* <Nav className="mt-auto w-100">
        <Nav.Link onClick={onLogout} className="text-danger cursor-pointer">
          <FaSignOutAlt className="me-2" /> Logout
        </Nav.Link>
      </Nav> */}
    </Navbar>
  );
};

export default Sidebar;
