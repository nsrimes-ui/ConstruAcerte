import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = ( ) => {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Bem-vindo, {user?.name}!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total de Projetos</h3>
          <p className="text-3xl font-bold text-blue-600">5</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Projetos Ativos</h3>
          <p className="text-3xl font-bold text-green-600">3</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Tarefas Concluídas</h3>
          <p className="text-3xl font-bold text-purple-600">156</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Equipe</h3>
          <p className="text-3xl font-bold text-orange-600">25</p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Projetos Recentes</h2>
        <div className="space-y-3">
          <div className="border-b pb-2">
            <h3 className="font-semibold">Edifício Residencial Aurora</h3>
            <p className="text-gray-600">Progresso: 75%</p>
          </div>
          <div className="border-b pb-2">
            <h3 className="font-semibold">Centro Comercial Plaza</h3>
            <p className="text-gray-600">Progresso: 45%</p>
          </div>
          <div className="border-b pb-2">
            <h3 className="font-semibold">Condomínio Jardim Verde</h3>
            <p className="text-gray-600">Progresso: 90%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
