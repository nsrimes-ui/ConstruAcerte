import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Traduções para os idiomas suportados
const translations = {
  pt: {
    // Navegação
    dashboard: 'Dashboard',
    projects: 'Projetos',
    tasks: 'Tarefas',
    calendar: 'Calendário',
    reports: 'Relatórios',
    settings: 'Configurações',
    
    // Dashboard
    totalProjects: 'Total de Projetos',
    activeProjects: 'Projetos Ativos',
    completedTasks: 'Tarefas Concluídas',
    teamMembers: 'Membros da Equipe',
    recentProjects: 'Projetos Recentes',
    projectProgress: 'Progresso do Projeto',
    
    // Projetos
    projectName: 'Nome do Projeto',
    startDate: 'Data de Início',
    endDate: 'Data de Término',
    status: 'Status',
    progress: 'Progresso',
    actions: 'Ações',
    newProject: 'Novo Projeto',
    editProject: 'Editar Projeto',
    deleteProject: 'Excluir Projeto',
    
    // Status
    planning: 'Planejamento',
    inProgress: 'Em Andamento',
    completed: 'Concluído',
    onHold: 'Pausado',
    
    // Botões e ações
    save: 'Salvar',
    cancel: 'Cancelar',
    edit: 'Editar',
    delete: 'Excluir',
    view: 'Visualizar',
    add: 'Adicionar',
    search: 'Pesquisar',
    filter: 'Filtrar',
    
    // Mensagens
    welcome: 'Bem-vindo ao ConstructPro',
    noProjects: 'Nenhum projeto encontrado',
    loading: 'Carregando...', 
    error: 'Erro ao carregar dados',
    
    // Tema e idioma
    darkMode: 'Modo Escuro',
    lightMode: 'Modo Claro',
    language: 'Idioma',
    portuguese: 'Português',
    english: 'Inglês',
    spanish: 'Espanhol'
  },
  
  en: {
    // Navigation
    dashboard: 'Dashboard',
    projects: 'Projects',
    tasks: 'Tasks',
    calendar: 'Calendar',
    reports: 'Reports',
    settings: 'Settings',
    
    // Dashboard
    totalProjects: 'Total Projects',
    activeProjects: 'Active Projects',
    completedTasks: 'Completed Tasks',
    teamMembers: 'Team Members',
    recentProjects: 'Recent Projects',
    projectProgress: 'Project Progress',
    
    // Projects
    projectName: 'Project Name',
    startDate: 'Start Date',
    endDate: 'End Date',
    status: 'Status',
    progress: 'Progress',
    actions: 'Actions',
    newProject: 'New Project',
    editProject: 'Edit Project',
    deleteProject: 'Delete Project',
    
    // Status
    planning: 'Planning',
    inProgress: 'In Progress',
    completed: 'Completed',
    onHold: 'On Hold',
    
    // Buttons and actions
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    view: 'View',
    add: 'Add',
    search: 'Search',
    filter: 'Filter',
    
    // Messages
    welcome: 'Welcome to ConstructPro',
    noProjects: 'No projects found',
    loading: 'Loading...', 
    error: 'Error loading data',
    
    // Theme and language
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    language: 'Language',
    portuguese: 'Portuguese',
    english: 'English',
    spanish: 'Spanish'
  },
  
  es: {
    // Navegación
    dashboard: 'Panel',
    projects: 'Proyectos',
    tasks: 'Tareas',
    calendar: 'Calendario',
    reports: 'Informes',
    settings: 'Configuración',
    
    // Dashboard
    totalProjects: 'Total de Proyectos',
    activeProjects: 'Proyectos Activos',
    completedTasks: 'Tareas Completadas',
    teamMembers: 'Miembros del Equipo',
    recentProjects: 'Proyectos Recientes',
    projectProgress: 'Progreso del Proyecto',
    
    // Proyectos
    projectName: 'Nombre del Proyecto',
    startDate: 'Fecha de Inicio',
    endDate: 'Fecha de Fin',
    status: 'Estado',
    progress: 'Progreso',
    actions: 'Acciones',
    newProject: 'Nuevo Proyecto',
    editProject: 'Editar Proyecto',
    deleteProject: 'Eliminar Proyecto',
    
    // Estados
    planning: 'Planificación',
    inProgress: 'En Progreso',
    completed: 'Completado',
    onHold: 'En Pausa',
    
    // Botones y acciones
    save: 'Guardar',
    cancel: 'Cancelar',
    edit: 'Editar',
    delete: 'Eliminar',
    view: 'Ver',
    add: 'Agregar',
    search: 'Buscar',
    filter: 'Filtrar',
    
    // Mensajes
    welcome: 'Bienvenido a ConstructPro',
    noProjects: 'No se encontraron proyectos',
    loading: 'Cargando...', 
    error: 'Error al cargar datos',
    
    // Tema e idioma
    darkMode: 'Modo Oscuro',
    lightMode: 'Modo Claro',
    language: 'Idioma',
    portuguese: 'Portugués',
    english: 'Inglés',
    spanish: 'Español'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Verificar idioma salvo no localStorage
    const savedLanguage = localStorage.getItem('constructpro-language');
    if (savedLanguage && translations[savedLanguage]) {
      return savedLanguage;
    }
    
    // Detectar idioma do navegador
    const browserLanguage = navigator.language.split('-')[0];
    if (translations[browserLanguage]) {
      return browserLanguage;
    }
    
    // Padrão: português
    return 'pt';
  });

  useEffect(() => {
    // Salvar preferência no localStorage
    localStorage.setItem('constructpro-language', language);
  }, [language]);

  const t = (key) => {
    return translations[language][key] || key;
  };

  const changeLanguage = (newLanguage) => {
    if (translations[newLanguage]) {
      setLanguage(newLanguage);
    }
  };

  const value = {
    language,
    setLanguage: changeLanguage,
    t,
    availableLanguages: [
      { code: 'pt', name: 'Português', flag: '🇧🇷' },
      { code: 'en', name: 'English', flag: '🇺🇸' },
      { code: 'es', name: 'Español', flag: '🇪🇸' }
    ]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
