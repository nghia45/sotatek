import React, { FC, useEffect, useState } from "react";
import "./App.css";
import NewTask from "./Components/NewTaskSection";
import ToDoList from "./Components/ToDoListSection";
import { ITask } from "./interfaces";

const App: FC = () => {
  const [toDoList, setToDoList] = useState([] as ITask[]);

  // useEffect(() => {
  //   window.localStorage.setItem("todo", JSON.stringify(toDoList));
  //   console.log(localStorage.todo);
  // }, [toDoList]);

  useEffect(() => {
    const listInString = window.localStorage.getItem("todo");
    if (listInString) {
      _setToDoList(JSON.parse(listInString));
    }
  }, []);

  const _setToDoList = (list: ITask[]) => {
    setToDoList(list);
    window.localStorage.setItem("todo", JSON.stringify(list));
  };

  return (
    <div className="App">
      <NewTask toDoList={toDoList} setToDoList={_setToDoList} />
      <ToDoList toDoList={toDoList} _setToDoList={_setToDoList} />
    </div>
  );
};

export default App;
