import React, { useState } from "react";
import "./AddTask.scss";
import { useTasks } from "../../../context/TasksContext";
import { v4 as uuidv4 } from "uuid";

const AddTask = () => {
  const { tasks, updateTasks } = useTasks();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter" && inputValue.length > 0) {
      addTask(inputValue);
      setInputValue("");
    }
  };

  const addTask = (text) => {
    const task = {
      id: uuidv4(),
      text,
      isComplete: false,
    };
    updateTasks([task, ...tasks]);
  };

  return (
    <div className="add-task">
      <span className="add-task-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="add-icon"
          viewBox="0 0 16 16"
        >
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
        </svg>
      </span>
      <input
        type="text"
        name="add-task-input"
        className="add-task-input"
        id="add-task-input"
        placeholder="New task"
        autoComplete="off"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />
    </div>
  );
};

export default AddTask;
