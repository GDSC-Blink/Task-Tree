"use client";

import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Task } from "./task";
import Column from "./Column";

const KanbanBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Sync tasks from Firestore in real-time
  useEffect(() => {
    const q = query(collection(db, "tasks"), orderBy("createdAt")); // Get items from our collection ordered by the time it was created
    const unsubscribe = onSnapshot(q, (snapshot) => { // real time listener for firebase changes
      const fetchedTasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Task[];
      setTasks(fetchedTasks);
    });

    return () => unsubscribe();
  }, []);

  // Add new task to Firestore
  
const addTask = async (status: Task["status"]) => {
  await addDoc(collection(db, "tasks"), { // create our new collection and add tasks into it
    title: "",
    description: "",
    priority: "Low",
    status,
    createdAt: serverTimestamp(), //Track time this task was added
  });
};

  // Delete task by Firestore doc ID
  const deleteTask = async (id: string) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  // Update task fields in Firestore
  const updateTask = async (updated: Task) => { // retrieved task object with its updated fields
    if (!updated.id) return;
    const { id, ...taskData } = updated;
    await updateDoc(doc(db, "tasks", id), taskData); // update them in the database
  };

  return (
    <div className="flex justify-center p-8">
      <div className="flex gap-8">
        <Column
          title="To Do"
          columnId="todo"
          tasks={tasks.filter((t) => t.status === "todo")}
          onAddTask={addTask}
          onDeleteTask={deleteTask}
          onUpdateTask={updateTask}
        />
        <Column
          title="In Progress"
          columnId="inprogress"
          tasks={tasks.filter((t) => t.status === "inprogress")}
          onAddTask={addTask}
          onDeleteTask={deleteTask}
          onUpdateTask={updateTask}
        />
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
