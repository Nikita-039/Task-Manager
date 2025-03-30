import React, { useState, useEffect } from "react";
import { Container, ListGroup, Alert } from "react-bootstrap";
import { getTasks } from "../api";  // Ensure this API function works

const CompletedTasks = ({ tasks, setTasks }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      try {
        const { data } = await getTasks();
        if (!data || !Array.isArray(data)) throw new Error("Invalid data format");

        setTasks(data.filter(task => task.status === "completed")); // ✅ Correct filtering
      } catch (err) {
        setError("Failed to load completed tasks!");
        console.error("Error fetching completed tasks:", err);
      }
    };
    fetchCompletedTasks();
  }, [setTasks]);

  return (
    <Container>
      <h2>Completed Tasks</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {!error && tasks.length === 0 ? (
        <p className="text-muted">No completed tasks found.</p>
      ) : (
        <ListGroup>
          {tasks.map(task => (
            <ListGroup.Item key={task._id}>{task.name}</ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default CompletedTasks;




