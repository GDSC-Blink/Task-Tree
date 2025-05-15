import GradesWidget from "@/components/GradesWidget";
import StatsComponent from "@/components/stats";
import ToDoComponent from "@/components/todo";

import React from "react";
import KanbanBoard from "../../components/kanban/KanbanBoard";

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold p-6">Dashboard</h1>
      <KanbanBoard />
    </div>
  );
};

export default DashboardPage;
