import React, { useState, useEffect } from "react";
import { Container, Row, Col, ListGroup, Button, Spinner, Alert } from "react-bootstrap";
import { getTasks, updateTask } from "../api"; // Import API functions

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await getTasks(); // API call to fetch tasks
        setTasks(data);
      } catch (err) {
        setError("Failed to load tasks!");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // ✅ Mark task as done (Update in backend)
  const markTaskDone = async (id) => {
    try {
      await updateTask(id, { status: "completed" }); // Update in backend
      setTasks(tasks.map(task => task._id === id ? { ...task, status: "completed" } : task));
    } catch (err) {
      alert("Error updating task!");
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md={12} className="p-4">
          <h2>Tasks</h2>
          <p>Here are your pending tasks:</p>

          {loading ? (
            <Spinner animation="border" />
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : tasks.filter(task => task.status === "pending").length === 0 ? (
            <p>No pending tasks! 🎉</p>
          ) : (
            <ListGroup>
              {tasks.filter(task => task.status === "pending").map(task => (
                <ListGroup.Item key={task._id} className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{task.name}</strong>
                    <p className="mb-0 text-muted">{task.description}</p>
                  </div>
                  <Button variant="success" size="sm" onClick={() => markTaskDone(task._id)}>
                    ✅ Mark Done
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Tasks;


