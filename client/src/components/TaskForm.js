import React, { useState, useEffect } from 'react';
import { Form, Dropdown, Button } from 'semantic-ui-react';

const statusOptions = [
  { key: 'todo', text: 'To Do', value: 'TODO' },
  { key: 'inprogress', text: 'In Progress', value: 'INPROGRESS' },
  { key: 'done', text: 'Done', value: 'DONE' }
];

function TaskForm({ task, handleCreateOrUpdateTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setStatus(task.status || '');
      setDueDate(task.dueDate || '');
    }
  }, [task]);

  const handleInputChange = (e, { name, value }) => {
    if (name === 'title') setTitle(value);
    else if (name === 'description') setDescription(value);
    else if (name === 'status') setStatus(value);
    else if (name === 'dueDate') setDueDate(value);
  };

  const handleSubmit = () => {
    const newTask = { title: title.trim(), description: description.trim(), status, dueDate };
    handleCreateOrUpdateTask(newTask);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Input
        name='title'
        placeholder='Title'
        value={title}
        onChange={handleInputChange}
      />
      <Form.Input
        name='description'
        placeholder='Description'
        value={description}
        onChange={handleInputChange}
      />
      <Dropdown
        name='status'
        placeholder='Status'
        selection
        options={statusOptions}
        value={status}
        onChange={handleInputChange}
      />
      <Form.Input
        name='dueDate'
        type='date'
        placeholder='Due Date'
        value={dueDate}
        onChange={handleInputChange}
      />
      <Button type='submit'>Submit</Button>
    </Form>
  );
}

export default TaskForm;
