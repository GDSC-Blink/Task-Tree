"use client";
import React from 'react';
import Widget from './widget';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface GradesWidgetProps {
  totalCourses: number;
  totalUnits: number;
  gpa: number;
}

const GradesWidget: React.FC<GradesWidgetProps> = ({ totalCourses, totalUnits, gpa }) => {
  const maxGPA = 4.0;
  const gpaPercentage = (gpa / maxGPA) * 100;
  const gpaColor = gpa >= 3.0 ? '#4CAF50' : gpa >= 2.0 ? '#FFEB3B' : '#F44336';

  return (
    <Widget title="Grades">
      <div className="flex items-center">
        {/* Circular progress bar on the right */}
        <div className="w-[10vw] h-[10vh] mt-10 ml-20">
          <CircularProgressbar
            value={gpaPercentage}
            text={`${gpa.toFixed(2)}`}
            styles={buildStyles({
              pathColor: gpaColor,
              textColor: gpaColor,
            })}
          />
        </div>
        {/* Text on the left */}
        <div className="ml-16 mt-16 flex flex-col gap-2 justify-center" style={{ width: "40%" }}>
          <p className="font-bold">Total Courses: {totalCourses}</p>
          <p className="font-bold">Total Units: {totalUnits}</p>
        </div>
      </div>
    </Widget>
  );
};

export default GradesWidget;