import React from "react";
import "./App.scss";

const App = () => {
  return (
    <div id="container">
      <div className="sidebar">
        <div className="sidebar-header"></div>
        <div className="sidebar-content"></div>
      </div>
      <div id="main">
        <div className="tasks-container"></div>
      </div>
    </div>
  );
};

export default App;
