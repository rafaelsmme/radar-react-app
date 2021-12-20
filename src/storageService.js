import { parse, compareAsc } from "date-fns";
import config from "globalConfig.json";
import { v4 } from "uuid";

const taskStorage = (function () {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || {};
  let executions = JSON.parse(localStorage.getItem("executions")) || {};

  const addtask = (newTask) => {
    if (!newTask.id) {
      newTask.id = v4();
    }
    tasks[newTask.id] = { ...newTask };
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const sortTasks = () => {
    tasks.sort();
  };

  const getTask = (taskId) => {
    return tasks[taskId];
  };

  const getAllTasks = () => {
    return Object.values(tasks).sort((taskA, taskB) =>
      compareAsc(
        parse(taskA.next, config.dateFormat, new Date()),
        parse(taskB.next, config.dateFormat, new Date())
      )
    );
  };

  const deleteTask = (taskId) => {
    delete tasks[taskId];
    delete executions[taskId];
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("executions", JSON.stringify(executions));
  };

  const addExec = (taskId, nextExec) => {
    if (!executions[taskId]) executions[taskId] = [];
    executions[taskId].push(nextExec);
    localStorage.setItem("executions", JSON.stringify(executions));
  };

  return {
    getAllTasks,
    addtask,
    getTask,
    deleteTask,
    addExec,
  };
})();

export default taskStorage;
