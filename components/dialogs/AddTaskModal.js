// components/dialogs/AddTaskModal.js
import React, { useState } from 'react';
import { addTaskToFirebase } from '../../lib/firebaseActions';
import { toast } from 'react-toastify';

const AddTaskModal = ({ isOpen, onClose }) => {
  const [task, setTask] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addTaskToFirebase({ title: task, completed: false });
      setTask('');
      onClose();
      toast.success('Task added successfully!');
    } catch (error) {
      toast.error('Error adding task: ' + error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a new task"
            required
          />
          <button type="submit">Add Task</button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
