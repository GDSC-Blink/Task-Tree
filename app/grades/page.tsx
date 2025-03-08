"use client";
import { useState, useEffect } from 'react';
import CourseSummaryCard from './components/CourseSummaryCard';
import GPADisplayCard from './components/GPADisplayCard';
import CourseCard from './components/CourseCard';
import AddEditCourseModal from './components/AddEditCourseModal';

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
  const [scaleError, setScaleError] = useState<string | null>(null);
  const [isGradeScaleOpen, setIsGradeScaleOpen] = useState(false);
  const [isPercentageInput, setIsPercentageInput] = useState(false);

  useEffect(() => {
    validateGradeScale();
  }, [gradeScale]);

  const validateGradeScale = () => {
    setScaleError(null);
    const entries = Object.entries(gradeScale);
    if (entries.length < 2) {
      setScaleError("Grade scale needs at least two grade levels");
      return false;
    }
    if (!gradeScale.hasOwnProperty('0') && !Object.keys(gradeScale).some(k => parseInt(k) <= 0)) {
      setScaleError("Grade scale must have a minimum threshold (typically 0 for F)");
      return false;
    }
    const grades = Object.values(gradeScale);
    const uniqueGrades = new Set(grades);
    if (uniqueGrades.size !== grades.length) {
      setScaleError("Each letter grade must be unique");
      return false;
    }
    const requiredGrades = ['A', 'B', 'C', 'D', 'F'];
    for (const grade of requiredGrades) {
      if (!grades.some(g => g.startsWith(grade))) {
        setScaleError(`Grade scale must include at least one grade starting with '${grade}'`);
        return false;
      }
    }
    const thresholds = Object.keys(gradeScale).map(k => parseInt(k)).sort((a, b) => a - b);
    for (let i = 0; i < thresholds.length - 1; i++) {
      if (thresholds[i] === thresholds[i + 1]) {
        setScaleError("Duplicate percentage thresholds are not allowed");
        return false;
      }
    }
    return true;
  };

  const validateAndProcessCourse = () => {
    if (!validateGradeScale()) {
      return null;
    }
    if (!newCourse.name || isNaN(newCourse.units) || newCourse.units <= 0) {
      setError('Please enter a valid course name and number of units.');
      return null;
    }
    const processedCourse = { ...newCourse };
    if (isPercentageInput) {
      const percentage = parseInt(newCourse.grade);
      if (isNaN(percentage)) {
        setError('Please enter a valid percentage grade.');
        return null;
      }
      processedCourse.grade = getLetterGrade(percentage, gradeScale);
      processedCourse.percentage = percentage;
    } else {
      if (!Object.values(gradeScale).includes(newCourse.grade)) {
        setError('Please enter a valid letter grade.');
        return null;
      }
      processedCourse.percentage = undefined;
    }
    return processedCourse;
  };

  const handleAddCourse = () => {
    const processedCourse = validateAndProcessCourse();
    if (!processedCourse) return;
    setCourses([...courses, processedCourse]);
    setNewCourse({ name: '', units: 0, grade: '' });
    setIsModalOpen(false);
    setError(null);
    setIsGradeScaleOpen(false);
  };

  const handleEditCourse = (index: number) => {
    setEditingIndex(index);
    const course = courses[index];
    setNewCourse({ ...course });
    setIsAddCourse(false);
    setIsModalOpen(true);
    setIsPercentageInput(course.percentage !== undefined);
    setIsGradeScaleOpen(false);
  };

  const handleSaveCourse = () => {
    const processedCourse = validateAndProcessCourse();
    if (!processedCourse || editingIndex === null) return;
    const updatedCourses = [...courses];
    updatedCourses[editingIndex] = processedCourse;
    setCourses(updatedCourses);
    setEditingIndex(null);
    setNewCourse({ name: '', units: 0, grade: '' });
    setIsModalOpen(false);
    setError(null);
    setIsGradeScaleOpen(false);
  };

  const handleRemoveCourse = () => {
    if (editingIndex !== null) {
      const updatedCourses = courses.filter((_, index) => index !== editingIndex);
      setCourses(updatedCourses);
      setEditingIndex(null);
      setNewCourse({ name: '', units: 0, grade: '' });
      setIsModalOpen(false);
      setIsGradeScaleOpen(false);
    }
  };

  const handleGradeChange = (value: string) => {
    setNewCourse({ ...newCourse, grade: value });
  };

  const calculateGPA = () => {
    const totalUnits = courses.reduce((sum, course) => sum + course.units, 0);
    const totalPoints = courses.reduce((sum, course) => {
      const grade = course.grade;
      return sum + (gradeToGPA[grade] * course.units);
    }, 0);
    return totalUnits ? (totalPoints / totalUnits).toFixed(2) : 'N/A';
  };

  const getGPAColor = (gpa: number) => {
    if (gpa >= 3.5) return '#4CAF50';
    if (gpa >= 3.0) return '#8BC34A';
    if (gpa >= 2.5) return '#CDDC39';
    if (gpa >= 2.0) return '#FFEB3B';
    if (gpa >= 1.0) return '#FF9800';
    return '#F44336';
  };

  const handleOpenAddCourseModal = () => {
    setNewCourse({ name: '', units: 0, grade: '' });
    setIsAddCourse(true);
    setIsModalOpen(true);
    setIsPercentageInput(false);
    setIsGradeScaleOpen(false);
  };

  const toggleGradeScaleForm = () => {
    setIsGradeScaleOpen(!isGradeScaleOpen);
  };

  const resetGradeScale = () => {
    setGradeScale(defaultGradeScale);
    setScaleError(null);
  };

  const gpaResult = calculateGPA();
  const currentGPA = gpaResult === 'N/A' ? 0 : parseFloat(gpaResult);
  const maxGPA = 4.0;
  const gpaPercentage = (currentGPA / maxGPA) * 100;
  const gpaColor = gpaResult === 'N/A' ? '#9e9e9e' : getGPAColor(currentGPA);
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (gpaPercentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center p-8 max-w-[1500px] w-full mx-auto">
      <h1 className="text-2xl font-bold mb-4">Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4 w-full">
        <CourseSummaryCard totalCourses={courses.length} totalUnits={courses.reduce((sum, course) => sum + course.units, 0)} />
        <GPADisplayCard
          gpaResult={gpaResult}
          gpaColor={gpaColor}
          radius={radius}
          circumference={circumference}
          strokeDashoffset={strokeDashoffset}
        />
        {courses.map((course, index) => (
          <CourseCard key={index} course={course} onEdit={() => handleEditCourse(index)} />
        ))}
        <button onClick={handleOpenAddCourseModal} className="border-dashed border-2 border-gray-400 text-gray-400 p-4 flex justify-center items-center h-32 w-full rounded-lg hover:border-gray-600 hover:text-gray-600 transition duration-200">
          Add Course
        </button>
      </div>
      {isModalOpen && (
        <AddEditCourseModal
          isAddCourse={isAddCourse}
          newCourse={newCourse}
          isPercentageInput={isPercentageInput}
          error={error}
          isGradeScaleOpen={isGradeScaleOpen}
          scaleError={scaleError}
          gradeScale={gradeScale}
          onClose={() => setIsModalOpen(false)}
          onSave={isAddCourse ? handleAddCourse : handleSaveCourse}
          onRemove={handleRemoveCourse}
          onGradeChange={handleGradeChange}
          onToggleGradeScaleForm={toggleGradeScaleForm}
          onResetGradeScale={resetGradeScale}
          onCourseChange={(field, value) => setNewCourse({ ...newCourse, [field]: value })}
          onTogglePercentageInput={() => {
            setIsPercentageInput(!isPercentageInput);
            setIsGradeScaleOpen(false);
            setNewCourse({ ...newCourse, grade: '' });
          }}
          onGradeScaleChange={(newGradeScale) => setGradeScale(newGradeScale)}
        />
      )}
    </div>
  );
}