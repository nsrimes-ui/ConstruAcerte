// Script para configurar dados de demonstração no localStorage

export const setupDemoData = () => {
  // Verificar se já existem dados
  const existingUsers = localStorage.getItem("constructpro-users");
  
  if (!existingUsers) {
    // Criar usuário de demonstração
    const demoUsers = [
      {
        id: "1",
        name: "João Silva",
        email: "demo@constructpro.com",
        password: "demo123",
        company: "Construtora Silva & Associados",
        role: "engineer",
        avatar: null,
        createdAt: new Date().toISOString()
      },
      {
        id: "2",
        name: "Maria Santos",
        email: "maria@constructpro.com",
        password: "maria123",
        company: "Arquitetura Santos",
        role: "architect",
        avatar: null,
        createdAt: new Date().toISOString()
      }
    ];

    localStorage.setItem("constructpro-users", JSON.stringify(demoUsers));
  }

  // Configurar projetos de demonstração para cada usuário
  const demoProjects = {
    "1": [ // Projetos do João Silva
      {
        id: "1",
        userId: "1",
        name: "Edifício Residencial Aurora",
        description: "Construção de edifício residencial de 15 andares",
        startDate: "2024-01-15",
        endDate: "2024-12-20",
        status: "inProgress",
        progress: 75,
        budget: 2500000,
        location: "São Paulo, SP",
        createdAt: "2024-01-15T10:00:00Z"
      },
      {
        id: "2",
        userId: "1",
        name: "Centro Comercial Plaza",
        description: "Desenvolvimento de centro comercial moderno",
        startDate: "2024-02-01",
        endDate: "2024-11-30",
        status: "inProgress",
        progress: 45,
        budget: 3200000,
        location: "Rio de Janeiro, RJ",
        createdAt: "2024-02-01T09:00:00Z"
      },
      {
        id: "3",
        userId: "1",
        name: "Condomínio Jardim Verde",
        description: "Condomínio residencial com área de lazer",
        startDate: "2024-01-10",
        endDate: "2024-10-15",
        status: "inProgress",
        progress: 90,
        budget: 1800000,
        location: "Belo Horizonte, MG",
        createdAt: "2024-01-10T08:00:00Z"
      }
    ],
    "2": [ // Projetos da Maria Santos
      {
        id: "4",
        userId: "2",
        name: "Casa Moderna Alphaville",
        description: "Projeto arquitetônico de casa de alto padrão",
        startDate: "2024-03-01",
        endDate: "2024-09-30",
        status: "planning",
        progress: 25,
        budget: 850000,
        location: "Alphaville, SP",
        createdAt: "2024-03-01T14:00:00Z"
      },
      {
        id: "5",
        userId: "2",
        name: "Reforma Escritório Central",
        description: "Reforma completa de escritório corporativo",
        startDate: "2024-02-15",
        endDate: "2024-06-30",
        status: "inProgress",
        progress: 60,
        budget: 450000,
        location: "São Paulo, SP",
        createdAt: "2024-02-15T11:00:00Z"
      }
    ]
  };

  // Salvar projetos no localStorage
  Object.keys(demoProjects).forEach(userId => {
    const userProjectsKey = `constructpro-projects-${userId}`;
    const existingProjects = localStorage.getItem(userProjectsKey);
    
    if (!existingProjects) {
      localStorage.setItem(userProjectsKey, JSON.stringify(demoProjects[userId]));
    }
  });

  // Configurar tarefas de demonstração
  const demoTasks = {
    "1": [ // Tarefas do projeto 1
      {
        id: "1",
        projectId: "1",
        userId: "1",
        title: "Fundação e estrutura",
        description: "Execução da fundação e estrutura de concreto",
        status: "completed",
        priority: "high",
        startDate: "2024-01-15",
        endDate: "2024-04-30",
        assignedTo: "Equipe de Estrutura",
        progress: 100
      },
      {
        id: "2",
        projectId: "1",
        userId: "1",
        title: "Alvenaria e instalações",
        description: "Execução de alvenaria e instalações elétricas/hidráulicas",
        status: "inProgress",
        priority: "high",
        startDate: "2024-05-01",
        endDate: "2024-08-30",
        assignedTo: "Equipe de Instalações",
        progress: 75
      }
    ]
  };

  // Salvar tarefas no localStorage
  Object.keys(demoTasks).forEach(projectId => {
    const projectTasksKey = `constructpro-tasks-${projectId}`;
    const existingTasks = localStorage.getItem(projectTasksKey);
    
    if (!existingTasks) {
      localStorage.setItem(projectTasksKey, JSON.stringify(demoTasks[projectId]));
    }
  });

  console.log("Dados de demonstração configurados com sucesso!");
};

// Função para limpar todos os dados
export const clearAllData = () => {
  const keys = Object.keys(localStorage).filter(key => 
    key.startsWith("constructpro-")
  );
  
  keys.forEach(key => {
    localStorage.removeItem(key);
  });
  
  console.log("Todos os dados foram limpos!");
};

// Função para obter projetos do usuário atual
export const getUserProjects = (userId) => {
  const userProjectsKey = `constructpro-projects-${userId}`;
  const projects = localStorage.getItem(userProjectsKey);
  return projects ? JSON.parse(projects) : [];
};

// Função para salvar projetos do usuário
export const saveUserProjects = (userId, projects) => {
  const userProjectsKey = `constructpro-projects-${userId}`;
  localStorage.setItem(userProjectsKey, JSON.stringify(projects));
};

// Função para obter tarefas de um projeto
export const getProjectTasks = (projectId) => {
  const projectTasksKey = `constructpro-tasks-${projectId}`;
  const tasks = localStorage.getItem(projectTasksKey);
  return tasks ? JSON.parse(tasks) : [];
};

// Função para salvar tarefas de um projeto
export const saveProjectTasks = (projectId, tasks) => {
  const projectTasksKey = `constructpro-tasks-${projectId}`;
  localStorage.setItem(projectTasksKey, JSON.stringify(tasks));
};
