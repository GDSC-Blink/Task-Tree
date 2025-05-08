interface WidgetProps {
    title: string;
    children: React.ReactNode;
    className?: string;
  }
  
  const StudyWidget = ({ title, children, className = "" }: WidgetProps) => {
    return (
      <div
        className={`bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition 
          w-full h-[180px] flex flex-col justify-between ${className}`}
      >
        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-1">{title}</h3>
          <div className="text-sm text-gray-600">{children}</div>

        </div>
        <div className="mt-4 text-sm text-blue-600">Learn more →</div> 

        
      </div>
    );
  };
  
  export default StudyWidget;
  