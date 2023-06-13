import React, {
  KeyboardEvent,
  FC,
  useState,
  useEffect,
  ChangeEvent,
} from "react";
import "./toDoList.css";
import { ITask } from "../../interfaces";
import TaskCard from "../TaskCard";
import "../../global.css";

type Props = {
  toDoList: ITask[];
  _setToDoList: (arg?: any) => void;
};

const ToDoList: FC<Props> = ({ toDoList, _setToDoList }) => {
  const [search, setSearch] = useState<string>("");
  const [checked, setChecked] = useState<string[]>([]);
  const [templist, setTemplist] = useState(toDoList as ITask[]);

  useEffect(() => {
    setTemplist(toDoList);
  }, [toDoList]);

  useEffect(() => {
    const filteredData = toDoList.filter((item) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });
    setTemplist(filteredData);
  }, [search]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.target.value);
  };

  const _setChecked = (taskname: string) => {
    const newChecked = [...checked, taskname];
    setChecked(newChecked);
    console.log(checked);
  };

  const _setUnChecked = (taskname: string) => {
    const newChecked = checked.filter((value) => value !== taskname);
    setChecked(newChecked);
    console.log(checked);
  };

  const deleteTask = (taskname: string) => {
    const updatedData = toDoList.filter((item) => item.name !== taskname);
    _setToDoList(updatedData);
  };

  const handleBulkDelete = () => {
    const newArray = toDoList.filter((item) => !checked.includes(item.name));
    _setToDoList(newArray);
    setChecked([]);
  };

  return (
    <div className="toDoList">
      <h2>To Do List</h2>
      <input
        name="search"
        type="search"
        value={search}
        placeholder="Search ..."
        onChange={handleSearch}
      ></input>
      <div className="taskList">
        {templist.map((task: ITask) => {
          return (
            <TaskCard
              task={task}
              key={task.name}
              deleteTask={deleteTask}
              setChecked={_setChecked}
              setUnChecked={_setUnChecked}
              toDoList={toDoList}
              _setToDoList={_setToDoList}
            />
          );
        })}
      </div>
      {checked.length !== 0 && templist.length !== 0 && (
        <div className="bulk">
          <label>Bulk Action</label>
          <div className="button_group">
            <button className="detail_button">Done</button>
            <button className="delete_button" onClick={handleBulkDelete}>
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToDoList;
