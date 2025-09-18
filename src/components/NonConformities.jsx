import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  AlertTriangle, 
  Plus, 
  Mail, 
  Calendar, 
  User, 
  FileText, 
  CheckCircle, 
  Clock, 
  X,
  Edit,
  Trash2,
  Send,
  Filter,
  Search
} from 'lucide-react';

const NonConformities = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [nonConformities, setNonConformities] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    severity: 'medium',
    project: '',
    location: '',
    reportedBy: '',
    assignedTo: '',
    dueDate: '',
    status: 'open',
    emailNotifications: true
  });

  // Dados simulados
  const mockNonConformities = [
    {
      id: 1,
      title: 'Qualidade do Concreto Inadequada',
      description: 'O concreto utilizado na fundação não atende às especificações técnicas.',
      severity: 'high',
      project: 'Projeto Alpha',
      location: 'Bloco A - Fundação',
      reportedBy: 'João Silva',
      assignedTo: 'Maria Santos',
      reportedDate: '2024-01-15',
      dueDate: '2024-01-20',
      status: 'open',
      emailNotifications: true
    },
    {
      id: 2,
      title: 'Instalação Elétrica Fora do Padrão',
      description: 'Fiação elétrica instalada sem seguir as normas de segurança.',
      severity: 'medium',
      project: 'Projeto Beta',
      location: 'Andar 2 - Sala 201',
      reportedBy: 'Ana Costa',
      assignedTo: 'Pedro Oliveira',
      reportedDate: '2024-01-16',
      dueDate: '2024-01-25',
      status: 'in_progress',
      emailNotifications: true
    },
    {
      id: 3,
      title: 'Acabamento de Parede Irregular',
      description: 'Superfície da parede apresenta irregularidades no acabamento.',
      severity: 'low',
      project: 'Projeto Gamma',
      location: 'Bloco B - Apartamento 301',
      reportedBy: 'Carlos Lima',
      assignedTo: 'Lucia Ferreira',
      reportedDate: '2024-01-10',
      dueDate: '2024-01-30',
      status: 'resolved',
      emailNotifications: false
    }
  ];

  useEffect(() => {
    setNonConformities(mockNonConformities);
  }, []);

  const translations = {
    pt: {
      title: 'Não Conformidades',
      addNew: 'Nova Não Conformidade',
      search: 'Pesquisar...',
      filter: 'Filtrar por Status',
      all: 'Todos',
      open: 'Aberto',
      inProgress: 'Em Andamento',
      resolved: 'Resolvido',
      severity: 'Severidade',
      high: 'Alta',
      medium: 'Média',
      low: 'Baixa',
      project: 'Projeto',
      location: 'Localização',
      reportedBy: 'Reportado por',
      assignedTo: 'Atribuído a',
      reportedDate: 'Data do Relato',
      dueDate: 'Data Limite',
      status: 'Status',
      description: 'Descrição',
      emailNotifications: 'Notificações por Email',
      save: 'Salvar',
      cancel: 'Cancelar',
      edit: 'Editar',
      delete: 'Excluir',
      sendNotification: 'Enviar Notificação',
      formTitle: 'Título',
      formDescription: 'Descrição',
      formProject: 'Projeto',
      formLocation: 'Localização',
      formReportedBy: 'Reportado por',
      formAssignedTo: 'Atribuído a',
      formDueDate: 'Data Limite',
      formSeverity: 'Severidade',
      formStatus: 'Status',
      formEmailNotifications: 'Ativar notificações por email',
      notificationSent: 'Notificação enviada com sucesso!',
      itemSaved: 'Não conformidade salva com sucesso!',
      itemDeleted: 'Não conformidade excluída com sucesso!'
    },
    en: {
      title: 'Non-Conformities',
      addNew: 'New Non-Conformity',
      search: 'Search...',
      filter: 'Filter by Status',
      all: 'All',
      open: 'Open',
      inProgress: 'In Progress',
      resolved: 'Resolved',
      severity: 'Severity',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      project: 'Project',
      location: 'Location',
      reportedBy: 'Reported by',
      assignedTo: 'Assigned to',
      reportedDate: 'Report Date',
      dueDate: 'Due Date',
      status: 'Status',
      description: 'Description',
      emailNotifications: 'Email Notifications',
      save: 'Save',
      cancel: 'Cancel',
      edit: 'Edit',
      delete: 'Delete',
      sendNotification: 'Send Notification',
      formTitle: 'Title',
      formDescription: 'Description',
      formProject: 'Project',
      formLocation: 'Location',
      formReportedBy: 'Reported by',
      formAssignedTo: 'Assigned to',
      formDueDate: 'Due Date',
      formSeverity: 'Severity',
      formStatus: 'Status',
      formEmailNotifications: 'Enable email notifications',
      notificationSent: 'Notification sent successfully!',
      itemSaved: 'Non-conformity saved successfully!',
      itemDeleted: 'Non-conformity deleted successfully!'
    },
    es: {
      title: 'Informes y Análisis',
      addNew: 'Nueva No Conformidad',
      search: 'Buscar...',
      filter: 'Filtrar por Estado',
      all: 'Todos',
      open: 'Abierto',
      inProgress: 'En Progreso',
      resolved: 'Resuelto',
      severity: 'Severidad',
      high: 'Alta',
      medium: 'Media',
      low: 'Baja',
      project: 'Proyecto',
      location: 'Ubicación',
      reportedBy: 'Reportado por',
      assignedTo: 'Asignado a',
      reportedDate: 'Fecha de Reporte',
      dueDate: 'Fecha Límite',
      status: 'Estado',
      description: 'Descripción',
      emailNotifications: 'Notificaciones por Email',
      save: 'Guardar',
      cancel: 'Cancelar',
      edit: 'Editar',
      delete: 'Eliminar',
      sendNotification: 'Enviar Notificación',
      formTitle: 'Título',
      formDescription: 'Descripción',
      formProject: 'Proyecto',
      formLocation: 'Ubicación',
      formReportedBy: 'Reportado por',
      formAssignedTo: 'Asignado a',
      formDueDate: 'Fecha Límite',
      formSeverity: 'Severidad',
      formStatus: 'Estado',
      formEmailNotifications: 'Activar notificaciones por email',
      notificationSent: '¡Notificación enviada con éxito!',
      itemSaved: '¡No conformidad guardada con éxito!',
      itemDeleted: '¡No conformidad eliminada con éxito!'
    }
  };

  const currentLang = t.language || 'pt';
  const texts = translations[currentLang] || translations.pt;

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'text-red-600 bg-red-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'resolved': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'open': return AlertTriangle;
      case 'in_progress': return Clock;
      case 'resolved': return CheckCircle;
      default: return AlertTriangle;
    }
  };

  const filteredNonConformities = nonConformities.filter(item => {
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.project.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingItem) {
        // Atualizar item existente
        setNonConformities(prev => 
          prev.map(item => 
            item.id === editingItem.id 
              ? { ...formData, id: editingItem.id, reportedDate: editingItem.reportedDate }
              : item
          )
        );
      } else {
        // Criar novo item
        const newItem = {
          ...formData,
          id: Date.now(),
          reportedDate: new Date().toISOString().split('T')[0]
        };
        setNonConformities(prev => [...prev, newItem]);
      }

      // Enviar notificação por email se habilitado
      if (formData.emailNotifications) {
        await sendEmailNotification(formData);
      }

      setShowForm(false);
      setEditingItem(null);
      setFormData({
        title: '',
        description: '',
        severity: 'medium',
        project: '',
        location: '',
        reportedBy: '',
        assignedTo: '',
        dueDate: '',
        status: 'open',
        emailNotifications: true
      });

      alert(texts.itemSaved);
    } catch (error) {
      console.error('Erro ao salvar:', error);
    }
  };

  const sendEmailNotification = async (data) => {
    try {
      const response = await fetch('http://localhost:5001/api/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'non_conformity',
          data: data,
          language: currentLang
        } ),
      });

      if (response.ok) {
        console.log('Notificação enviada com sucesso');
      }
    } catch (error) {
      console.error('Erro ao enviar notificação:', error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('Tem certeza que deseja excluir esta não conformidade?')) {
      setNonConformities(prev => prev.filter(item => item.id !== id));
      alert(texts.itemDeleted);
    }
  };

  const handleSendNotification = async (item) => {
    try {
      await sendEmailNotification(item);
      alert(texts.notificationSent);
    } catch (error) {
      console.error('Erro ao enviar notificação:', error);
    }
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {texts.title}
        </h1>
        
        <button
          onClick={() => setShowForm(true)}
          className="mt-4 sm:mt-0 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          {texts.addNew}
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder={texts.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 pr-4 py-2 w-full rounded-md border ${
                isDark 
                  ? 'bg-gray-800 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-blue-500`}
            />
          </div>
        </div>
        
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className={`px-3 py-2 rounded-md border ${
            isDark 
              ? 'bg-gray-800 border-gray-600 text-white' 
              : 'bg-white border-gray-300 text-gray-900'
          } focus:ring-2 focus:ring-blue-500`}
        >
          <option value="all">{texts.all}</option>
          <option value="open">{texts.open}</option>
          <option value="in_progress">{texts.inProgress}</option>
          <option value="resolved">{texts.resolved}</option>
        </select>
      </div>

      {/* Non-Conformities List */}
      <div className="grid gap-6">
        {filteredNonConformities.map((item) => {
          const StatusIcon = getStatusIcon(item.status);
          
          return (
            <div
              key={item.id}
              className={`p-6 rounded-lg border ${
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } shadow-sm`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <StatusIcon className="h-5 w-5 text-gray-500" />
                    <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {item.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(item.severity)}`}>
                      {texts[item.severity]}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {texts[item.status.replace('_', '')]}
                    </span>
                  </div>
                  
                  <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {item.description}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className={`font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {texts.project}:
                      </span>
                      <span className={`ml-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {item.project}
                      </span>
                    </div>
                    <div>
                      <span className={`font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {texts.location}:
                      </span>
                      <span className={`ml-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {item.location}
                      </span>
                    </div>
                    <div>
                      <span className={`font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {texts.assignedTo}:
                      </span>
                      <span className={`ml-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {item.assignedTo}
                      </span>
                    </div>
                    <div>
                      <span className={`font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {texts.reportedDate}:
                      </span>
                      <span className={`ml-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {new Date(item.reportedDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span className={`font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {texts.dueDate}:
                      </span>
                      <span className={`ml-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {new Date(item.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span className={`font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {texts.reportedBy}:
                      </span>
                      <span className={`ml-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {item.reportedBy}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleSendNotification(item)}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-md"
                    title={texts.sendNotification}
                  >
                    <Mail className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-md"
                    title={texts.edit}
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-md"
                    title={texts.delete}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-lg ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {editingItem ? texts.edit : texts.addNew}
                </h2>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingItem(null);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-md"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {texts.formTitle}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className={`w-full px-3 py-2 rounded-md border ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {texts.formDescription}
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className={`w-full px-3 py-2 rounded-md border ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {texts.formSeverity}
                    </label>
                    <select
                      value={formData.severity}
                      onChange={(e) => setFormData(prev => ({ ...prev, severity: e.target.value }))}
                      className={`w-full px-3 py-2 rounded-md border ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:ring-2 focus:ring-blue-500`}
                    >
                      <option value="low">{texts.low}</option>
                      <option value="medium">{texts.medium}</option>
                      <option value="high">{texts.high}</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {texts.formStatus}
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                      className={`w-full px-3 py-2 rounded-md border ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:ring-2 focus:ring-blue-500`}
                    >
                      <option value="open">{texts.open}</option>
                      <option value="in_progress">{texts.inProgress}</option>
                      <option value="resolved">{texts.resolved}</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {texts.formProject}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.project}
                      onChange={(e) => setFormData(prev => ({ ...prev, project: e.target.value }))}
                      className={`w-full px-3 py-2 rounded-md border ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {texts.formLocation}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      className={`w-full px-3 py-2 rounded-md border ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {texts.formReportedBy}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.reportedBy}
                      onChange={(e) => setFormData(prev => ({ ...prev, reportedBy: e.target.value }))}
                      className={`w-full px-3 py-2 rounded-md border ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {texts.formAssignedTo}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.assignedTo}
                      onChange={(e) => setFormData(prev => ({ ...prev, assignedTo: e.target.value }))}
                      className={`w-full px-3 py-2 rounded-md border ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {texts.formDueDate}
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dueDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                    className={`w-full px-3 py-2 rounded-md border ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="emailNotifications"
                    checked={formData.emailNotifications}
                    onChange={(e) => setFormData(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="emailNotifications" className={`ml-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {texts.formEmailNotifications}
                  </label>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    {texts.save}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingItem(null);
                    }}
                    className={`flex-1 px-4 py-2 rounded-md border ${
                      isDark 
                        ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {texts.cancel}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NonConformities;
