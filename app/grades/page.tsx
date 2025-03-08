"use client";
import { useState } from 'react';

interface Course {
  name: string;
  units: number;
  grade: string;
  percentage?: number;
}

const defaultGradeScale: { [key: number]: string } = {
  97: 'A+',
  93: 'A',
  90: 'A-',
  87: 'B+',
  83: 'B',
  80: 'B-',
  77: 'C+',
  73: 'C',
  70: 'C-',
  67: 'D+',
  63: 'D',
  60: 'D-',
  0: 'F',
};

const gradeToGPA: { [key: string]: number } = {
  'A+': 4.0,
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C': 2.0,
  'C-': 1.7,
  'D+': 1.3,
  'D': 1.0,
  'D-': 0.7,
  'F': 0.0,
};

const getLetterGrade = (percentage: number, gradeScale: { [key: number]: string }) => {
  for (const [minPercentage, grade] of Object.entries(gradeScale).reverse()) {
    if (percentage >= parseInt(minPercentage)) {
      return grade;
    }
  }
  return 'F';
};

export default function Grades() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [newCourse, setNewCourse] = useState<Course>({ name: '', units: 0, grade: '' });
  const [gradeScale, setGradeScale] = useState<{ [key: number]: string }>(defaultGradeScale);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddCourse, setIsAddCourse] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isGradeScaleOpen, setIsGradeScaleOpen] = useState(false);
  const [isPercentageInput, setIsPercentageInput] = useState(false);

  const handleAddCourse = () => {
    if (!newCourse.name || isNaN(newCourse.units) || newCourse.units <= 0) {
      setError('Please enter a valid course name and number of units.');
      return;
    }
    if (isPercentageInput) {
      const percentage = parseInt(newCourse.grade, 10);
      if (isNaN(percentage)) {
        setError('Please enter a valid percentage grade.');
        return;
      }
      newCourse.grade = getLetterGrade(percentage, gradeScale);
      newCourse.percentage = percentage;
    } else {
      if (!Object.values(gradeScale).includes(newCourse.grade)) {
        setError('Please enter a valid letter grade.');
        return;
      }
      newCourse.percentage = undefined;
    }
    setCourses([...courses, newCourse]);
    setNewCourse({ name: '', units: 0, grade: '' });
    setIsModalOpen(false);
    setError(null);
  };

  const handleEditCourse = (index: number) => {
    setEditingIndex(index);
    const course = courses[index];
    setNewCourse({ ...course }); // Create a copy of the course to avoid mutating the original
    setIsAddCourse(false);
    setIsModalOpen(true);
    setIsPercentageInput(course.percentage !== undefined); // Set the percentage input toggle based on the course
  };

  const handleSaveCourse = () => {
    if (!newCourse.name || isNaN(newCourse.units) || newCourse.units <= 0) {
      setError('Please enter a valid course name and number of units.');
      return;
    }
    if (isPercentageInput) {
      const percentage = parseInt(newCourse.grade, 10);
      if (isNaN(percentage)) {
        setError('Please enter a valid percentage grade.');
        return;
      }
      newCourse.grade = getLetterGrade(percentage, gradeScale);
      newCourse.percentage = percentage;
    } else {
      if (!Object.values(gradeScale).includes(newCourse.grade)) {
        setError('Please enter a valid letter grade.');
        return;
      }
      newCourse.percentage = undefined;
    }
    const updatedCourses = [...courses];
    if (editingIndex !== null) {
      updatedCourses[editingIndex] = newCourse;
      setCourses(updatedCourses);
      setEditingIndex(null);
      setNewCourse({ name: '', units: 0, grade: '' });
      setIsModalOpen(false);
      setError(null);
    }
  };

  const handleRemoveCourse = () => {
    if (editingIndex !== null) {
      const updatedCourses = courses.filter((_, index) => index !== editingIndex);
      setCourses(updatedCourses);
      setEditingIndex(null);
      setNewCourse({ name: '', units: 0, grade: '' });
      setIsModalOpen(false);
    }
  };

  const handleGradeChange = (value: string) => {
    if (isPercentageInput) {
      setNewCourse({ ...newCourse, percentage: parseInt(value), grade: value });
    } else {
      setNewCourse({ ...newCourse, grade: value, percentage: undefined });
    }
  };

  const calculateGPA = () => {
    const totalUnits = courses.reduce((sum, course) => sum + course.units, 0);
    const totalPoints = courses.reduce((sum, course) => {
      const grade = course.grade;
      return sum + (gradeToGPA[grade] * course.units);
    }, 0);
    return totalUnits ? (totalPoints / totalUnits).toFixed(2) : '0.00';
  };

  const handleOpenAddCourseModal = () => {
    setNewCourse({ name: '', units: 0, grade: '' });
    setIsAddCourse(true);
    setIsModalOpen(true);
    setIsPercentageInput(false); // Reset the percentage input toggle
  };

  return (
    <div className="flex flex-col items-center p-8 max-w-[1500px] w-full mx-auto">
      <h1 className="text-2xl font-bold mb-4">Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4 w-full">
        <div className="border p-4 flex flex-col justify-between items-start h-32 w-full rounded-lg">
          <div>
            <p className="font-bold">Total Courses: {courses.length}</p>
            <p>Total Units: {courses.reduce((sum, course) => sum + course.units, 0)}</p>
            <p>GPA: {calculateGPA()}</p>
          </div>
        </div>
        {courses.map((course, index) => (
          <div key={index} className="border p-4 flex flex-col justify-between items-start h-32 w-full rounded-lg">
            <div>
              <p className="font-bold">{course.name}</p>
              <p>Unit: {course.units}</p>
              <p>
                Grade: {course.percentage !== undefined ? `${course.percentage}% (${course.grade})` : course.grade}
              </p>
            </div>
            <button onClick={() => handleEditCourse(index)} className="text-blue-500 text-sm mt-auto self-end hover:text-blue-700 transition duration-200">Edit</button>
          </div>
        ))}
        <button onClick={handleOpenAddCourseModal} className="border-dashed border-2 border-gray-400 text-gray-400 p-4 flex justify-center items-center h-32 w-full rounded-lg hover:border-gray-600 hover:text-gray-600 transition duration-200">
          Add Course
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg w-2/3 flex">
            <div className="w-1/2 pr-4">
              <h2 className="text-2xl font-bold mb-4">{isAddCourse ? 'Add Course' : 'Edit Course'}</h2>
              <div className="mb-4">
                <label className="block mb-2">Course Name</label>
                <input
                  type="text"
                  placeholder="Course Name"
                  value={newCourse.name}
                  onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                  className="border p-2 mb-2 w-full rounded"
                />
                <label className="block mb-2">Units</label>
                <input
                  type="text"
                  placeholder="Units"
                  value={newCourse.units === 0 ? '' : newCourse.units}
                  onChange={(e) => setNewCourse({ ...newCourse, units: parseInt(e.target.value) || 0 })}
                  className="border p-2 mb-2 w-full rounded"
                />
                <label className="block mb-2">Grade</label>
                <div className="flex items-center mb-2">
                  <input
                    type="text"
                    placeholder="Grade"
                    value={isPercentageInput && newCourse.percentage !== undefined ? newCourse.percentage.toString() : newCourse.grade}
                    onChange={(e) => handleGradeChange(e.target.value)}
                    className="border p-2 w-full rounded"
                  />
                  {isPercentageInput && <span className="ml-2">%</span>}
                  <label className="ml-2">Percentage</label>
                  <input
                    type="checkbox"
                    checked={isPercentageInput}
                    onChange={() => setIsPercentageInput(!isPercentageInput)}
                    className="ml-2"
                  />
                </div>
                {error && <p className="text-red-500 mb-2">{error}</p>}
                <div className="flex justify-between space-x-2">
                  <button onClick={isAddCourse ? handleAddCourse : handleSaveCourse} className="bg-blue-500 text-white p-2 w-1/2 rounded hover:bg-blue-700 transition duration-200">
                    {isAddCourse ? 'Add' : 'Save'}
                  </button>
                  <button onClick={() => setIsModalOpen(false)} className="bg-gray-500 text-white p-2 w-1/2 rounded hover:bg-gray-700 transition duration-200">Cancel</button>
                </div>
                {!isAddCourse && (
                  <button onClick={handleRemoveCourse} className="bg-red-500 text-white p-2 w-full mt-2 rounded hover:bg-red-700 transition duration-200">
                    Remove
                  </button>
                )}
              </div>
            </div>
            {isPercentageInput && (
              <div className="w-1/2 pl-4 border-l">
                <button onClick={() => setIsGradeScaleOpen(!isGradeScaleOpen)} className="bg-gray-500 text-white p-2 w-full mt-2 rounded hover:bg-gray-700 transition duration-200">
                  {isGradeScaleOpen ? 'Hide Grade Scale' : 'Edit Grade Scale'}
                </button>
                {isGradeScaleOpen && (
                  <div className="mt-4 overflow-y-auto max-h-[400px]">
                    {Object.entries(gradeScale).map(([minPercentage, grade]) => (
                      <div key={minPercentage} className="flex items-center mb-2">
                        <label className="block w-1/3">{grade}</label>
                        <input
                          type="number"
                          value={minPercentage}
                          onChange={(e) => {
                            const newGradeScale = { ...gradeScale };
                            const grade = newGradeScale[parseInt(minPercentage)];
                            delete newGradeScale[parseInt(minPercentage)];
                            newGradeScale[parseInt(e.target.value)] = grade;
                            setGradeScale(newGradeScale);
                          }}
                          className="border p-2 w-2/3 rounded"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}