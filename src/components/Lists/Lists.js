import React from "react";
import "./Lists.scss";
import { useLists } from "../../context/ListsContext";
import ListItem from "./ListItem";
import AddListItem from "./AddListItem";

const Lists = () => {
  const { lists } = useLists();
  return (
    <nav className="nav">
      <AddListItem />
      {lists.length > 0 && (
        <ul className="lists">
          {lists.map((listItem) => (
            <ListItem
              key={listItem.id}
              id={listItem.id}
              title={listItem.title}
              count={listItem.tasks.length}
            />
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Lists;
