import React, { useReducer, useEffect,  } from "react";
import { motion } from "framer-motion";
import Header from "./Components/Header";
//import EnterField from "./Components/Enterfield";
//import TasksSection from "./Components/Tasksection";

import "./App.css";

interface Task {
  id: string;
  complete: boolean;
  name: string;
}

type State = {
  tasksData: Task[];
  darkMode: boolean;
};

type Action =
  | { type: "ADD_TASK"; payload: Task }
  | { type: "REMOVE_TASK"; payload: string }
  | { type: "TOGGLE_COMPLETE"; payload: string }
  | { type: "CLEAR_COMPLETED" }
  | { type: "TOGGLE_DARK_MODE" };

const initialState: State = {
  tasksData: JSON.parse(localStorage.getItem("tasks") || "[]"),
  darkMode: JSON.parse(localStorage.getItem("darkMode") || "true"),
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TASK":
      return { ...state, tasksData: [...state.tasksData, action.payload] };
    case "REMOVE_TASK":
      return {
        ...state,
        tasksData: state.tasksData.filter((task) => task.id !== action.payload),
      };
    case "TOGGLE_COMPLETE":
      return {
        ...state,
        tasksData: state.tasksData.map((task) =>
          task.id === action.payload ? { ...task, complete: !task.complete } : task
        ),
      };
    case "CLEAR_COMPLETED":
      return { ...state, tasksData: state.tasksData.filter((task) => !task.complete) };
    case "TOGGLE_DARK_MODE":
      return { ...state, darkMode: !state.darkMode };
    default:
      return state;
  }
};

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.tasksData));
  }, [state.tasksData]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(state.darkMode));
  }, [state.darkMode]);

  return (
    <div
      className={`${
        state.darkMode ? "dark:bg-bgDark dark:text-primaryClD" : ""
      } bg-bgLight text-primaryClL h-screen relative text-[18px] select-none box-border`}
    >
      <img
        className="sm:h-max h-1/3 object-cover absolute"
        src={state.darkMode ? `bg-desktop-dark.jpg` : `bg-desktop-light.jpg`}
        alt="background banner"
      />

      <div className="container md:max-w-xl sm:max-w-lg max-w-[90%] mx-auto sm:pt-20 pt-10 relative z-auto">
        <Header darkModeToggle={() => dispatch({ type: "TOGGLE_DARK_MODE" })} darkMode={state.darkMode} />
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            ease: "easeOut",
            opacity: { duration: 0.6 },
            y: { duration: 0.5 },
          }}
        >
          {/* <EnterField
            tasksData={state.tasksData}
            saveTasks={JSON.stringify(state.tasksData)}
            darkMode={state.darkMode}
            setter={(task: Task) => dispatch({ type: "ADD_TASK", payload: task })}
          />
          <TasksSection
            darkMode={state.darkMode}
            removeTask={(id: string) => dispatch({ type: "REMOVE_TASK", payload: id })}
            setCompleteStatus={(id: string) => dispatch({ type: "TOGGLE_COMPLETE", payload: id })}
            clearAllCompleted={() => dispatch({ type: "CLEAR_COMPLETED" })}
            tasksData={state.tasksData}
            setTasksData={(tasks: Task[]) => tasks.forEach(task => dispatch({ type: "ADD_TASK", payload: task }))} */}
          {/* /> */}
        </motion.div>
        {state.tasksData.length > 1 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-secondaryTextColor block mt-14 text-center"
          >
            Drag and drop to reorder list
          </motion.p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default App;
