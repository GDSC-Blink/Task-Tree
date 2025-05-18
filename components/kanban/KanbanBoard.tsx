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
import { getAuth } from "firebase/auth";

const KanbanBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  // Get the authenticated user
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  // Sync tasks from Firestore in real-time
  useEffect(() => {
    if (!userId) return;

    const q = query(
      collection(db, "users", userId, "tasks"),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedTasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Task[];
      setTasks(fetchedTasks);
    });

    return () => unsubscribe();
  }, [userId]);

  // Add new task to Firestore
  const addTask = async (status: Task["status"]) => {
    if (!userId) return;
    await addDoc(collection(db, "users", userId, "tasks"), {
      title: "",
      description: "",
      priority: "Low",
      status,
      createdAt: serverTimestamp(),
    });
  };

  // Delete task by Firestore doc ID
  const deleteTask = async (id: string) => {
    if (!userId) return;
    await deleteDoc(doc(db, "users", userId, "tasks", id));
  };

  // Update task fields in Firestore
  const updateTask = async (updated: Task) => {
    if (!updated.id || !userId) return;
    const { id, ...taskData } = updated;
    await updateDoc(doc(db, "users", userId, "tasks", id), taskData);
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