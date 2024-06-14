import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

  const addTask = () => {
    if (task && date && time) {
      const newTask = { task, date, time };
      setTasks([...tasks, newTask]);
      // Reset input fields
      setTask("");
      setDate("");
      setTime("");
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const startEditing = (index) => {
    setTask(tasks[index].task);
    setDate(tasks[index].date);
    setTime(tasks[index].time);
    setIsEditing(true);
    setCurrentTaskIndex(index);
  };

  const editTask = () => {
    const updatedTasks = tasks.map((t, i) =>
      i === currentTaskIndex ? { task, date, time } : t
    );
    setTasks(updatedTasks);
    setTask("");
    setDate("");
    setTime("");
    setIsEditing(false);
    setCurrentTaskIndex(null);
  };

  return (
    <div>
      <h1>To Do Application</h1>
      <div>
        <label htmlFor='task'>Task:</label>
        <input
          type='text'
          placeholder='Add a task'
          id='task'
          name='task'
          aria-label='task'
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='date'>Date:</label>
        <input
          type='date'
          id='date'
          name='date'
          aria-label='date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='time'>Time:</label>
        <input
          type='time'
          id='time'
          name='time'
          aria-label='time'
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>
      <button onClick={isEditing ? editTask : addTask}>
        {isEditing ? 'Update' : 'Add'}
      </button>
      <h2>Task List</h2>
      <ul>
        {tasks.map((t, index) => (
          <li key={index}>
            <strong>Task:</strong> {t.task} <br />
            <strong>Date:</strong> {t.date} <br />
            <strong>Time:</strong> {t.time} <br />
            <button onClick={() => startEditing(index)}>Edit</button>
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;