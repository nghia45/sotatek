import React, { ChangeEvent, FC, useState } from "react";
import { ITask } from "../../interfaces";
import "../../global.css";
import EditForm from "../EditForm";
import "./taskCard.css";

type Props = {
  task: ITask;
  key: string;
  deleteTask(arg: string): void;
  setChecked(arg: string): void;
  setUnChecked(arg: string): void;
  toDoList: ITask[];
  _setToDoList: (arg?: any) => void;
};

const TaskCard: FC<Props> = ({
  task,
  key,
  deleteTask,
  setChecked,
  setUnChecked,
  toDoList,
  _setToDoList,
}) => {
  const [showEdit, setShowEdit] = useState<boolean>(false);

  const handleDelete = () => {
    deleteTask(task.name);
  };

  const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setChecked(task.name);
    } else {
      setUnChecked(task.name);
    }
  };

  const handleDetail = (arg?: any) => {
    setShowEdit(!showEdit);
  };

  return (
    <>
      <div className="TaskCard" key={key}>
        <div className="left_group">
          <input type="checkbox" onChange={(event) => handleCheck(event)} />
          <label>{task.name}</label>
        </div>
        <div className="button_group">
          <button className="detail_button" onClick={handleDetail}>
            Detail
          </button>
          <button className="delete_button" onClick={() => handleDelete()}>
            Remove
          </button>
        </div>
      </div>
      {showEdit && (
        <EditForm
          name={task.name}
          description={task.description}
          dueDate={task.dueDate}
          priority={task.priority}
          toDoList={toDoList}
          _setToDoList={_setToDoList}
        />
      )}
    </>
  );
};

export default TaskCard;
