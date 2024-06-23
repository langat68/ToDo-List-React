import React, { useReducer, useState } from 'react';
import './App.css';

interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

type ActionType =
  | { type: 'ADD_TASK'; payload: string }
  | { type: 'DELETE_TASK'; payload: number }
  | { type: 'TOGGLE_TASK_COMPLETION'; payload: number }
  | { type: 'CLEAR_COMPLETED' };

const initialTodos: Todo[] = [
  { id: 1, task: 'Complete online JavaScript course', completed: true },
  { id: 2, task: 'Jog around the park 3x', completed: false },
  { id: 3, task: '10 minutes meditation', completed: false },
  { id: 4, task: 'Read for 1 hour', completed: false },
  { id: 5, task: 'Pick up groceries', completed: false },
  { id: 6, task: 'Complete Todo App on Frontend Mentor', completed: false },
];

const todoReducer = (state: Todo[], action: ActionType): Todo[] => {
  switch (action.type) {
    case 'ADD_TASK':
      return [
        ...state,
        {
          id: Date.now(),
          task: action.payload,
          completed: false,
        },
      ];
    case 'DELETE_TASK':
      return state.filter(todo => todo.id !== action.payload);
    case 'TOGGLE_TASK_COMPLETION':
      return state.map(todo =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    case 'CLEAR_COMPLETED':
      return state.filter(todo => !todo.completed);
    default:
      return state;
  }
};

const App: React.FC = () => {
  const [todos, dispatch] = useReducer(todoReducer, initialTodos);
  const [newTask, setNewTask] = useState('');
  const [theme, setTheme] = useState('dark');
  const [filter, setFilter] = useState<'All' | 'Active' | 'Completed'>('All');

  const addTask = (): void => {
    if (newTask.trim() !== '') {
      dispatch({ type: 'ADD_TASK', payload: newTask });
      setNewTask('');
    }
  };

  const deleteTask = (id: number): void => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  const toggleTaskCompletion = (id: number): void => {
    dispatch({ type: 'TOGGLE_TASK_COMPLETION', payload: id });
  };

  const clearCompletedTasks = (): void => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'Active') return !todo.completed;
    if (filter === 'Completed') return todo.completed;
    return true;
  });

  return (
    <div className={`App ${theme}`}>
      <div className="header">
        <h1>TODO</h1>
        <button className="theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
      <div className="todo-container">
        <input
          type="text"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          placeholder="Create a new todo..."
        />
        <button onClick={addTask}>Add Task</button>
        <ul>
          {filteredTodos.map(todo => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTaskCompletion(todo.id)}
              />
              <span className={todo.completed ? 'completed' : ''}>{todo.task}</span>
              <button className="delete-task" onClick={() => deleteTask(todo.id)}>x</button>
            </li>
          ))}
        </ul>
        <div className="filters">
          <span>{todos.length} items left</span>
          <button onClick={() => setFilter('All')}>All</button>
          <button onClick={() => setFilter('Active')}>Active</button>
          <button onClick={() => setFilter('Completed')}>Completed</button>
          <button onClick={clearCompletedTasks}>Clear Completed</button>
        </div>
      </div>
    </div>
  );
};

export default App;
