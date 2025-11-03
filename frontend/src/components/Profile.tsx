import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../store';
import { setCredentials } from '../store/authSlice';
import { AppLayout } from './layout/AppLayout';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { apiService } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiService.getProfile();
        setName(response.user.name);
        setEmail(response.user.email);
        dispatch(setCredentials({ user: response.user, token: localStorage.getItem('token')! }));
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      }
    };

    fetchProfile();
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await apiService.updateProfile({ name, email });
      dispatch(setCredentials({ user: response.user, token: localStorage.getItem('token')! }));
      navigate('/dashboard');
    } catch {
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout title="Profile">
      <div className="max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}

          <div className="flex gap-4">
            <Button type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update Profile'}
            </Button>
            <Button type="button" variant="secondary" onClick={() => navigate('/dashboard')}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
};

export default Profile;