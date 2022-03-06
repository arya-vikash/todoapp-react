import React, { useState } from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import {nanoid} from "nanoid";


const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks,setTasks]=useState(props.tasks);
  const [filter,setFilter]=useState('All');
  console.log(filter);
  function toggleTaskCompleted(id) {
    const updatedTasks=tasks.map(task=>{
      if(task.id==id) {
        return {...task,completed:!task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }
  function deleteTask(id) {
    const remainingTasks=tasks.filter(task=>task.id!=id);
    setTasks(remainingTasks);
  }
  function editTask(id,newName) {
    const editedTasks=tasks.map(task=>{
      if(task.id==id) {
        return {...task,name:newName}
      }
      return task;
    });
    setTasks(editedTasks);
  }
  function addTask(name){
    const newTask={id:"todo-"+nanoid(),name:name,completed:false};
    setTasks([...tasks,newTask]);
  }
  const headingText=`${tasks.length} task(s) remaining`;
  const tasklist=tasks.filter(FILTER_MAP[filter]).map(task=>(
    <Todo name={task.name} completed={task.completed} id={task.id} key={task.id} 
      toggleTaskCompleted={toggleTaskCompleted} 
      deleteTask={deleteTask}
      editTask={editTask}
    />
    
  ));
  const filterList=FILTER_NAMES.map(name=>(
    <FilterButton key={name} name={name} setFilter={setFilter}/>
  ));
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">
        {headingText}
      </h2>
      <ul role="list" className="todo-list stack-large stack-exception" aria-labelledby="list-heading" >
        {tasklist}
      </ul>
    </div>
  );
}


export default App;
