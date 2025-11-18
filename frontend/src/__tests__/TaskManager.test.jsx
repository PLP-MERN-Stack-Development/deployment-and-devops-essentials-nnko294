import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskManager from '../components/TaskManager';

describe('TaskManager component', () => {
  beforeEach(() => localStorage.clear());

  it('adds a new task and displays it', () => {
    render(<TaskManager />);
    const input = screen.getByLabelText(/task text/i);
    const addButton = screen.getByRole('button', { name: /add/i });

    fireEvent.change(input, { target: { value: 'Write tests' } });
    fireEvent.click(addButton);

    expect(screen.getByText('Write tests')).toBeInTheDocument();
    expect(screen.getByText(/tasks remaining/i)).toBeInTheDocument();
  });

  it('toggles and deletes a task', () => {
    render(<TaskManager />);
    const input = screen.getByLabelText(/task text/i);
    fireEvent.change(input, { target: { value: 'Temp task' } });
    fireEvent.click(screen.getByRole('button', { name: /add/i }));

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    const deleteButton = screen.getByRole('button', { name: /delete temp task/i });
    fireEvent.click(deleteButton);
    expect(screen.queryByText('Temp task')).not.toBeInTheDocument();
  });
});
