import React, { useState } from 'react';
import { Grid, Table, Button, Modal } from 'semantic-ui-react';
import TaskForm from './TaskForm';



function TaskTable({ tasks, handleCreateOrUpdateTask, handleDeleteTask }) {
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  const showDeleteModal = (task) => {
    setTaskToDelete(task);
    setOpenDelete(true);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      handleDeleteTask(taskToDelete.id);
      setOpenDelete(false);
      setTaskToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setOpenDelete(false);
    setTaskToDelete(null);
  };

  const showUpdateModal = (task) => {
    setTaskToUpdate(task);
    setOpenUpdate(true);
  };

  const handleConfirmUpdate = (updatedTask) => {
    if (taskToUpdate) {
      handleCreateOrUpdateTask(updatedTask, taskToUpdate.id);
      setOpenUpdate(false);
      setTaskToUpdate(null);
    }
  };

  const handleCancelUpdate = () => {
    setOpenUpdate(false);
    setTaskToUpdate(null);
  };

  let taskList;
  if (tasks && tasks.length === 0) {
    taskList = (
      <Table.Row key='no-task'>
        <Table.Cell collapsing textAlign='center' colSpan='5'>No task</Table.Cell>
      </Table.Row>
    );
  } else {
    if (tasks) {
      taskList = tasks.map(task => {
        return (
          <Table.Row key={task.id}>
            <Table.Cell collapsing>
              <Button
                circular
                color='red'
                size='small'
                icon='trash'
                onClick={() => showDeleteModal(task)}
              />
              <Button
                circular
                color='blue'
                size='small'
                icon='edit'
                onClick={() => showUpdateModal(task)}
              />
            </Table.Cell>
            <Table.Cell>{task.title}</Table.Cell>
            <Table.Cell>{task.description}</Table.Cell>
            <Table.Cell>{task.status}</Table.Cell>
            <Table.Cell>{task.dueDate}</Table.Cell>
          </Table.Row>
        );
      });
    }
  }

  return (
    <>
      <Grid stackable divided>
        <Grid.Row columns='2'>
          <Grid.Column>
            <TaskForm handleCreateOrUpdateTask={handleCreateOrUpdateTask} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Table compact striped selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1} />
            <Table.HeaderCell width={3}>Title</Table.HeaderCell>
            <Table.HeaderCell width={5}>Description</Table.HeaderCell>
            <Table.HeaderCell width={2}>Status</Table.HeaderCell>
            <Table.HeaderCell width={2}>Due Date</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {taskList}
        </Table.Body>
      </Table>
      <Modal
        open={openDelete}
        onClose={handleCancelDelete}
        size='small'
      >
        <Modal.Header>Delete Task</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete this task?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={handleCancelDelete}>
            No
          </Button>
          <Button positive onClick={handleConfirmDelete}>
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
      <Modal
        open={openUpdate}
        onClose={handleCancelUpdate}
        size='small'
      >
        <Modal.Header>Update Task</Modal.Header>
        <Modal.Content>
          <TaskForm
            task={taskToUpdate}
            handleCreateOrUpdateTask={handleConfirmUpdate}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={handleCancelUpdate}>
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default TaskTable;
