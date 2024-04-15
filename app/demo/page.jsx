import React, { useState, useEffect } from 'react';
import { ToDoList } from '@/components/todos/ToDoList';
import AddTaskModal from '@/components/dialogs/AddTaskModal';
import { ToDoListItem } from '@/components/todos/ToDoListItem';
import { getToDoItems } from '@/lib/firebase/api';
import { addTaskToFirebase } from '@/lib/firebaseActions'; // make sure to create this function in the firebaseActions file
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DemoPage = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      const payload = await getToDoItems();
      setTasks(Object.entries(payload.todos || {}).reverse());
    };

    fetchTasks();
  }, []);

  const handleAddTask = async (task) => {
    try {
      await addTaskToFirebase(task);
      toast.success('Task added successfully!');
      setModalOpen(false);
      // Reload tasks after adding
      const payload = await getToDoItems();
      setTasks(Object.entries(payload.todos || {}).reverse());
    } catch (error) {
      toast.error('Error adding task: ' + error.message);
    }
  };

  return (
    <>
      <header className="text-center pt-28">
        <h2 className="text-5xl text-slate-900">Demo Page Component </h2>
      </header>
      <main className="max-w-md mx-auto py-24">
        <button onClick={() => setModalOpen(true)}>Add New Task</button>
        <ToDoList className="space-y-4 p-4 h-[478px] max-h-[478px] overflow-y-scroll shadow-sm rounded-md border border-neutral-200">
          {tasks.map(([id, task]) => (
            <ToDoListItem key={id} payload={task} uid={id} />
          ))}
        </ToDoList>
      </main>
      <AddTaskModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onAddTask={handleAddTask} />
      <ToastContainer />
    </>
  );
};

export default DemoPage;
