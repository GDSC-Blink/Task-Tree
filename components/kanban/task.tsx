export type Task = {
  id?: string;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'todo' | 'inprogress' | 'done';
    createdAt?: any; 
};