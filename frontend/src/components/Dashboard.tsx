import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks, useDeleteTask, useMarkTaskComplete, useUpdateStatus } from '../hooks/tasks';
import { AppLayout } from './layout/AppLayout';
import { Button } from './ui/Button';
import { Select } from './ui/Select';
import { Badge } from './ui/Badge';
import { Spinner } from './ui/Spinner';
import { EmptyState } from './ui/EmptyState';
import Pagination from './ui/Pagination';
import type { Task } from '../services/api';

const Dashboard: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('due_date');
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate();
  const deleteTaskMutation = useDeleteTask();
  const markCompleteMutation = useMarkTaskComplete();
  const updateStatusMutation = useUpdateStatus();

  const { data: tasksResponse, isLoading: loading } = useTasks({
    page,
    limit: 10,
    status: filter === 'all' ? undefined : filter === 'pending' ? '1' : filter === 'in_progress' ? '2' : '3',
    sortBy,
  });

  const tasks = tasksResponse?.tasks || [];
  const totalPages = tasksResponse?.totalPages || 1;

  const handleDeleteTask = async (taskId: number) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTaskMutation.mutateAsync(taskId);
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    }
  };

  const handleMarkComplete = async (taskId: number) => {
    try {
      await markCompleteMutation.mutateAsync(taskId);
    } catch (error) {
      console.error('Failed to mark task as complete:', error);
    }
  };

  const handleMarkInProgress = async (taskId: number) => {
    try {
      await updateStatusMutation.mutateAsync({ id: taskId, status: 2 });
    } catch (error) {
      console.error('Failed to mark task as in progress:', error);
    }
  };

  const getPriorityLabel = (priority: number) => {
    switch (priority) {
      case 1: return 'Low';
      case 2: return 'Medium';
      case 3: return 'High';
      default: return 'Unknown';
    }
  };

  const getStatusLabel = (status: number) => {
    switch (status) {
      case 1: return 'Pending';
      case 2: return 'In Progress';
      case 3: return 'Completed';
      default: return 'Unknown';
    }
  };

  if (loading) {
    return (
      <AppLayout>
        <Spinner label="Loading tasks..." className="py-16" />
      </AppLayout>
    );
  }

  return (
    <AppLayout
      title="Task Manager"
      actions={<Button onClick={() => navigate('/tasks/new')}>Add New Task</Button>}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap gap-4">
          <div className="w-48">
            <Select
              label="Filter by Status"
              value={filter}
              onChange={(e) => {setFilter(e.target.value); setPage(1);}}
              options={[
                { value: 'all', label: 'All Tasks' },
                { value: 'pending', label: 'Pending' },
                { value: 'in_progress', label: 'In Progress' },
                { value: 'completed', label: 'Completed' },
              ]}
            />
          </div>
          <div className="w-48">
            <Select
              label="Sort by"
              value={sortBy}
              onChange={(e) => {setSortBy(e.target.value); setPage(1);}}
              options={[
                { value: 'due_date', label: 'Due Date' },
                { value: 'priority', label: 'Priority' },
                { value: 'title', label: 'Title' },
              ]}
            />
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden rounded-md">
          {tasks.length === 0 ? (
            <EmptyState
              title="No tasks"
              description="Get started by creating your first task."
              actionLabel="Create Task"
              onAction={() => navigate('/tasks/new')}
            />
          ) : (
            <ul className="divide-y divide-gray-200">
              {tasks.map((task: Task) => (
                <li key={task.id} className="px-8 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
                        <Badge tone={task.priority === 3 ? 'red' : task.priority === 2 ? 'yellow' : 'green'}>
                          {getPriorityLabel(task.priority)}
                        </Badge>
                        <Badge tone={task.status === 3 ? 'green' : task.status === 2 ? 'blue' : 'gray'}>
                          {getStatusLabel(task.status)}
                        </Badge>
                      </div>
                      {task.description && (
                        <p className="mt-1 text-sm text-gray-600">{task.description}</p>
                      )}
                      <p className="mt-1 text-sm text-gray-500">
                        Due: {new Date(task.due_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {task.status === 1 && (
                        <Button onClick={() => handleMarkInProgress(task.id)}>Mark In Progress</Button>
                      )}
                      {task.status !== 3 && (
                        <Button onClick={() => handleMarkComplete(task.id)}>Mark Complete</Button>
                      )}
                      <Button variant="ghost" onClick={() => navigate(`/tasks/${task.id}/edit`)}>Edit</Button>
                      <Button variant="danger" onClick={() => handleDeleteTask(task.id)}>Delete</Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </AppLayout>
  );
};

export default Dashboard;