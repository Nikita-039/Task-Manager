import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import CompletedTasks from "./pages/CompletedTasks";
import Profile from "./pages/Profile";
import { getTasks } from "./api";  // ✅ Import API to fetch tasks

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await getTasks();
        setTasks(data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };
    fetchTasks();
  }, []);

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <div className="container-fluid flex-grow-1 d-flex">
          <MainContent tasks={tasks} setTasks={setTasks} />
        </div>
        <Footer />
      </div>
    </Router>
  );
};

const MainContent = ({ tasks, setTasks }) => {
  const location = useLocation();
  const isDashboardPage = ["/dashboard", "/tasks", "/completed"].includes(location.pathname);

  return (
    <div className="d-flex w-100">
      {isDashboardPage && <Sidebar />}
      <div className="flex-grow-1 p-4">
        <Routes>
          <Route path="/dashboard" element={<Dashboard tasks={tasks} setTasks={setTasks} />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/completed" element={<CompletedTasks tasks={tasks} setTasks={setTasks} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
