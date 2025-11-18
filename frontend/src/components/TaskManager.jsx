import React, { useState } from 'react';
import Button from './Button';
import useLocalStorage from '../hooks/useLocalStorage';

/**
 * TaskManager component for managing tasks
 */
const TaskManager = () => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [newTaskText, setNewTaskText] = useState('');
  const [filter, setFilter] = useState('all');

  // Filter tasks based on selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // 'all' filter
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: newTaskText,
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ]);
    setNewTaskText('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-start gap-4">
        <h2 className="text-2xl font-bold">Task Manager</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Manage your tasks — add, complete, delete, and filter.</p>
      </div>

      {/* Task input form */}
      <form onSubmit={handleSubmit} className="my-4" aria-label="Add task form">
        <label htmlFor="new-task" className="sr-only">New task</label>
        <div className="flex gap-2">
          <input
            id="new-task"
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Add a new task..."
            className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 transition-colors"
            aria-label="Task text"
          />
          <Button type="submit" variant="primary" aria-label="Add task">
            Add
          </Button>
        </div>
      </form>

      {/* Filter buttons */}
      <div className="flex gap-2 mb-4" role="tablist" aria-label="Task filters">
        <Button
          variant={filter === 'all' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setFilter('all')}
          aria-pressed={filter === 'all'}
        >
          All
        </Button>
        <Button
          variant={filter === 'active' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setFilter('active')}
          aria-pressed={filter === 'active'}
        >
          Active
        </Button>
        <Button
          variant={filter === 'completed' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setFilter('completed')}
          aria-pressed={filter === 'completed'}
        >
          Completed
        </Button>
      </div>

      {/* Task list */}
      <ul className="space-y-3">
        {filteredTasks.length === 0 ? (
          <li className="text-gray-500 dark:text-gray-400 text-center py-6">
            <svg className="mx-auto mb-2 w-12 h-12 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m2 0a2 2 0 002-2V7a2 2 0 00-2-2h-3.5a2 2 0 01-1.414-.586L12 2 8.914 2.414A2 2 0 017.5 3H4a2 2 0 00-2 2v3a2 2 0 002 2h2" />
            </svg>
            No tasks found
          </li>
        ) : (
          filteredTasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between p-3 border rounded-lg hover:shadow-sm dark:border-gray-700 transition transform hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                  aria-label={`Mark ${task.text} as ${task.completed ? 'incomplete' : 'complete'}`}
                />
                <div>
                  <span
                    className={`block ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}
                  >
                    {task.text}
                  </span>
                  <time className="text-xs text-gray-400 block">{new Date(task.createdAt).toLocaleString()}</time>
                </div>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => deleteTask(task.id)}
                aria-label={`Delete ${task.text}`}
                title="Delete task"
              >
                Delete
              </Button>
            </li>
          ))
        )}
      </ul>

      {/* Task stats */}
      <div className="mt-6 text-sm text-gray-500 dark:text-gray-400" aria-live="polite">
        <p>
          {tasks.filter((task) => !task.completed).length} tasks remaining
        </p>
      </div>
    </div>
  );
};

export default TaskManager; 