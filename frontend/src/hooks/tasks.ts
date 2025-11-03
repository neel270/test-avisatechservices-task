import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService, type CreateTaskData, type UpdateTaskData, type Task, type TasksResponse } from '../services/api';
import { useToast } from '../contexts/ToastContext';

const keys = {
  all: ['tasks'] as const,
  detail: (id: number) => [...keys.all, id] as const,
};

export function useTasks(params?: { page?: number; limit?: number; status?: string; sortBy?: string }) {
  return useQuery<TasksResponse>({
    queryKey: [...keys.all, params],
    queryFn: () => apiService.getTasks(params),
  });
}

export function useTask(id: number) {
  return useQuery<Task>({
    queryKey: keys.detail(id),
    queryFn: () => apiService.getTask(id),
    enabled: !!id,
  });
}

export function useCreateTask() {
  const qc = useQueryClient();
  const { showToast } = useToast();
  return useMutation<Task, unknown, CreateTaskData>({
    mutationFn: (data: CreateTaskData) => apiService.createTask(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: keys.all });
      showToast('success', 'Task created successfully');
    },
    onError: () => {
      showToast('error', 'Failed to create task');
    },
  });
}

export function useUpdateTask() {
  const qc = useQueryClient();
  const { showToast } = useToast();
  return useMutation<Task, unknown, { id: number; data: UpdateTaskData }>({
    mutationFn: ({ id, data }: { id: number; data: UpdateTaskData }) => apiService.updateTask(id, data),
    onSuccess: (_result: Task, vars: { id: number; data: UpdateTaskData }) => {
      qc.invalidateQueries({ queryKey: keys.detail(vars.id) });
      qc.invalidateQueries({ queryKey: keys.all });
      showToast('success', 'Task updated successfully');
    },
    onError: () => {
      showToast('error', 'Failed to update task');
    },
  });
}

export function useDeleteTask() {
  const qc = useQueryClient();
  const { showToast } = useToast();
  return useMutation<void, unknown, number>({
    mutationFn: (id: number) => apiService.deleteTask(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: keys.all });
      showToast('success', 'Task deleted successfully');
    },
    onError: () => {
      showToast('error', 'Failed to delete task');
    },
  });
}

export function useMarkTaskComplete() {
  const qc = useQueryClient();
  const { showToast } = useToast();
  return useMutation<Task, unknown, number>({
    mutationFn: (id: number) => apiService.markTaskComplete(id),
    onSuccess: (_result: Task, id: number) => {
      qc.invalidateQueries({ queryKey: keys.detail(id) });
      qc.invalidateQueries({ queryKey: keys.all });
      showToast('success', 'Task marked as complete');
    },
    onError: () => {
      showToast('error', 'Failed to mark task as complete');
    },
  });
}

export function useUpdateStatus() {
  const qc = useQueryClient();
  const { showToast } = useToast();
  return useMutation<Task, unknown, { id: number; status: number }>({
    mutationFn: ({ id, status }: { id: number; status: number }) => apiService.updateStatus(id, status),
    onSuccess: (_result: Task, vars: { id: number; status: number }) => {
      qc.invalidateQueries({ queryKey: keys.detail(vars.id) });
      qc.invalidateQueries({ queryKey: keys.all });
      showToast('success', 'Task status updated successfully');
    },
    onError: () => {
      showToast('error', 'Failed to update task status');
    },
  });
}
