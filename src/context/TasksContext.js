import React, { useContext, useEffect, useMemo, useState } from "react";
import { useLists } from "./ListsContext";

const TasksContext = React.createContext();

const TasksProvider = (props) => {
  const { lists, setLists, activeList } = useLists();

  const [tasks, setTasks] = useState([]);
  const [listTitle, setListTitle] = useState("");

  useEffect(() => {
    const list = lists.find((list) => list.id === activeList);
    if (list) {
      setTasks(list.tasks);
      setListTitle(list.title);
    } else {
      setTasks([]);
    }
  }, [activeList, lists]);

  const updateTasks = (tasks) => {
    const newLists = lists.map((list) => {
      if (list.id === activeList) {
        const updatedList = { ...list, tasks };
        return updatedList;
      }
      return list;
    });
    setLists(newLists);
  };

  const value = useMemo(() => {
    return { listTitle, tasks, setTasks, updateTasks };
  }, [tasks]);

  return <TasksContext.Provider value={value} {...props} />;
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context)
    throw new Error("useTasks can only be called inside of TasksProvider");
  return context;
};

export default TasksProvider;
