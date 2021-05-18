import React, { useEffect, useState } from "react";
import "./App.css";
import { TaskBanner } from "./components/TaskBanner";
import { TaskCreator } from "./components/TaskCreator";
//import TaskError from "./components/TaskError";
import TaskRow from "./components/TaskRow";
import {VisibilityControl} from "./components/VisibilityControl";

function App() {
  const [userName, setUserName] = useState("SuperDigital");
  const [taskItems, setTaskItems] = useState([
    { name: "Task One", done: false },
    { name: "Task Two", done: false },
    { name: "Task Three", done: false },
    { name: "Task Four", done: true },
  ]);

  const [showCompleted, setShowCompleted] = useState(true);


  //Equivalente a ComponentDidMount, va a ejecutarse ni bien se cargue la pagina
  useEffect(()=> {
    let data = localStorage.getItem('tasks');
    if(data !== null) {
      setTaskItems(JSON.parse(data));
    } else {
      setUserName("Soy un Ejempo")
      setTaskItems([
        // agregp datos de ejemplo
        { name: "Task One Example", done: false },
        { name: "Task Two Example", done: false },
        { name: "Task Three Example", done: false },
        { name: "Task Four Example", done: true },
      ])
    }
  },[])

  //Va a realizar una acción cada vez que taskItems cambie
  useEffect(()=>{
    localStorage.setItem('tasks', JSON.stringify(taskItems));
  }, [taskItems])

  const createNewTask = (taskName) => {
    if (!taskItems.find((t) => t.name === taskName)) {
      setTaskItems([...taskItems, { name: taskName, done: false }]);
    } else {
      alert(`Ya existe la tarea llamada: ${taskName}`);
    }
  };

  const taskTableRows = (doneValue) => {
    return taskItems
    .filter(task => task.done === doneValue)
    .map((task) => (
      <TaskRow task={task} key={task.name} toggleTask={toggleTask} />
    ));
  };

  const toggleTask = (task) => {
    setTaskItems(
      taskItems.map((t) => (t.name === task.name ? { ...t, done: !t.done } : t))
    );
  };

  return (
    <div className="App">
      <TaskBanner userName={userName} taskItems={taskItems} />
      <TaskCreator callback={createNewTask} />
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Description</th>
            <th>Done</th>
          </tr>
        </thead>
        <tbody>{taskTableRows(false)}</tbody>
      </table>
      <div className="bg-secondary-text-white text-center p-2">
        <VisibilityControl
          description="Completed Task"
          isChecked={showCompleted}
          callback={(checked) => setShowCompleted(checked)}
        />


        {
          showCompleted && (
            <table className="table table-striped table bordererd">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Done</th>
                </tr>
              </thead>
              <tbody>
                {taskTableRows(true)}
              </tbody>
            </table>
          )
        }


      </div>
    </div>
  );
}

export default App;
