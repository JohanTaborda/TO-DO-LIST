import React, { useState, useEffect } from 'react';
import './Main.css';

import TaskTemplate from '../../components/TaskTemplate/TaskTemplate.JSX';

const Main = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = () => { //Json que me almacena los valores pertenecientes a las tareas. 
    const newTask = {
      id: tasks.length,
      handleVerified: false,
      textInput: "",
      prevText: "",
      textArea: "",
      prevTextArea: "",
      changeAcept: false,
      cardVisible: true,
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id, updatedTask) => {
    const updatedTasks = tasks.map(task => (task.id === id ? updatedTask : task));
    setTasks(updatedTasks);
  };

  return (
    <div className='container__elements'>
      <div className='container__data'>
        <header className='data__header'>
          <h1 id='data__title'>Listas de Tareas</h1>
          <button className='button--addTask' onClick={addTask}>Agregar Tarea</button>
        </header>
        <div className='section__elements'>
          {tasks.map(task => (
            <TaskTemplate
              key={task.id}
              task={task}
              updateTask={updateTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
