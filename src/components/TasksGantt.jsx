import React, { useState, useEffect } from 'react';
import { Calendar, Plus, AlertTriangle, Mail, ShoppingCart, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

const TasksGantt = ( ) => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [showNewTask, setShowNewTask] = useState(false);
  const [showNonConformity, setShowNonConformity] = useState(false);
  const [newTask, setNewTask] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    priority: 'medium',
    assignedTo: '',
    dependencies: [],
    materials: []
  });

  // Dados de exemplo para demonstração
  const sampleTasks = [
    {
      id: '1',
      name: 'Fundação',
      description: 'Escavação e concretagem da fundação',
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      progress: 100,
      status: 'completed',
      priority: 'high',
      assignedTo: 'Equipe A',
      dependencies: [],
      materials: ['Concreto', 'Ferro', 'Brita']
    },
    {
      id: '2', 
      name: 'Estrutura',
      description: 'Construção da estrutura de concreto',
      startDate: '2024-02-16',
      endDate: '2024-04-30',
      progress: 75,
      status: 'in_progress',
      priority: 'high',
      assignedTo: 'Equipe B',
      dependencies: ['1'],
      materials: ['Concreto', 'Ferro', 'Forma de madeira']
    },
    {
      id: '3',
      name: 'Alvenaria',
      description: 'Construção das paredes',
      startDate: '2024-03-01',
      endDate: '2024-05-15',
      progress: 45,
      status: 'in_progress', 
      priority: 'medium',
      assignedTo: 'Equipe C',
      dependencies: ['2'],
      materials: ['Tijolo', 'Cimento', 'Areia']
    },
    {
      id: '4',
      name: 'Instalações Elétricas',
      description: 'Instalação do sistema elétrico',
      startDate: '2024-04-01',
      endDate: '2024-06-15',
      progress: 20,
      status: 'planning',
      priority: 'medium',
      assignedTo: 'Eletricista',
      dependencies: ['3'],
      materials: ['Fios', 'Disjuntores', 'Tomadas']
    }
  ];

  useEffect(() => {
    setTasks(sampleTasks);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in_progress': return 'bg-blue-500';
      case 'planning': return 'bg-yellow-500';
      case 'delayed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleCreateTask = () => {
    const task = {
      ...newTask,
      id: Date.now().toString(),
      progress: 0,
      status: 'planning'
    };
    setTasks([...tasks, task]);
    setNewTask({
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      priority: 'medium',
      assignedTo: '',
      dependencies: [],
      materials: []
    });
    setShowNewTask(false);
  };

  const sendNonConformityEmail = (task, issue) => {
    // Simulação de envio de email
    alert(`Email de não conformidade enviado!\n\nTarefa: ${task.name}\nProblema: ${issue}\nResponsável: ${task.assignedTo}`);
  };

  const createPurchaseOrder = (materials) => {
    // Simulação de ordem de compra
    alert(`Ordem de compra criada!\n\nMateriais: ${materials.join(', ')}\nStatus: Aguardando aprovação`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestão de Tarefas - Gantt</h1>
        <div className="flex space-x-2">
          <Button onClick={() => setShowNewTask(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Tarefa
          </Button>
          <Button variant="outline" onClick={() => setShowNonConformity(true)}>
            <AlertTriangle className="mr-2 h-4 w-4" />
            Não Conformidade
          </Button>
        </div>
      </div>

      {/* Gráfico de Gantt Simplificado */}
      <Card>
        <CardHeader>
          <CardTitle>Cronograma do Projeto</CardTitle>
          <CardDescription>Visualização das tarefas e dependências</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{task.name}</h3>
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(task.status)} text-white`}>
                      {task.status}
                    </span>
                    <span className={`text-sm font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Início:</span> {task.startDate}
                  </div>
                  <div>
                    <span className="font-medium">Fim:</span> {task.endDate}
                  </div>
                  <div>
                    <span className="font-medium">Duração:</span> {calculateDuration(task.startDate, task.endDate)} dias
                  </div>
                  <div>
                    <span className="font-medium">Responsável:</span> {task.assignedTo}
                  </div>
                </div>

                {/* Barra de Progresso */}
                <div className="mt-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progresso</span>
                    <span>{task.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getStatusColor(task.status)}`}
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Materiais */}
                <div className="mt-3">
                  <span className="font-medium text-sm">Materiais: </span>
                  <span className="text-sm">{task.materials.join(', ')}</span>
                </div>

                {/* Ações */}
                <div className="mt-3 flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => sendNonConformityEmail(task, 'Atraso na execução')}
                  >
                    <Mail className="mr-1 h-3 w-3" />
                    Notificar
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => createPurchaseOrder(task.materials)}
                  >
                    <ShoppingCart className="mr-1 h-3 w-3" />
                    Comprar Materiais
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modal Nova Tarefa */}
      {showNewTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Nova Tarefa</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="taskName">Nome da Tarefa</Label>
                <Input
                  id="taskName"
                  value={newTask.name}
                  onChange={(e) => setNewTask({...newTask, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="taskDesc">Descrição</Label>
                <Input
                  id="taskDesc"
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="startDate">Data Início</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={newTask.startDate}
                    onChange={(e) => setNewTask({...newTask, startDate: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">Data Fim</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={newTask.endDate}
                    onChange={(e) => setNewTask({...newTask, endDate: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="priority">Prioridade</Label>
                <Select value={newTask.priority} onValueChange={(value) => setNewTask({...newTask, priority: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Baixa</SelectItem>
                    <SelectItem value="medium">Média</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="assignedTo">Responsável</Label>
                <Input
                  id="assignedTo"
                  value={newTask.assignedTo}
                  onChange={(e) => setNewTask({...newTask, assignedTo: e.target.value})}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowNewTask(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateTask}>
                  Criar Tarefa
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal Não Conformidade */}
      {showNonConformity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Reportar Não Conformidade</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Sistema de não conformidade permite notificar problemas e gerar ações corretivas automaticamente.
                </AlertDescription>
              </Alert>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowNonConformity(false)}>
                  Fechar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TasksGantt;
