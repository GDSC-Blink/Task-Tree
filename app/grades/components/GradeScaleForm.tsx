import React from 'react';

interface GradeScaleFormProps {
  gradeScale: { [key: number]: string };
  scaleError: string | null;
  onGradeScaleChange: (newGradeScale: { [key: number]: string }) => void;
  onResetGradeScale: () => void;
}

const GradeScaleForm: React.FC<GradeScaleFormProps> = ({ gradeScale, scaleError, onGradeScaleChange, onResetGradeScale }) => (
  <div className="mt-4 border-t pt-4">
    <div className="flex justify-between items-center mb-2">
      <h3 className="font-bold">Grade Scale</h3>
      <button onClick={onResetGradeScale} className="text-sm text-blue-500 hover:text-blue-700">
        Reset to Default
      </button>
    </div>
    {scaleError && (
      <div className="mb-4 p-2 bg-red-100 border border-red-300 rounded text-red-700">
        <p className="font-bold">Warning: Invalid Grade Scale</p>
        <p>{scaleError}</p>
      </div>
    )}
    <div className="overflow-y-auto max-h-[300px]">
      {Object.entries(gradeScale).reverse().map(([minPercentage, grade]) => (
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
              onGradeScaleChange(newGradeScale);
            }}
            className="border p-2 w-2/3 rounded"
          />
        </div>
      ))}
    </div>
  </div>
);

export default GradeScaleForm;