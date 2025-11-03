import { useMutation } from '@tanstack/react-query';
import { apiService } from '../services/api';
import { useAppDispatch, useAppSelector, type RootState } from '../store';
import { setCredentials, logout as logoutAction } from '../store/authSlice';
import { useToast } from '../contexts/ToastContext';

export function useLogin() {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const data = await apiService.login(email, password);
      return data as { user: { id: number; name: string; email: string }; token: string };
    },
    onSuccess: (result: { user: { id: number; name: string; email: string }; token: string }) => {
      const { user, token } = result;
      dispatch(setCredentials({ user, token }));
      apiService.setAuthToken(token);
      showToast('success', 'Login successful');
    },
    onError: () => {
      showToast('error', 'Login failed. Please check your credentials.');
    },
  });
}

export function useRegister() {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  return useMutation({
    mutationFn: async ({ name, email, password }: { name: string; email: string; password: string }) => {
      const data = await apiService.register(name, email, password);
      return data as { user: { id: number; name: string; email: string }; token: string };
    },
    onSuccess: (result: { user: { id: number; name: string; email: string }; token: string }) => {
      const { user, token } = result;
      dispatch(setCredentials({ user, token }));
      apiService.setAuthToken(token);
      showToast('success', 'Registration successful');
    },
    onError: () => {
      showToast('error', 'Registration failed. Please try again.');
    },
  });
}

export function useAuthState() {
  return useAppSelector((s: RootState) => s.auth);
}

export function useLogout() {
  const dispatch = useAppDispatch();
  return () => {
    dispatch(logoutAction());
    apiService.clearAuthToken();
  };
}
