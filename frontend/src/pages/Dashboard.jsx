import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import AddTaskModal from "../components/AddTaskModal";
import { getTasks, addTask as addTaskAPI, updateTask } from "../api";

const Dashboard = ({ tasks, setTasks }) => {  // ✅ Receive tasks & setTasks from App.jsx
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch tasks from API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await getTasks();
        setTasks(data);
      } catch (err) {
        setError("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [setTasks]);  // ✅ Add setTasks to dependencies

  // Add a new task
  const addTask = async (newTask) => {
    try {
      const { data } = await addTaskAPI(newTask);
      setTasks(prevTasks => [...prevTasks, data]); // ✅ Update state properly
    } catch (err) {
      setError("Failed to add task");
    }
  };

  // Mark task as completed
  const markAsDone = async (taskId) => {
    try {
      await updateTask(taskId, { status: "completed" });
      setTasks(prevTasks => prevTasks.map(task => 
        task._id === taskId ? { ...task, status: "completed" } : task
      )); // ✅ Ensure proper state update
    } catch (err) {
      setError("Failed to update task");
    }
  };

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <Container fluid>
      <Row>
        <Col md={12} className="p-4">
          <h2 className="mb-3">Welcome Back! 👋</h2>
          <p className="text-muted">Here’s a quick summary of your tasks.</p>

          {/* Task Summary Cards */}
          <Row className="g-3">
            <Col md={4}>
              <Card className="shadow-sm p-3 border-0">
                <Card.Body>
                  <h5 className="text-primary">Total Tasks</h5>
                  <p className="fs-3 fw-bold">{tasks.length}</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="shadow-sm p-3 border-0">
                <Card.Body>
                  <h5 className="text-warning">Pending Tasks</h5>
                  <p className="fs-3 fw-bold">{tasks.filter(task => task.status === "pending").length}</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="shadow-sm p-3 border-0">
                <Card.Body>
                  <h5 className="text-success">Completed Tasks</h5>
                  <p className="fs-3 fw-bold">{tasks.filter(task => task.status === "completed").length}</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Task List (Pending Tasks) */}
          <div className="mt-4">
            <h4 className="mb-3">Upcoming Tasks</h4>
            {tasks.filter(task => task.status === "pending").length === 0 ? (
              <p className="text-muted">No pending tasks! 🎉</p>
            ) : (
              <ListGroup>
                {tasks.filter(task => task.status === "pending").map(task => (
                  <ListGroup.Item key={task._id} className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{task.name}</strong>
                      <p className="mb-0 text-muted">{task.description}</p>
                    </div>
                    <Button variant="success" size="sm" onClick={() => markAsDone(task._id)}>
                      ✅ Done
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </div>

          {/* Add Task Button */}
          <div className="mt-4">
            <Button variant="primary" onClick={() => setShowModal(true)}>
              ➕ Add New Task
            </Button>
          </div>
        </Col>
      </Row>

      {/* Add Task Modal */}
      <AddTaskModal show={showModal} handleClose={() => setShowModal(false)} addTask={addTask} />
    </Container>
  );
};

export default Dashboard;







