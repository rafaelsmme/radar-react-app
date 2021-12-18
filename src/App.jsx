import React, { useEffect, useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap-css-only";
import Nav from "commonComponents/Nav";
import NewTaskForm from "addTask/NewTaskForm";
import EditTaskForm from "editTask/EditTaskForm";
import taskStorage from "storageService";
import TaskList from "taskList/TaskList";

const data = [];

function App() {
  const [tasks, setStasks] = useState(taskStorage.getAllTasks());

  const handleAddNewTask = (newTask) => {
    taskStorage.addtask(newTask);
    setStasks([...taskStorage.getAllTasks()]);
  };

  const handleDelete = (taskId) => {
    taskStorage.deleteTask(taskId);
    setStasks([...taskStorage.getAllTasks()]);
  };

  const handleAddExec = (taskId, nextExec) => {
    taskStorage.addExec(taskId, nextExec);
    setStasks([...taskStorage.getAllTasks()]);
  };

  return (
    <>
      <Router>
        <Nav title={"Task Radar"} disableAdd={false} />
        <div className="container-fluid p-3">
          <div className="row mb-3">
            <Switch>
              <Route exact path="/">
                <TaskList tasks={tasks} />
              </Route>
              <Route path="/add">
                <NewTaskForm onSubmit={handleAddNewTask} />
              </Route>
              <Route path="/edit/:id">
                <EditTaskForm
                  onSave={handleAddNewTask}
                  onDelete={handleDelete}
                  onAddExec={handleAddExec}
                />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
