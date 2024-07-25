import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import TaskTable from './TaskTable';
import { useAuth } from '../context/Auth';
import { authApi } from '../misc/authApi';
import { taskApi } from '../misc/taskApi';
import { handleLogError } from '../misc/helper';

function TaskPage() {
  const Auth = useAuth();
  const user = Auth.getUser();

  const [currentUser, setCurrentUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      try {
        const userResponse = await authApi.getCurrentUser(user);
        const tasksResponse = await taskApi.getTasks(user);
        setCurrentUser(userResponse.data);
        setTasks(tasksResponse.data);
      } catch (error) {
        handleLogError(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [user]);

  const handleCreateOrUpdateTask = async (task, editTaskId = null) => {
    try {
      if (editTaskId) {
        await taskApi.updateTask(user, editTaskId, task);
      } else {
        await taskApi.createTask(user, task);
      }
      await fetchCurrentUserData();
    } catch (error) {
      handleLogError(error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await taskApi.deleteTask(user, taskId);
      await fetchCurrentUserData();
    } catch (error) {
      handleLogError(error);
    }
  };

  const fetchCurrentUserData = async () => {
    setIsLoading(true);

    try {
      const userResponse = await authApi.getCurrentUser(user);
      const tasksResponse = await taskApi.getTasks(user);
      setCurrentUser(userResponse.data);
      setTasks(tasksResponse.data);
    } catch (error) {
      handleLogError(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentUser) {
    return null;
  }

  return (
    <Container>
      <TaskTable
        tasks={tasks}
        isLoading={isLoading}
        handleCreateOrUpdateTask={handleCreateOrUpdateTask}
        handleDeleteTask={handleDeleteTask}
      />
    </Container>
  );
}

export default TaskPage;
