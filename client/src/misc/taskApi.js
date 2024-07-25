import { instance, bearerAuth } from "./apiConfig";

export const taskApi = {
  getTasks,
  deleteTask,
  createTask,
  updateTask,
};

function getTasks(user) {
  const url = `/api/tasks`;
  return instance.get(url, {
    headers: { Authorization: bearerAuth(user) },
  });
}

function deleteTask(user, taskId) {
  return instance.delete(`/api/tasks/${taskId}`, {
    headers: { Authorization: bearerAuth(user) },
  });
}

function createTask(user, task) {
  return instance.post("/api/tasks", task, {
    headers: {
      "Content-type": "application/json",
      Authorization: bearerAuth(user),
    },
  });
}

function updateTask(user, taskId, updateTaskRequest) {
  return instance.put(`/api/tasks/${taskId}`, updateTaskRequest, {
    headers: {
      "Content-type": "application/json",
      Authorization: bearerAuth(user),
    },
  });
}
