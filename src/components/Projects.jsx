import React, { useEffect, useState } from 'react';
import { PlusCircle, Edit, Trash2, Eye, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { getUserProjects, saveUserProjects } from '@/utils/demoDataSetup';

const Projects = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'planning',
    progress: 0,
    budget: 0,
    location: ''
  });

  useEffect(() => {
    if (user) {
      setLoading(true);
      const userProjects = getUserProjects(user.id);
      setProjects(userProjects);
      setLoading(false);
    }
  }, [user]);

  const handleSaveProjects = (updatedProjects) => {
    setProjects(updatedProjects);
    saveUserProjects(user.id, updatedProjects);
  };

  const handleNewProjectClick = () => {
    setCurrentProject(null);
    setFormData({
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      status: 'planning',
      progress: 0,
      budget: 0,
      location: ''
    });
    setIsModalOpen(true);
  };

  const handleEditProjectClick = (project) => {
    setCurrentProject(project);
    setFormData({
      name: project.name,
      description: project.description,
      startDate: project.startDate,
      endDate: project.endDate,
      status: project.status,
      progress: project.progress,
      budget: project.budget,
      location: project.location
    });
    setIsModalOpen(true);
  };

  const handleDeleteProject = (projectId) => {
    if (window.confirm('Tem certeza que deseja excluir este projeto?')) {
      const updatedProjects = projects.filter(p => p.id !== projectId);
      handleSaveProjects(updatedProjects);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStatusChange = (value) => {
    setFormData(prev => ({
      ...prev,
      status: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.startDate || !formData.endDate) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      setError('A data de início não pode ser posterior à data de término.');
      return;
    }

    if (currentProject) {
      // Editar projeto existente
      const updatedProjects = projects.map(p =>
        p.id === currentProject.id ? { ...p, ...formData } : p
      );
      handleSaveProjects(updatedProjects);
    } else {
      // Adicionar novo projeto
      const newProject = {
        id: String(Date.now()),
        userId: user.id,
        ...formData,
        createdAt: new Date().toISOString()
      };
      handleSaveProjects([...projects, newProject]);
    }
    setIsModalOpen(false);
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'planning': return t('planning');
      case 'inProgress': return t('inProgress');
      case 'completed': return t('completed');
      case 'onHold': return t('onHold');
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="ml-2">{t('loading')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{t('projects')}</h1>
        <Button onClick={handleNewProjectClick}>
          <PlusCircle className="mr-2 h-4 w-4" />
          {t('newProject')}
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{t('noProjects')}</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map(project => (
            <Card key={project.id}>
              <CardHeader>
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">{t('startDate')}:</span> {project.startDate}
                </p>
                <p className="text-sm">
                  <span className="font-medium">{t('endDate')}:</span> {project.endDate}
                </p>
                <p className="text-sm">
                  <span className="font-medium">{t('status')}:</span> {getStatusLabel(project.status)}
                </p>
                <p className="text-sm">
                  <span className="font-medium">{t('progress')}:</span> {project.progress}%
                </p>
                <div className="flex space-x-2 mt-4">
                  <Button variant="outline" size="sm" onClick={() => handleEditProjectClick(project)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteProject(project.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  {/* <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button> */}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle>{currentProject ? t('editProject') : t('newProject')}</CardTitle>
              <CardDescription>Preencha os detalhes do projeto.</CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('projectName')}</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Input
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">{t('startDate')}</Label>
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">{t('endDate')}</Label>
                    <Input
                      id="endDate"
                      name="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">{t('status')}</Label>
                  <Select onValueChange={handleStatusChange} value={formData.status}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planning">{t('planning')}</SelectItem>
                      <SelectItem value="inProgress">{t('inProgress')}</SelectItem>
                      <SelectItem value="completed">{t('completed')}</SelectItem>
                      <SelectItem value="onHold">{t('onHold')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="progress">{t('progress')}</Label>
                  <Input
                    id="progress"
                    name="progress"
                    type="number"
                    value={formData.progress}
                    onChange={handleFormChange}
                    min="0"
                    max="100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget">Orçamento</Label>
                  <Input
                    id="budget"
                    name="budget"
                    type="number"
                    value={formData.budget}
                    onChange={handleFormChange}
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Localização</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                    {t('cancel')}
                  </Button>
                  <Button type="submit">
                    {t('save')}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Projects;
