import React, { useState } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard';
import Projects from '@/components/Projects';
import TasksGantt from '@/components/TasksGantt';
import UserProfile from '@/components/UserProfile';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'projects':
        return <Projects />;
      case 'tasks':
        return <TasksGantt />;
      case 'calendar':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Calendário</h2>
            <p className="text-muted-foreground">Módulo de calendário em desenvolvimento</p>
          </div>
        );
      case 'reports':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Relatórios</h2>
            <p className="text-muted-foreground">Módulo de relatórios em desenvolvimento</p>
          </div>
        );
      case 'settings':
        return <UserProfile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <ProtectedRoute>
            <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
              {renderPage()}
            </Layout>
          </ProtectedRoute>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
