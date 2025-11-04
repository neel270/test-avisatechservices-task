import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export interface Task {
  id: number;
  user_id: number;
  title: string;
  description: string | null;
  due_date: string;
  priority: number;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface TasksResponse {
  tasks: Task[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateTaskData {
  title: string;
  description?: string;
  due_date: string;
  priority?: number;
  status?: number;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  due_date?: string;
  priority?: number;
  status?: number;
}

class ApiService {
  constructor() {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }

  // Task API methods
  async getTasks(params?: { page?: number; limit?: number; status?: string; sortBy?: string }): Promise<TasksResponse> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.status) queryParams.append('status', params.status);
      if (params?.sortBy) queryParams.append('sortBy', params.sortBy);

      const response = await axios.get(`${API_BASE_URL}/tasks?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }

  async getTask(id: number): Promise<Task> {
    const response = await axios.get(`${API_BASE_URL}/tasks/${id}`);
    return response.data.task;
  }

  async createTask(taskData: CreateTaskData): Promise<Task> {
    const response = await axios.post(`${API_BASE_URL}/tasks`, taskData);
    return response.data.task;
  }

  async updateTask(id: number, taskData: UpdateTaskData): Promise<Task> {
    const response = await axios.put(`${API_BASE_URL}/tasks/${id}`, taskData);
    return response.data.task;
  }

  async deleteTask(id: number): Promise<void> {
    await axios.delete(`${API_BASE_URL}/tasks/${id}`);
  }

  async updateStatus(id: number, status: number): Promise<Task> {
    const response = await axios.patch(`${API_BASE_URL}/tasks/${id}/status`, { status });
    return response.data.task;
  }

  // Auth API methods
  async login(email: string, password: string) {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  }

  async register(name: string, email: string, password: string) {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, {
      name,
      email,
      password,
    });
    return response.data;
  }

  async getProfile() {
    const response = await axios.get(`${API_BASE_URL}/auth/profile`);
    return response.data;
  }

  async updateProfile(profileData: { name?: string; email?: string }) {
    const response = await axios.put(`${API_BASE_URL}/auth/profile`, profileData);
    return response.data;
  }

  setAuthToken(token: string) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  clearAuthToken() {
    delete axios.defaults.headers.common['Authorization'];
  }
}

export const apiService = new ApiService();