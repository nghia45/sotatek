export interface ITask {
  name: string;
  dueDate: string;
  priority: string;
  description: string;
}

export type priority = "normal" | "low" | "high";
