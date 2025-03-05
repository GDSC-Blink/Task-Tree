import Widget from "./widget";

const ToDoComponent = () => {
    return (
        <Widget title="Todo"> 
            <ul className="list-disc pl-4">
                <li>task 1</li>
                <li>task 2</li>
                <li>task 3</li>
            </ul>
        </Widget>
    );
};

export default ToDoComponent;