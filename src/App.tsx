import React, { FC, useEffect, useState } from "react";
import "./App.css";
import NewTask from "./Components/NewTask";
import ToDoList from "./Components/ToDoList";
import { ITask } from "./interfaces";

const App: FC = () => {
  const [toDoList, setToDoList] = useState([] as ITask[]);

  useEffect(() => {
    const listInString = window.localStorage.getItem("todo");
    if (listInString) {
      _setToDoList(JSON.parse(listInString));
    }
  }, []);

  const _setToDoList = (list: ITask[]) => {
    setToDoList(list);
    //window.localStorage.setItem("todo", JSON.stringify(list));
    console.log(toDoList);
  };

  return (
    <div className="App">
      <NewTask toDoList={toDoList} setToDoList={setToDoList} />
      <ToDoList toDoList={toDoList} setToDoList={setToDoList} />
    </div>
  );
};

export default App;
