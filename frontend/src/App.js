import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import AddTask from "./components/AddTask";
import "./App.css";
import ListTasks from "./components/ListTasks";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./components/Card";
import AlertSuccess from "./components/Alerts/AlertSuccess";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskAdded, setTaskAdded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    const res = await axios.get("http://localhost:4000/api/tasks");
    setTasks(res.data);
  };

  const getCurrentTasks = () => {
    getTasks();
  };

  const onShowAlert = () => {
    setIsVisible(true);
    window.setTimeout(() => {
      setIsVisible(false);
    }, 2000);
  };

  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={
            <Card className="container">
              <AlertSuccess isVisible={isVisible} />
              <AddTask
                onAddTask={getCurrentTasks}
                onShowAlert={onShowAlert}
                AddOrChange="Add"
              />
              <ListTasks
                tasks={tasks}
                onDeleteTask={getCurrentTasks}
                taskAdded={taskAdded}
              />
            </Card>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <Card>
              <AddTask onAddTask={getCurrentTasks} AddOrChange="Change" />
            </Card>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
