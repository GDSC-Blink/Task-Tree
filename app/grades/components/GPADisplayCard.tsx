import React from 'react';

interface GPADisplayCardProps {
  gpaResult: string;
  gpaColor: string;
  radius: number;
  circumference: number;
  strokeDashoffset: number;
}

const GPADisplayCard: React.FC<GPADisplayCardProps> = ({ gpaResult, gpaColor, radius, circumference, strokeDashoffset }) => (
  <div className="border p-4 flex flex-col justify-center items-center h-32 w-full rounded-lg">
    <p className="font-bold text-lg">GPA</p>
    <div className="relative">
      <svg width="80" height="80" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="#e6e6e6" strokeWidth="8" />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={gpaColor}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold" style={{ color: gpaColor }}>
          {gpaResult}
        </span>
      </div>
    </div>
  </div>
);

export default GPADisplayCard;