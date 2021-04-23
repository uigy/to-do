import React, { useEffect, useRef, useState } from "react";
import "./TaskList.scss";
import AddTask from "./AddTask";
import Task from "./Task";
import { useTasks } from "../../context/TasksContext";
import { useLists } from "../../context/ListsContext";

const TaskList = () => {
  const { listTitle, tasks } = useTasks();
  const { activeList, setActiveList } = useLists();

  const [selectedTask, setSelectedTask] = useState(null);

  const activeTasks = tasks.filter((task) => !task.isComplete);
  const completedTasks = tasks.filter((task) => task.isComplete);

  const activeTasksElement = useRef(null);
  const completedTasksElement = useRef(null);

  const showTasks = (tasks) => {
    for (let i = 0; i < tasks.length; i++) {
      setTimeout(() => {
        tasks[i]?.classList.add("task-wrapper--show");
      }, 80 * i);
    }
  };

  useEffect(() => {
    if (activeTasksElement.current) {
      showTasks(activeTasksElement.current.children);
    }
    if (completedTasksElement.current) {
      showTasks(completedTasksElement.current.children);
    }
  }, [tasks]);

  const handleExitButtonClick = () => {
    document.querySelector(".sidebar").classList.add("sidebar--show");
    document
      .querySelector(".tasks-container")
      .classList.add("tasks-container--hide");
  };

  return (
    <div className="tasks-wrapper">
      {listTitle && (
        <div className="list-title">
          <h1 className="list-title-text">{listTitle}</h1>
          <span className="list-exit">
            <button className="exit-button" onClick={handleExitButtonClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="exit-icon"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
                />
                <path
                  fill-rule="evenodd"
                  d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
                />
              </svg>
            </button>
          </span>
        </div>
      )}
      {activeList && <AddTask />}
      {tasks.length > 0 && (
        <div className="tasks">
          <div className="active-tasks" ref={activeTasksElement}>
            {activeTasks.map((task) => (
              <Task
                key={task.id}
                id={task.id}
                text={task.text}
                isComplete={task.isComplete}
                selectedTask={selectedTask}
                setSelectedTask={setSelectedTask}
              />
            ))}
          </div>
          {activeTasks.length > 0 && completedTasks.length > 0 && (
            <div className="tasks-divider"></div>
          )}
          {completedTasks.length > 0 && (
            <div className="completed-tasks" ref={completedTasksElement}>
              <h2 className="completed-tasks-header">Completed</h2>
              {completedTasks.map((task) => (
                <Task
                  key={task.id}
                  id={task.id}
                  text={task.text}
                  isComplete={task.isComplete}
                  selectedTask={selectedTask}
                  setSelectedTask={setSelectedTask}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskList;
