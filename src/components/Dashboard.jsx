import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart, LineChart, PieChart } from 'lucide-react'; // Ícones de exemplo
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { getUserProjects } from '@/utils/demoDataSetup';

const Dashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (user) {
      setProjects(getUserProjects(user.id));
    }
  }, [user]);

  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status === 'inProgress' || p.status === 'planning').length;
  const completedTasks = 156; // Dados de exemplo
  const teamMembers = 25; // Dados de exemplo

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">{t('welcome')}, {user?.name}!</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('totalProjects')}
            </CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProjects}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('activeProjects')}
            </CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeProjects}</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('completedTasks')}
            </CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTasks}</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('teamMembers')}
            </CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamMembers}</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>{t('recentProjects')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projects.length > 0 ? (
                projects.slice(0, 5).map(project => (
                  <div key={project.id} className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">{project.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {project.description}
                      </p>
                    </div>
                    <div className="ml-auto font-medium text-right">
                      <span className="text-sm text-muted-foreground">{t('progress')}: </span>
                      <span className="font-bold">{project.progress}%</span>
                      <Progress value={project.progress} className="w-[100px] mt-1" />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">{t('noProjects')}</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>{t('projectProgress')}</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            {/* Gráfico de progresso de projetos (placeholder) */}
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Gráfico de progresso aqui (em desenvolvimento)
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
