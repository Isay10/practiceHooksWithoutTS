import React, { useState } from "react";
import "./App.css";
import { TaskBanner } from "./components/TaskBanner";
import { TaskCreator } from "./components/TaskCreator";
import TaskRow from "./components/TaskRow";

function App() {
  const [userName, setUserName] = useState("SuperDigital");
  const [taskItems, setTaskItems] = useState([
    { name: "Task One", done: false },
    { name: "Task Two", done: false },
    { name: "Task Three", done: false },
    { name: "Task Four", done: true },
  ]);


   const createNewTask = (taskName) => {
     
    if (taskName.name === taskItems.name) {
    }
  };
 
  const taskTableRows = () => {
    return taskItems.map((task) => (
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
      <TaskBanner userName={userName} taskItems={taskItems.length} />
      <TaskCreator /* callback={createNewTask} */ />
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Description</th>
            <th>Done</th>
          </tr>
        </thead>
        <tbody>{taskTableRows()}</tbody>
      </table>
    </div>
  );
}

export default App;
