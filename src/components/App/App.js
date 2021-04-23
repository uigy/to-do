import React from "react";
import "./App.scss";
import ListsProvider from "../../context/ListsContext";
import TasksProvider from "../../context/TasksContext";
import Lists from "../Lists";
import TaskList from "../TaskList";
import UserPanel from "../UserPanel";

const App = () => {
  return (
    <div id="container">
      <ListsProvider>
        <div className="sidebar">
          <div className="sidebar-header">
            <UserPanel />
          </div>
          <div className="sidebar-content">
            <Lists />
          </div>
        </div>
        <div className="tasks-container">
          <TasksProvider>
            <TaskList />
          </TasksProvider>
        </div>
      </ListsProvider>
    </div>
  );
};

export default App;
