import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "bootstrap-css-only";
import Nav from "commonComponents/Nav";
import NewTaskForm from "addTask/NewTaskForm";
import EditTaskForm from "editTask/EditTaskForm";
import taskStorage from "storageService";
import TaskList from "taskList/TaskList";
import { useAuth } from "Auth/Auth";

function App() {
  const [tasks, setTasks] = useState([]);
  const auth = useAuth();
  let location = useLocation();

  // if (!auth.isLoggedIn) {
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }

  useEffect(async () => {
    const result = await taskStorage.getAllTasks();
    setTasks(result);
  }, []);

  const handleAddNewTask = async (newTask) => {
    await taskStorage.addTask(newTask);
    const t = await taskStorage.getAllTasks();
    setTasks([...t]);
  };

  const handleDelete = async (taskId) => {
    await taskStorage.deleteTask(taskId);
    const t = await taskStorage.getAllTasks();
    setTasks([...t]);
  };

  const handleAddExec = async (taskId, nextExec) => {
    await taskStorage.addExec(taskId, nextExec);
    const t = await taskStorage.getAllTasks();
    setTasks([...t]);
  };

  const handleUpdate = async (newTask) => {
    await taskStorage.updateTask(newTask);
    const t = await taskStorage.getAllTasks();
    console.log("update", t);
    setTasks([...t]);
  };
  return (
    <>
      <Nav title={"Task Radar"} disableAdd={false} />
      <div className="container-fluid p-3">
        <div className="row mb-3">
          <Routes>
            <Route exact path="/" element={<TaskList tasks={tasks} />} />
            <Route
              path="/add"
              element={<NewTaskForm onSubmit={handleAddNewTask} />}
            />
            <Route
              path="/edit/:id"
              element={
                <EditTaskForm
                  onSave={handleUpdate}
                  onDelete={handleDelete}
                  onAddExec={handleAddExec}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
