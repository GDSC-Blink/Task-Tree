"use client";
import { useState } from "react";
import Widget from "./widget";

type Priority = "high" | "mid" | "low";

interface Task {
  id: number;
  text: string;
  completed: boolean;
  priority: Priority;
}

const ToDoComponent = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Task 1", completed: false, priority: "high" },
    { id: 2, text: "Task 2", completed: false, priority: "mid" },
    { id: 3, text: "Task 3", completed: false, priority: "low" },
  ]);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState<Priority>("mid");

  const toggleTask = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    const newTaskObj: Task = {
      id: Date.now(), // simple unique id
      text: newTask,
      completed: false,
      priority: priority,
    };
    setTasks((prevTasks) => [...prevTasks, newTaskObj]);
    setNewTask("");
  };

  // Filter tasks by priority
  const highTasks = tasks.filter((task) => task.priority === "high");
  const midTasks = tasks.filter((task) => task.priority === "mid");
  const lowTasks = tasks.filter((task) => task.priority === "low");

  return (
    <Widget title="Todo">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* High Priority Section */}
        <div>
          <h4 className="font-bold mb-2">High Priority</h4>
          <ul className="list-disc pl-4">
            {highTasks.map((task) => (
              <li key={task.id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="mr-2"
                />
                <span className={task.completed ? "line-through text-gray-500" : ""}>
                  {task.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
        {/* Mid Priority Section */}
        <div>
          <h4 className="font-bold mb-2">Mid Priority</h4>
          <ul className="list-disc pl-4">
            {midTasks.map((task) => (
              <li key={task.id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="mr-2"
                />
                <span className={task.completed ? "line-through text-gray-500" : ""}>
                  {task.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
        {/* Low Priority Section */}
        <div>
          <h4 className="font-bold mb-2">Low Priority</h4>
          <ul className="list-disc pl-4">
            {lowTasks.map((task) => (
              <li key={task.id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="mr-2"
                />
                <span className={task.completed ? "line-through text-gray-500" : ""}>
                  {task.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Create New Task Form */}
      <div className="mt-4 flex flex-col md:flex-row items-center">
        <input
          type="text"
          placeholder="New task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="border rounded px-2 py-1 flex-grow mb-2 md:mb-0"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className="border rounded px-2 py-1 ml-0 md:ml-2 mb-2 md:mb-0"
        >
          <option value="high">High</option>
          <option value="mid">Mid</option>
          <option value="low">Low</option>
        </select>
        <button
          onClick={addTask}
          className="ml-0 md:ml-2 bg-gray-500 text-white px-4 py-1 rounded"
        >
          Create Task
        </button>
      </div>
    </Widget>
  );
};

export default ToDoComponent;