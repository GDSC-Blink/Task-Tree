import GradesWidget from "@/components/GradesWidget";
import StatsComponent from "@/components/stats";
import ToDoComponent from "@/components/todo";

export default function Dashboard() {
  // Mock data for the GradesWidget
  const totalCourses = 5;
  const totalUnits = 15;
  const gpa = 3.5;

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
          <ToDoComponent />
        </div>
        {/* Top-right widget */}
        <div className="absolute top-5 right-5">
          <StatsComponent />
        </div>
        {/* Bottom-left widget */}
        <div className="absolute bottom-5 left-5">
          <ToDoComponent />
        </div>
        {/* Bottom-right widget */}
        <div className="absolute bottom-5 right-5">
          <GradesWidget totalCourses={totalCourses} totalUnits={totalUnits} gpa={gpa} />
        </div>
      </div>
    </div>
  );
}