import React, { useState } from 'react';
import './Main.css';
import TaskTemplate from '../../components/TaskTemplate/TaskTemplate.JSX';

const Main = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    setTasks([...tasks, <TaskTemplate key={tasks.length} />]);
  };

  return (
    <div className='container__elements'>
      <div className='container__data'>
        <header className='data__header'>
          <h1 id='data__title'>Listas de Tareas</h1>
          <button className='button--addTask' onClick={addTask}>Agregar Tarea</button>
        </header>
        <div className='section__elements'>
          {tasks}
        </div>
      </div>
    </div>
  );
};

export default Main;
