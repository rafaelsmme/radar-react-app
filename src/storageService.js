import axios from "axios";
import { v4 } from "uuid";
import config from "globalConfig.json";
import Pool from "./Auth/UserPool";
const API_URL = config.apiUrl;

const taskStorage = (function () {
  // let tasks = JSON.parse(localStorage.getItem("tasks")) || {};
  let executions = JSON.parse(localStorage.getItem("executions")) || {};

  axios.interceptors.request.use(async (config) => {
    const token = await getSessionToken();
    config.headers.Authorization = token;

    return config;
  });

  const getSessionToken = async () => {
    return await new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser();
      if (user) {
        user.getSession((err, session) => {
          if (err) {
            reject();
          } else {
            resolve(session.accessToken.jwtToken);
          }
        });
      } else {
        reject();
      }
    });
  };

  const addTask = async (task) => {
    task.id = v4();
    return await axios.post(`${API_URL}/tasks`, task);
  };

  const getTask = async (taskId) => {
    return await axios
      .get(`${API_URL}/tasks/${taskId}`)
      .then((response) => response.data);
  };

  const getAllTasks = async () => {
    return await axios
      .get(`${API_URL}/tasks`)
      .then((response) => response.data);
  };

  const deleteTask = async (taskId) => {
    return await axios.delete(`${API_URL}/tasks/${taskId}`);
  };

  const updateTask = async (task) => {
    return await axios.put(`${API_URL}/tasks/${task.id}`, task);
  };

  const addExec = (taskId, nextExec) => {
    if (!executions[taskId]) executions[taskId] = [];
    executions[taskId].push(nextExec);
    localStorage.setItem("executions", JSON.stringify(executions));
  };

  return {
    getAllTasks,
    getTask,
    addTask,
    deleteTask,
    addExec,
    updateTask,
  };
})();

export default taskStorage;
