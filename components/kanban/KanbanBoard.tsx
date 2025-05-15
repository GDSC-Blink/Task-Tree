"use client";

import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Task } from "./task";
import Column from "./Column";

const KanbanBoard: React.FC = () => {
  // Store all our tasks 
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "",
      description: "",
      priority: "High",
      status: "todo",
    },
    {
      id: 2,
      title: "",
      description: "",
      priority: "Medium",
      status: "inprogress",
    },
    {
      id: 3,
      title: "",
      description: "",
      priority: "Low",
      status: "done",
    },
  ]);
  // Create separate id for every new task
  const [nextId, setNextId] = useState(4);

  const addTask = (status: Task["status"]) => {
    // Creating a new task 
    const newTask: Task = {
      id: nextId,
      title: "",
      description: "",
      priority: "Low",
      status,
    };
    // update tasks in our array
    setTasks((prev) => [...prev, newTask]);
    // increment our id
    setNextId((prev) => prev + 1);
  };
 // take id number and filter out of the task
  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const updateTask = (updated: Task) => {
    setTasks((prev) =>
      // if id match update our task in the tasklist otherwise keep the same
      prev.map((task) => (task.id === updated.id ? updated : task))
    );
  };

  return (
    <div className="flex justify-center p-8">
      <div className="flex gap-8">
        {/* TO DO COLUMN */}
        <Column
          title="To Do"
          columnId="todo"
          tasks={tasks.filter((t) => t.status === "todo")}
          onAddTask={addTask}
          onDeleteTask={deleteTask}
          onUpdateTask={updateTask}
        />
        {/* IN PROGRESS COLUMN */}
        <Column
          title="In Progress"
          columnId="inprogress"
          tasks={tasks.filter((t) => t.status === "inprogress")}
          onAddTask={addTask}
          onDeleteTask={deleteTask}
          onUpdateTask={updateTask}
        />
        {/* DONE COLUMN */}
        <Column
          title="Done"
          columnId="done"
          tasks={tasks.filter((t) => t.status === "done")}
          onAddTask={addTask}
          onDeleteTask={deleteTask}
          onUpdateTask={updateTask}
        />
      </div>
    </div>
  );
};

export default KanbanBoard;
