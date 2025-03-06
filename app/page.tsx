import StatsComponent from "@/components/stats";
import ToDoComponent from "@/components/todo";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-8">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p>
          Welcome to your Task Tree dashboard. Your productivity journey starts here!
        </p>
      </header>
      {/* This container fills the remaining space below the header */}
      <div className="relative flex-grow">
        {/* Top-left widget */}
        <div className="absolute top-5 left-5">
          <ToDoComponent></ToDoComponent>
        </div>
        {/* Top-right widget */}
        <div className="absolute top-5 right-5">
          <StatsComponent></StatsComponent>
        </div>
        {/* Bottom-left widget */}
        <div className="absolute bottom-5 left-5">
          <ToDoComponent></ToDoComponent>
        </div>
        {/* Bottom-right widget */}
        <div className="absolute bottom-5 right-5">
          <StatsComponent></StatsComponent>
        </div>
      </div>
    </div>
  );
}