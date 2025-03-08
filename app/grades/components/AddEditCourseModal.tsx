import React from 'react';
import GradeScaleForm from './GradeScaleForm';

interface AddEditCourseModalProps {
  isAddCourse: boolean;
  newCourse: {
    name: string;
    units: number;
    grade: string;
  };
  isPercentageInput: boolean;
  error: string | null;
  isGradeScaleOpen: boolean;
  scaleError: string | null;
  gradeScale: { [key: number]: string };
  onClose: () => void;
  onSave: () => void;
  onRemove: () => void;
  onGradeChange: (value: string) => void;
  onToggleGradeScaleForm: () => void;
  onResetGradeScale: () => void;
  onCourseChange: (field: string, value: string | number) => void;
  onTogglePercentageInput: () => void;
  onGradeScaleChange: (newGradeScale: { [key: number]: string }) => void;
}

const AddEditCourseModal: React.FC<AddEditCourseModalProps> = ({
  isAddCourse,
  newCourse,
  isPercentageInput,
  error,
  isGradeScaleOpen,
  scaleError,
  gradeScale,
  onClose,
  onSave,
  onRemove,
  onGradeChange,
  onToggleGradeScaleForm,
  onResetGradeScale,
  onCourseChange,
  onTogglePercentageInput,
  onGradeScaleChange,
}) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className={`bg-white p-8 rounded shadow-lg max-h-[80vh] overflow-y-auto ${isGradeScaleOpen ? 'min-w-[450px] w-1/3' : 'min-w-[400px] w-1/4'}`}>
      <h2 className="text-2xl font-bold mb-4">{isAddCourse ? 'Add Course' : 'Edit Course'}</h2>
      <div className="mb-4">
        <label className="block mb-2">Course Name</label>
        <input
          type="text"
          placeholder="Course Name"
          value={newCourse.name}
          onChange={(e) => onCourseChange('name', e.target.value)}
          className="border p-2 mb-2 w-full rounded"
        />
        <label className="block mb-2">Units</label>
        <input
          type="text"
          placeholder="Units"
          value={newCourse.units === 0 ? '' : newCourse.units}
          onChange={(e) => onCourseChange('units', parseInt(e.target.value) || 0)}
          className="border p-2 mb-2 w-full rounded"
        />
        <label className="block mb-2">Grade</label>
        <div className="flex items-center mb-2">
          <input
            type="text"
            placeholder={isPercentageInput ? "Percentage" : "Letter Grade"}
            value={newCourse.grade}
            onChange={(e) => onGradeChange(e.target.value)}
            className="border p-2 w-full rounded"
          />
          {isPercentageInput && <span className="ml-2">%</span>}
          <label className="ml-2">Percentage</label>
          <input
            type="checkbox"
            checked={isPercentageInput}
            onChange={onTogglePercentageInput}
            className="ml-2"
          />
        </div>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <div className="flex justify-between space-x-2">
          <button onClick={onSave} className="bg-blue-500 text-white p-2 w-1/2 rounded hover:bg-blue-700 transition duration-200">
            {isAddCourse ? 'Add' : 'Save'}
          </button>
          <button onClick={onClose} className="bg-gray-500 text-white p-2 w-1/2 rounded hover:bg-gray-700 transition duration-200">
            Cancel
          </button>
        </div>
        {!isAddCourse && (
          <button onClick={onRemove} className="bg-red-500 text-white p-2 w-full mt-2 rounded hover:bg-red-700 transition duration-200">
            Remove Course
          </button>
        )}
        {isPercentageInput && (
          <button onClick={onToggleGradeScaleForm} className="bg-gray-500 text-white p-2 w-full mt-2 rounded hover:bg-gray-700 transition duration-200">
            {isGradeScaleOpen ? 'Hide Grade Scale' : 'Adjust Grade Scale'}
          </button>
        )}
      </div>
      {isGradeScaleOpen && (
        <GradeScaleForm
          gradeScale={gradeScale}
          scaleError={scaleError}
          onGradeScaleChange={onGradeScaleChange}
          onResetGradeScale={onResetGradeScale}
        />
      )}
    </div>
  </div>
);

export default AddEditCourseModal;