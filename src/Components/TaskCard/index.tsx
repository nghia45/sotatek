import React from "react";
import { ITask } from "../../interfaces";
import "./taskCard.css";

const TaskCard = ({ name, description, dueDate, priority }: ITask, deleteTask: void) => {

  const handleDelete = () => {
    deleteTask;
  }

  return (
    <div className="taskCard">
      <div>{name}</div>
      <div className="button_group">
        <button>Detail</button>
        <button onClick={handleDelete}>Remove</button>
      </div>
    </div>
  );
};

export default TaskCard;
