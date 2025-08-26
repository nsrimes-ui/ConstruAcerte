import React, { useState } from 'react';
import Layout from './components/Layout.jsx';
import Dashboard from './components/Dashboard.jsx';
import Projects from './components/Projects.jsx';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'projects':
        return <Projects />;
      case 'tasks':
        return <div className="p-8 text-center"><h2 className="text-2xl font-bold">Tarefas</h2><p>Em desenvolvimento...</p></div>;
      case 'calendar':
        return <div className="p-8 text-center"><h2 className="text-2xl font-bold">Calendário</h2><p>Em desenvolvimento...</p></div>;
      case 'reports':
        return <div className="p-8 text-center"><h2 className="text-2xl font-bold">Relatórios</h2><p>Em desenvolvimento...</p></div>;
      case 'settings':
        return <div className="p-8 text-center"><h2 className="text-2xl font-bold">Configurações</h2><p>Em desenvolvimento...</p></div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}

export default App;
