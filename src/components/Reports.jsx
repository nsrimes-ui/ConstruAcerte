import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  DollarSign,
  Users,
  FileText,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react';

const Reports = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedProject, setSelectedProject] = useState('all');
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Dados simulados para demonstração
  const mockData = {
    projectProgress: [
      { name: 'Projeto Alpha', completed: 85, pending: 15, delayed: 5 },
      { name: 'Projeto Beta', completed: 60, pending: 30, delayed: 10 },
      { name: 'Projeto Gamma', completed: 95, pending: 5, delayed: 0 },
      { name: 'Projeto Delta', completed: 40, pending: 45, delayed: 15 }
    ],
    tasksByStatus: [
      { name: 'Concluídas', value: 245, color: '#10b981' },
      { name: 'Em Andamento', value: 89, color: '#3b82f6' },
      { name: 'Pendentes', value: 56, color: '#f59e0b' },
      { name: 'Atrasadas', value: 23, color: '#ef4444' }
    ],
    monthlyProgress: [
      { month: 'Jan', completed: 45, planned: 50 },
      { month: 'Fev', completed: 52, planned: 55 },
      { month: 'Mar', completed: 48, planned: 60 },
      { month: 'Abr', completed: 61, planned: 65 },
      { month: 'Mai', completed: 58, planned: 70 },
      { month: 'Jun', completed: 67, planned: 75 }
    ],
    budgetAnalysis: [
      { category: 'Materiais', planned: 50000, actual: 48500 },
      { category: 'Mão de Obra', planned: 80000, actual: 82300 },
      { category: 'Equipamentos', planned: 30000, actual: 28900 },
      { category: 'Outros', planned: 15000, actual: 16200 }
    ],
    kpis: {
      totalProjects: 12,
      completedTasks: 245,
      activeUsers: 28,
      budgetUtilization: 87.5,
      onTimeDelivery: 92.3,
      qualityScore: 94.8
    }
  };

  useEffect(() => {
    // Simular carregamento de dados
    setTimeout(() => {
      setReportData(mockData);
      setLoading(false);
    }, 1000);
  }, [selectedPeriod, selectedProject]);

  const translations = {
    pt: {
      title: 'Relatórios e Análises',
      period: 'Período',
      project: 'Projeto',
      allProjects: 'Todos os Projetos',
      export: 'Exportar',
      refresh: 'Atualizar',
      filter: 'Filtrar',
      projectProgress: 'Progresso dos Projetos',
      taskDistribution: 'Distribuição de Tarefas',
      monthlyTrend: 'Tendência Mensal',
      budgetAnalysis: 'Análise Orçamentária',
      kpis: 'Indicadores Principais',
      totalProjects: 'Total de Projetos',
      completedTasks: 'Tarefas Concluídas',
      activeUsers: 'Usuários Ativos',
      budgetUtilization: 'Utilização do Orçamento',
      onTimeDelivery: 'Entregas no Prazo',
      qualityScore: 'Índice de Qualidade',
      completed: 'Concluído',
      pending: 'Pendente',
      delayed: 'Atrasado',
      planned: 'Planejado',
      actual: 'Real',
      loading: 'Carregando dados...'
    },
    en: {
      title: 'Reports and Analytics',
      period: 'Period',
      project: 'Project',
      allProjects: 'All Projects',
      export: 'Export',
      refresh: 'Refresh',
      filter: 'Filter',
      projectProgress: 'Project Progress',
      taskDistribution: 'Task Distribution',
      monthlyTrend: 'Monthly Trend',
      budgetAnalysis: 'Budget Analysis',
      kpis: 'Key Performance Indicators',
      totalProjects: 'Total Projects',
      completedTasks: 'Completed Tasks',
      activeUsers: 'Active Users',
      budgetUtilization: 'Budget Utilization',
      onTimeDelivery: 'On-Time Delivery',
      qualityScore: 'Quality Score',
      completed: 'Completed',
      pending: 'Pending',
      delayed: 'Delayed',
      planned: 'Planned',
      actual: 'Actual',
      loading: 'Loading data...'
    },
    es: {
      title: 'Informes y Análisis',
      period: 'Período',
      project: 'Proyecto',
      allProjects: 'Todos los Proyectos',
      export: 'Exportar',
      refresh: 'Actualizar',
      filter: 'Filtrar',
      projectProgress: 'Progreso de Proyectos',
      taskDistribution: 'Distribución de Tareas',
      monthlyTrend: 'Tendencia Mensual',
      budgetAnalysis: 'Análisis Presupuestario',
      kpis: 'Indicadores Clave',
      totalProjects: 'Total de Proyectos',
      completedTasks: 'Tareas Completadas',
      activeUsers: 'Usuarios Activos',
      budgetUtilization: 'Utilización del Presupuesto',
      onTimeDelivery: 'Entregas a Tiempo',
      qualityScore: 'Índice de Calidad',
      completed: 'Completado',
      pending: 'Pendiente',
      delayed: 'Retrasado',
      planned: 'Planificado',
      actual: 'Real',
      loading: 'Cargando datos...'
    }
  };

  const currentLang = t.language || 'pt';
  const texts = translations[currentLang] || translations.pt;

  const KPICard = ({ title, value, icon: Icon, trend, color = 'blue' }) => (
    <div className={`p-6 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {title}
          </p>
          <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {value}
          </p>
        </div>
        <div className={`p-3 rounded-full bg-${color}-100 ${isDark ? 'bg-opacity-20' : ''}`}>
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center">
          {trend > 0 ? (
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
          )}
          <span className={`text-sm ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {Math.abs(trend)}%
          </span>
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="h-8 w-8 animate-spin text-blue-500" />
          <span className={`ml-2 text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {texts.loading}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {texts.title}
        </h1>
        
        <div className="mt-4 sm:mt-0 flex flex-wrap gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className={`px-3 py-2 rounded-md border ${
              isDark 
                ? 'bg-gray-800 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            } focus:ring-2 focus:ring-blue-500`}
          >
            <option value="week">Esta Semana</option>
            <option value="month">Este Mês</option>
            <option value="quarter">Este Trimestre</option>
            <option value="year">Este Ano</option>
          </select>
          
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className={`px-3 py-2 rounded-md border ${
              isDark 
                ? 'bg-gray-800 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            } focus:ring-2 focus:ring-blue-500`}
          >
            <option value="all">{texts.allProjects}</option>
            <option value="alpha">Projeto Alpha</option>
            <option value="beta">Projeto Beta</option>
            <option value="gamma">Projeto Gamma</option>
          </select>
          
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2">
            <Download className="h-4 w-4" />
            {texts.export}
          </button>
          
          <button 
            onClick={() => setLoading(true)}
            className={`px-4 py-2 rounded-md border ${
              isDark 
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            } flex items-center gap-2`}
          >
            <RefreshCw className="h-4 w-4" />
            {texts.refresh}
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <KPICard
          title={texts.totalProjects}
          value={reportData.kpis.totalProjects}
          icon={FileText}
          trend={8.2}
          color="blue"
        />
        <KPICard
          title={texts.completedTasks}
          value={reportData.kpis.completedTasks}
          icon={CheckCircle}
          trend={12.5}
          color="green"
        />
        <KPICard
          title={texts.activeUsers}
          value={reportData.kpis.activeUsers}
          icon={Users}
          trend={-2.1}
          color="purple"
        />
        <KPICard
          title={texts.budgetUtilization}
          value={`${reportData.kpis.budgetUtilization}%`}
          icon={DollarSign}
          trend={5.3}
          color="yellow"
        />
        <KPICard
          title={texts.onTimeDelivery}
          value={`${reportData.kpis.onTimeDelivery}%`}
          icon={Clock}
          trend={3.7}
          color="indigo"
        />
        <KPICard
          title={texts.qualityScore}
          value={`${reportData.kpis.qualityScore}%`}
          icon={TrendingUp}
          trend={1.8}
          color="green"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Project Progress Chart */}
        <div className={`p-6 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {texts.projectProgress}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={reportData.projectProgress}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
              <XAxis 
                dataKey="name" 
                stroke={isDark ? '#9ca3af' : '#6b7280'}
                fontSize={12}
              />
              <YAxis stroke={isDark ? '#9ca3af' : '#6b7280'} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: isDark ? '#1f2937' : '#ffffff',
                  border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '6px'
                }}
              />
              <Legend />
              <Bar dataKey="completed" fill="#10b981" name={texts.completed} />
              <Bar dataKey="pending" fill="#f59e0b" name={texts.pending} />
              <Bar dataKey="delayed" fill="#ef4444" name={texts.delayed} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Task Distribution Pie Chart */}
        <div className={`p-6 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {texts.taskDistribution}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={reportData.tasksByStatus}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {reportData.tasksByStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: isDark ? '#1f2937' : '#ffffff',
                  border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '6px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Progress Trend */}
        <div className={`p-6 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {texts.monthlyTrend}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={reportData.monthlyProgress}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
              <XAxis 
                dataKey="month" 
                stroke={isDark ? '#9ca3af' : '#6b7280'}
              />
              <YAxis stroke={isDark ? '#9ca3af' : '#6b7280'} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: isDark ? '#1f2937' : '#ffffff',
                  border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '6px'
                }}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="planned" 
                stackId="1" 
                stroke="#3b82f6" 
                fill="#3b82f6" 
                fillOpacity={0.3}
                name={texts.planned}
              />
              <Area 
                type="monotone" 
                dataKey="completed" 
                stackId="2" 
                stroke="#10b981" 
                fill="#10b981" 
                fillOpacity={0.6}
                name={texts.completed}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Budget Analysis */}
        <div className={`p-6 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {texts.budgetAnalysis}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={reportData.budgetAnalysis} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
              <XAxis type="number" stroke={isDark ? '#9ca3af' : '#6b7280'} />
              <YAxis 
                dataKey="category" 
                type="category" 
                stroke={isDark ? '#9ca3af' : '#6b7280'}
                width={80}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: isDark ? '#1f2937' : '#ffffff',
                  border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '6px'
                }}
                formatter={(value) => [`R$ ${value.toLocaleString()}`, '']}
              />
              <Legend />
              <Bar dataKey="planned" fill="#94a3b8" name={texts.planned} />
              <Bar dataKey="actual" fill="#3b82f6" name={texts.actual} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Reports;
