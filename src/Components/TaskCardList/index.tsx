import React, { FC } from "react";
import { ITask } from "../../interfaces";

type Props = {
  list: ITask[];
  deleteTask(arg: number): void;
};

const TaskCardList: FC<Props> = ({ list, deleteTask }) => {
  const handleDelete = (key: number) => {
    deleteTask(key);
  };
  return (
    <div className="TaskCardList">
      {list.map(
        ({ name, description, dueDate, priority }: ITask, key: number) => {
          return (
            <div key={key}>
              <div className="taskCard">
                <input type="checkbox" />
                <div>{name}</div>
                <div className="button_group">
                  <button>Detail</button>
                  <button onClick={() => handleDelete(key)}>Remove</button>
                </div>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};

export default TaskCardList;
