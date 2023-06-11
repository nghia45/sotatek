export interface ITask {
  name: string;
  dueDate: string;
  priority: string;
  description: string;
}

export interface IToDoList {
  tasks: ITask[];
}

export type priority = "normal" | "low" | "high";
