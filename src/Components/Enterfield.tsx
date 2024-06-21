import React from "react";
import CheckBox from "./Checkbox";
import { FaPlus } from "react-icons/fa6";
import { v4 as uuidv4 } from "uuid";

interface EnterFieldProps {
  setter: React.Dispatch<React.SetStateAction<Task[]>>;
  tasksData: Task[];
  darkMode: boolean;
}

interface Task {
  id: string;
  complete: boolean;
  name: string;
}

const EnterField: React.FC<EnterFieldProps> = ({ setter, tasksData, darkMode }) => {
  const [checkStatus, setCheckStatus] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<string>("");

  const addTask = () => {
    setter((prev) => [
      ...prev,
      { id: uuidv4(), complete: checkStatus, name: inputValue },
    ]);
    setInputValue("");
    setCheckStatus(false);
  };

  const onPushEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim().length) {
      addTask();
    }
  };

  React.useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify([...tasksData]));
  }, [tasksData]);

  return (
    <div
      className={`${
        darkMode ? "bg-secondaryBgD" : "bg-secondaryBgL"
      } relative sm:h-16 h-14 flex items-center rounded-md shadow-lg shadow-[#00000069]`}>
      <CheckBox
        darkMode={darkMode}
        checkStatus={checkStatus}
        onClick={() => setCheckStatus(!checkStatus)}
      />
      <input
        id="todoInput"
        aria-label="Enter your task"
        className="bg-[transparent] w-full h-full ml-5 placeholder:text-secondaryTextColor mr-0-auto rounded-md outline-none text-customCl"
        placeholder="Create a new todo..."
        onKeyDown={onPushEnter}
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        type="text"
      />
      {inputValue && (
        <FaPlus
          onClick={addTask}
          className={`absolute top-1/2 right-2 -translate-y-1/2 text-[1.5em] h-full mr-5 cursor-pointer ${
            darkMode ? "hover:text-textHoverD" : "hover:text-textHoverL"
          }`}
        />
      )}
    </div>
  );
};

export default EnterField;
