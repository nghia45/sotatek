import React, { ChangeEvent, FC, useState } from "react";
import "./newTask.css";
import { ITask, priority } from "../../interfaces";
import "../../global.css";

type Props = {
  toDoList: ITask[];
  setToDoList: (arg?: any) => void;
};

const NewTask: FC<Props> = ({ toDoList, setToDoList }) => {
  const [task, setTask] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [priority, setPriority] = useState<string>("normal");

  const date = new Date();
  const defaultValue = date.toLocaleDateString("en-CA");

  const handleInput = (event: ChangeEvent<HTMLInputElement>): void => {
    switch (event.target.name) {
      case "task":
        setTask(event.target.value);
        break;
      case "duedate":
        setDueDate(event.target.value);
    }
  };

  const handleDescription = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setDescription(event.target.value);
  };

  const handlePriority = (event: ChangeEvent<HTMLSelectElement>): void => {
    setPriority(event.target.value);
  };

  const addTask = (): void => {
    if (task !== "" && toDoList.findIndex((obj) => obj.name === task) == -1) {
      const dueDateFormat = new Date(Date.parse(dueDate)).toLocaleDateString(
        "en-CA"
      );
      const newTask = {
        name: task,
        dueDate:
          dueDateFormat !== "Invalid Date" ? dueDateFormat : defaultValue,
        priority: priority,
        description: description,
      };
      const newToDoList = [...toDoList, newTask];
      newToDoList.sort(
        (a: ITask, b: ITask) => Date.parse(a.dueDate) - Date.parse(b.dueDate)
      );
      setToDoList(newToDoList);
      localStorage.setItem("todo", JSON.stringify(newToDoList));
      setTask("");
      setDueDate("");
      setDescription("");
      setPriority("normal");
    }
  };

  return (
    <div className="newTask">
      <h2>New Task</h2>
      <input
        type="text"
        placeholder="Add new task..."
        name="task"
        value={task}
        onChange={handleInput}
        required
      ></input>
      <label>Description</label>
      <textarea
        name="description"
        value={description}
        onChange={handleDescription}
        placeholder="Lorem Ipsum...."
      ></textarea>
      <div className="option_section">
        <div className="option">
          <label>Due Date</label>
          <input
            name="duedate"
            type="date"
            defaultValue={defaultValue}
            min={defaultValue}
            onChange={handleInput}
          ></input>
        </div>
        <div className="option">
          <label>Priority</label>
          <select name="priority" value={priority} onChange={handlePriority}>
            <option value="normal">Normal</option>
            <option value="low">Low</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
      <button className="primary_button" type="submit" onClick={addTask}>
        Add
      </button>
    </div>
  );
};

export default NewTask;
