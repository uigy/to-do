import React from "react";
import "./ListItem.scss";
import { useLists } from "../../../context/ListsContext";
import { isMobile } from "react-device-detect";

const ListItem = ({ id, title, count }) => {
  const { lists, setLists, activeList, setActiveList } = useLists();

  const handleListItemClick = () => {
    setActiveList(id);
    if (isMobile) {
      document
        .querySelector(".tasks-container")
        .classList.remove("tasks-container--hide");
      document.querySelector(".sidebar").classList.remove("sidebar--show");
    }
  };

  const handleDeleteButtonClick = (event) => {
    event.stopPropagation();
    if (confirm("Are you sure you want to delete this list?")) {
      const newLists = lists.filter((list) => list.id !== id);
      setActiveList(newLists[0]?.id);
      setLists(newLists);
    }
  };

  return (
    <li
      className={`list-item ${activeList === id ? "list-item--active" : ""}`}
      onClick={handleListItemClick}
    >
      <span className="list-item-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="list-icon"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"
          />
        </svg>
      </span>
      <span className="list-item-title">{title}</span>
      <span className="list-item-count">{count}</span>
      <span className="list-delete">
        <button
          className="list-delete-button"
          onClick={handleDeleteButtonClick}
        >
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
    </li>
  );
};

export default ListItem;
