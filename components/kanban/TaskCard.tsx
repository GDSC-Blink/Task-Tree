// components/TaskCard.tsx
"use client";
import React, { useEffect, useState } from "react";
import { Task } from "./task";

const priorityOptions: Task["priority"][] = ["Low", "Medium", "High"];

const priorityStyles = {
  Low: "bg-green-200 text-green-800",
  Medium: "bg-yellow-200 text-yellow-800",
  High: "bg-red-200 text-red-800",
};

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onUpdate: (updatedTask: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onUpdate }) => {
  // set current task details as the default values
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [editPriority, setEditPriority] = useState(task.priority);

  const handleBlur = () => {
    onUpdate({
      ...task, // take curent task but replace these fields to pass into our update tasks func when user changes input fields
      title: editTitle,
      description: editDescription,
      priority: editPriority,
    });
  };

  return (
    <div className="bg-white p-3 rounded-xl shadow mb-3 relative space-y-2">
      <input
        type="text"
        className="w-full font-semibold outline-none bg-transparent border-b border-gray-300 focus:border-blue-400"
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
        onBlur={handleBlur}
      />
      <textarea
        className="w-full text-sm text-gray-600 outline-none bg-transparent border-b border-gray-200 focus:border-blue-400"
        value={editDescription}
        onChange={(e) => setEditDescription(e.target.value)}
        onBlur={handleBlur}
      />
      {/* Priorities */}
      <select
        className={`text-xs px-2 py-1 rounded ${priorityStyles[editPriority]} outline-none`}
        value={editPriority}
        onChange={(e) => {
          // 
          setEditPriority(e.target.value as Task["priority"]);
          // update priority of the specific task
          onUpdate({ ...task, priority: e.target.value as Task["priority"] });
        }}
      >
        {priorityOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {/* Delete button  */}
      <button
        onClick={() => onDelete(task.id!)}
        className="absolute top-2 right-2 text-red-500 text-xs"
      >
        ✕
      </button>
    </div>
  );
};

export default TaskCard;
