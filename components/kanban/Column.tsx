import React, { useState } from "react";
import TaskCard from "./TaskCard";
import { Task } from "./task";

interface ColumnProps {
  title: string;
  columnId: string;
  tasks: Task[];
  onAddTask: (status: Task["status"]) => void;
  onDeleteTask: (id: string) => void;
  onUpdateTask: (task: Task) => void;
}

export default function Column({
  title,
  columnId,
  tasks,
  onAddTask,
  onDeleteTask,
  onUpdateTask,
}: ColumnProps) {
  return (
    <div className="bg-gray-100 w-80 rounded-xl p-4 shadow-md">
      <h2 className="font-bold text-lg mb-4">{title}</h2>
      {/* Get the respective type of tasks and display all of htem */}
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDelete={onDeleteTask}
          onUpdate={onUpdateTask}
        />
      ))}
      {/* Add button for new tasks */}
      <button
        onClick={() => onAddTask(columnId as Task["status"])}
        className="text-blue-500 text-sm mt-2"
      >
        + Add Task
      </button>
    </div>
  );
}
