import React, { ChangeEvent, FC, useEffect, useState } from "react";
import "./editForm.css";
import { ITask } from "../../interfaces";

type Props = {
  name: string;
  description: string;
  dueDate: string;
  priority: string;
  toDoList: ITask[];
  _setToDoList: (arg?: any) => void;
};

const EditForm: FC<Props> = ({
  name,
  description,
  dueDate,
  priority,
  toDoList,
  _setToDoList,
}) => {
  const [_description, setDescription] = useState<string>("");
  const [_dueDate, setDueDate] = useState<string>("");
  const [_priority, setPriority] = useState<string>("");

  useEffect(() => {
    setDescription(description);
    setDueDate(dueDate);
    setPriority(priority);
  }, []);

  const date = new Date();
  const currentDate = date.toLocaleDateString("en-CA");
  const handleDescription = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setDescription(event.target.value);
  };

  const handlePriority = (event: ChangeEvent<HTMLSelectElement>): void => {
    setPriority(event.target.value);
  };

  const handleDate = (event: ChangeEvent<HTMLInputElement>): void => {
    setDueDate(event.target.value);
  };

  const EditTask = () => {
    const newToDoList = toDoList.map((obj) => {
      if (obj.name === name) {
        return {
          ...obj,
          dueDate: _dueDate,
          description: _description,
          priority: _priority,
        };
      }
      return obj;
    });
    newToDoList.sort(
      (a: ITask, b: ITask) => Date.parse(a.dueDate) - Date.parse(b.dueDate)
    );
    _setToDoList(newToDoList);
  };

  return (
    <div className="editForm">
      <label>Description</label>
      <textarea
        name="description"
        value={_description}
        onChange={handleDescription}
        placeholder="Lorem Ipsum...."
      ></textarea>
      <div className="option_section">
        <div className="option">
          <label>Due Date</label>
          <input
            name="duedate"
            type="date"
            defaultValue={_dueDate}
            min={currentDate}
            onChange={handleDate}
          ></input>
        </div>
        <div className="option">
          <label>Priority</label>
          <select name="priority" value={_priority} onChange={handlePriority}>
            <option value="normal">Normal</option>
            <option value="low">Low</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
      <button className="primary_button" type="submit" onClick={EditTask}>
        Update
      </button>
    </div>
  );
};

export default EditForm;
