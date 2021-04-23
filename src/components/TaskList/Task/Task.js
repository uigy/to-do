import React, { useEffect, useRef } from "react";
import "./Task.scss";
import Checkbox from "../../Checkbox";
import { useTasks } from "../../../context/TasksContext";
// import LazyLoad, { forceCheck } from "react-lazyload";

const Task = ({ id, text, isComplete, selectedTask, setSelectedTask }) => {
  const { tasks, updateTasks } = useTasks();

  const taskElement = useRef(null);

  useEffect(() => {
    const handleTaskClickOutside = (event) => {
      if (taskElement.current && !taskElement.current.contains(event.target)) {
        setSelectedTask(null);
      }
    };

    document.addEventListener("mousedown", handleTaskClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleTaskClickOutside);
    };
  }, [taskElement]);

  // useEffect(() => {
  //   forceCheck();
  // }, [tasks]);

  const handleCheckboxChange = (event) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        const updatedTask = {
          ...task,
          isComplete: event.target.checked,
        };
        return updatedTask;
      }
      return task;
    });
    updateTasks(newTasks);
  };

  const handleDeleteButtonClick = () => {
    if (confirm("Are you sure you want to delete this item?")) {
      const newTasks = tasks.filter((task) => task.id !== id);
      updateTasks(newTasks);
    }
  };

  const handleInputChange = (event) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        const updatedTask = {
          ...task,
          text: event.target.value,
        };
        return updatedTask;
      }
      return task;
    });
    updateTasks(newTasks);
  };

  const handleInputClick = () => {
    setSelectedTask(id);
  };

  return (
    // <LazyLoad classNamePrefix="task" height={50} overflow={true} resize={true}>
    <div className="task-wrapper">
      <div
        className={`task${selectedTask === id ? " task--active" : ""}${
          isComplete ? " task--completed" : ""
        }`}
        ref={taskElement}
      >
        <span className="task-checkbox">
          <Checkbox checked={isComplete} onChange={handleCheckboxChange} />
        </span>

        <span className="task-text">
          <input
            type="text"
            className="task-text-input"
            value={text}
            onChange={handleInputChange}
            onClick={handleInputClick}
          />
        </span>
        <span className="task-delete">
          <button className="delete-button" onClick={handleDeleteButtonClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="delete-icon"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </button>
        </span>
      </div>
    </div>
    // </LazyLoad>
  );
};

export default Task;
