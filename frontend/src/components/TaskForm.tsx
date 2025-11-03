import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import type { CreateTaskData, UpdateTaskData } from '../services/api';
import { useTask, useCreateTask, useUpdateTask } from '../hooks/tasks';
import { AppLayout } from './layout/AppLayout';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Button } from './ui/Button';

const TaskForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const taskSchema = yup.object().shape({
    title: yup.string().required('Title is required').min(3, 'Title must be at least 3 characters'),
    description: yup.string().optional(),
    dueDate: yup.string().required('Due date is required').test('is-future', 'Due date must be in the future', (value) => {
      if (!value) return false;
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }),
    priority: yup.number().required('Priority is required').oneOf([1, 2, 3], 'Invalid priority'),
    status: yup.number().required('Status is required').oneOf([1, 2, 3], 'Invalid status'),
  });

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const numericId = id ? parseInt(id) : NaN;
  const { data: existingTask } = useTask(Number.isNaN(numericId) ? 0 : numericId);
  const createTaskMutation = useCreateTask();
  const updateTaskMutation = useUpdateTask();

  const getInitialValues = () => {
    if (existingTask && isEditing) {
      return {
        title: existingTask.title,
        description: existingTask.description || '',
        dueDate: existingTask.due_date,
        priority: existingTask.priority,
        status: existingTask.status,
      };
    }
    return {
      title: '',
      description: '',
      dueDate: '',
      priority: 1,
      status: 1,
    };
  };

  useEffect(() => {
    if (id && id !== 'new') {
      setIsEditing(true);
    }
  }, [id]);

  const handleSubmit = async (values: { title: string; description: string; dueDate: string; priority: number; status: number; }) => {
    setError('');
    setLoading(true);

    try {
      const submitData: CreateTaskData | UpdateTaskData = {
        title: values.title,
        description: values.description || undefined,
        due_date: values.dueDate,
        priority: values.priority,
        status: values.status,
      };

      if (isEditing && id) {
        await updateTaskMutation.mutateAsync({ id: parseInt(id), data: submitData });
      } else {
        await createTaskMutation.mutateAsync(submitData as CreateTaskData);
      }

      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to save task:', error);
      setError('Failed to save task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout title={isEditing ? 'Edit Task' : 'Create New Task'}>
      <div className="max-w-2xl m-auto">
        <Formik
          initialValues={getInitialValues()}
          validationSchema={taskSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting }: { isSubmitting: boolean }) => (
            <Form className="space-y-6 bg-white p-8 rounded-lg shadow">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <Field
                  as={Input}
                  id="title"
                  name="title"
                  error={undefined}
                />
                <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  rows={4}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date *
                </label>
                <Field
                  as={Input}
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  required
                  error={undefined}
                />
                <ErrorMessage name="dueDate" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <Field
                  as={Select}
                  id="priority"
                  name="priority"
                  options={[
                    { value: 1, label: 'Low' },
                    { value: 2, label: 'Medium' },
                    { value: 3, label: 'High' },
                  ]}
                  error={undefined}
                />
                <ErrorMessage name="priority" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <Field
                  as={Select}
                  id="status"
                  name="status"
                  options={[
                    { value: 1, label: 'Pending' },
                    { value: 2, label: 'In Progress' },
                    { value: 3, label: 'Completed' },
                  ]}
                  error={undefined}
                />
                <ErrorMessage name="status" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="flex justify-end gap-3">
                <Button type="button" variant="secondary" onClick={() => navigate('/dashboard')}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting || loading}>
                  {isSubmitting || loading ? (isEditing ? 'Updating...' : 'Creating...') : (isEditing ? 'Update Task' : 'Create Task')}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </AppLayout>
  );
};

export default TaskForm;