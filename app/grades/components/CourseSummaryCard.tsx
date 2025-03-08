import React from 'react';

interface CourseSummaryCardProps {
  totalCourses: number;
  totalUnits: number;
}

const CourseSummaryCard: React.FC<CourseSummaryCardProps> = ({ totalCourses, totalUnits }) => (
  <div className="border p-4 flex flex-col justify-center items-center h-32 w-full rounded-lg">
    <div className="text-center">
      <p className="font-bold">Total Courses: {totalCourses}</p>
      <p>Total Units: {totalUnits}</p>
    </div>
  </div>
);

export default CourseSummaryCard;