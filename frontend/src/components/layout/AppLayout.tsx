import React from 'react';
import { Button } from '../ui/Button';
import { useLogout } from '../../hooks/auth';
import { useNavigate, useLocation } from 'react-router-dom';

interface AppLayoutProps {
  title?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ title = 'Task Manager', actions, children }) => {
  const logout = useLogout();
  const navigate = useNavigate();
  const location = useLocation();

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  const onProfile = () => {
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="w-full px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            <div className="flex items-center gap-3">
              {actions}
              {location.pathname !== '/profile' && (
                <Button variant="secondary" onClick={onProfile}>Profile</Button>
              )}
              <Button variant="danger" onClick={onLogout}>Logout</Button>
            </div>
          </div>
        </div>
      </header>
      <main className="w-full py-6 px-8">
        <div className="py-6">{children}</div>
      </main>
    </div>
  );
};
