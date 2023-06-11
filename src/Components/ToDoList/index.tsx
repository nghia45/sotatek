import React, { KeyboardEvent, FC, useState, useEffect } from "react";
import "./toDoList.css";
import { ITask, IToDoList } from "../../interfaces";
import TaskCardList from "../TaskCardList";

type Props = {
  toDoList: ITask[];
  setToDoList: (arg?: any) => void;
};

const ToDoList: FC<Props> = ({ toDoList, setToDoList }) => {
  const [search, setSearch] = useState<string>("");
  const [chosen, setChosen] = useState<number[]>([]);

  const handleSearch = (event: KeyboardEvent<HTMLInputElement>): void => {
    //setSearch(event.target.value);
  };

  const deleteTask = (key: number) => {
    const tempList = [...toDoList];

    tempList.splice(key, 1);
    setToDoList(tempList);
  };

  return (
    <div className="toDoList">
      <h2>To Do List</h2>
      <input
        name="search"
        type="search"
        value={search}
        placeholder="Search ..."
        onKeyDown={handleSearch}
      ></input>
      <TaskCardList list={toDoList} deleteTask={deleteTask} />
      {chosen.length !== 0 && (
        <div className="bulk">
          <label>Bulk Action</label>
          <button>Done</button>
          <button>Remove</button>
        </div>
      )}
    </div>
  );
};

export default ToDoList;
