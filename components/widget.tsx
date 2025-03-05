// components/Widget.tsx
interface WidgetProps {
  title: string;
  children: React.ReactNode;
}

const Widget = ({ title, children }: WidgetProps) => {
  return (
    <div className="bg-gray-200 rounded-lg p-6 shadow-md w-[45vw] h-[35vh]">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <div className="text-gray-700">{children}</div>
    </div>
  );
};

export default Widget;