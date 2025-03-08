import React from 'react';

interface CourseCardProps {
  course: {
    name: string;
    units: number;
    grade: string;
    percentage?: number;
  };
  onEdit: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onEdit }) => (
  <div className="border p-4 flex flex-col justify-between items-start h-32 w-full rounded-lg">
    <div>
      <p className="font-bold">{course.name}</p>
      <p>Unit: {course.units}</p>
      <p>Grade: {course.percentage !== undefined ? `${course.percentage}% (${course.grade})` : course.grade}</p>
    </div>
    <button onClick={onEdit} className="text-blue-500 text-sm mt-auto self-end hover:text-blue-700 transition duration-200">
      Edit
    </button>
  </div>
);

export default CourseCard;