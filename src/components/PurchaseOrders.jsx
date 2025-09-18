import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  ShoppingCart, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar, 
  DollarSign, 
  Package, 
  User, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  X,
  Link,
  Unlink
} from 'lucide-react';

const PurchaseOrders = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showTaskLinkModal, setShowTaskLinkModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    orderNumber: '',
    supplier: '',
    description: '',
    items: [{ description: '', quantity: 1, unitPrice: 0, total: 0 }],
    totalAmount: 0,
    requestDate: '',
    expectedDelivery: '',
    status: 'pending',
    priority: 'medium',
    project: '',
    linkedTasks: [],
    notes: ''
  });

  // Dados simulados
  const mockPurchaseOrders = [
    {
      id: 1,
      orderNumber: 'PO-2024-001',
      supplier: 'Construtora ABC Ltda',
      description: 'Materiais para fundação',
      items: [
        { description: 'Cimento Portland', quantity: 50, unitPrice: 25.00, total: 1250.00 },
        { description: 'Areia lavada', quantity: 10, unitPrice: 45.00, total: 450.00 },
        { description: 'Brita 1', quantity: 8, unitPrice: 55.00, total: 440.00 }
      ],
      totalAmount: 2140.00,
      requestDate: '2024-01-15',
      expectedDelivery: '2024-01-25',
      status: 'approved',
      priority: 'high',
      project: 'Projeto Alpha',
      linkedTasks: ['Escavação', 'Concretagem da fundação'],
      notes: 'Entrega urgente para não atrasar cronograma'
    },
    {
      id: 2,
      orderNumber: 'PO-2024-002',
      supplier: 'Elétrica Beta Ltda',
      description: 'Material elétrico para instalação',
      items: [
        { description: 'Cabo flexível 2,5mm', quantity: 100, unitPrice: 3.50, total: 350.00 },
        { description: 'Disjuntores 20A', quantity: 15, unitPrice: 12.00, total: 180.00 },
        { description: 'Tomadas 2P+T', quantity: 25, unitPrice: 8.50, total: 212.50 }
      ],
      totalAmount: 742.50,
      requestDate: '2024-01-18',
      expectedDelivery: '2024-01-28',
      status: 'pending',
      priority: 'medium',
      project: 'Projeto Beta',
      linkedTasks: ['Instalação elétrica'],
      notes: ''
    },
    {
      id: 3,
      orderNumber: 'PO-2024-003',
      supplier: 'Acabamentos Gamma',
      description: 'Materiais de acabamento',
      items: [
        { description: 'Tinta acrílica branca', quantity: 20, unitPrice: 35.00, total: 700.00 },
        { description: 'Piso cerâmico 60x60', quantity: 50, unitPrice: 25.00, total: 1250.00 }
      ],
      totalAmount: 1950.00,
      requestDate: '2024-01-20',
      expectedDelivery: '2024-02-05',
      status: 'delivered',
      priority: 'low',
      project: 'Projeto Gamma',
      linkedTasks: ['Pintura', 'Instalação de pisos'],
      notes: 'Material entregue conforme especificação'
    }
  ];

  const mockTasks = [
    { id: 1, name: 'Escavação', project: 'Projeto Alpha' },
    { id: 2, name: 'Concretagem da fundação', project: 'Projeto Alpha' },
    { id: 3, name: 'Instalação elétrica', project: 'Projeto Beta' },
    { id: 4, name: 'Pintura', project: 'Projeto Gamma' },
    { id: 5, name: 'Instalação de pisos', project: 'Projeto Gamma' },
    { id: 6, name: 'Instalação hidráulica', project: 'Projeto Alpha' },
    { id: 7, name: 'Cobertura', project: 'Projeto Beta' }
  ];

  useEffect(() => {
    setPurchaseOrders(mockPurchaseOrders);
    setTasks(mockTasks);
  }, []);

  const translations = {
    pt: {
      title: 'Ordens de Compra',
      newOrder: 'Nova Ordem de Compra',
      search: 'Pesquisar...',
      filter: 'Filtrar por Status',
      all: 'Todos',
      pending: 'Pendente',
      approved: 'Aprovado',
      delivered: 'Entregue',
      cancelled: 'Cancelado',
      orderNumber: 'Número da Ordem',
      supplier: 'Fornecedor',
      description: 'Descrição',
      totalAmount: 'Valor Total',
      requestDate: 'Data da Solicitação',
      expectedDelivery: 'Entrega Prevista',
      status: 'Status',
      priority: 'Prioridade',
      high: 'Alta',
      medium: 'Média',
      low: 'Baixa',
      project: 'Projeto',
      linkedTasks: 'Tarefas Vinculadas',
      notes: 'Observações',
      items: 'Itens',
      quantity: 'Quantidade',
      unitPrice: 'Preço Unitário',
      total: 'Total',
      addItem: 'Adicionar Item',
      removeItem: 'Remover Item',
      save: 'Salvar',
      cancel: 'Cancelar',
      edit: 'Editar',
      delete: 'Excluir',
      view: 'Visualizar',
      linkTasks: 'Vincular Tarefas',
      unlinkTask: 'Desvincular Tarefa',
      selectTasks: 'Selecionar Tarefas',
      availableTasks: 'Tarefas Disponíveis',
      selectedTasks: 'Tarefas Selecionadas',
      orderSaved: 'Ordem de compra salva com sucesso!',
      orderDeleted: 'Ordem de compra excluída com sucesso!',
      tasksLinked: 'Tarefas vinculadas com sucesso!'
    },
    en: {
      title: 'Purchase Orders',
      newOrder: 'New Purchase Order',
      search: 'Search...',
      filter: 'Filter by Status',
      all: 'All',
      pending: 'Pending',
      approved: 'Approved',
      delivered: 'Delivered',
      cancelled: 'Cancelled',
      orderNumber: 'Order Number',
      supplier: 'Supplier',
      description: 'Description',
      totalAmount: 'Total Amount',
      requestDate: 'Request Date',
      expectedDelivery: 'Expected Delivery',
      status: 'Status',
      priority: 'Priority',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      project: 'Project',
      linkedTasks: 'Linked Tasks',
      notes: 'Notes',
      items: 'Items',
      quantity: 'Quantity',
      unitPrice: 'Unit Price',
      total: 'Total',
      addItem: 'Add Item',
      removeItem: 'Remove Item',
      save: 'Save',
      cancel: 'Cancel',
      edit: 'Edit',
      delete: 'Delete',
      view: 'View',
      linkTasks: 'Link Tasks',
      unlinkTask: 'Unlink Task',
      selectTasks: 'Select Tasks',
      availableTasks: 'Available Tasks',
      selectedTasks: 'Selected Tasks',
      orderSaved: 'Purchase order saved successfully!',
      orderDeleted: 'Purchase order deleted successfully!',
      tasksLinked: 'Tasks linked successfully!'
    },
    es: {
      title: 'Órdenes de Compra',
      newOrder: 'Nueva Orden de Compra',
      search: 'Buscar...',
      filter: 'Filtrar por Estado',
      all: 'Todos',
      pending: 'Pendiente',
      approved: 'Aprobado',
      delivered: 'Entregado',
      cancelled: 'Cancelado',
      orderNumber: 'Número de Orden',
      supplier: 'Proveedor',
      description: 'Descripción',
      totalAmount: 'Monto Total',
      requestDate: 'Fecha de Solicitud',
      expectedDelivery: 'Entrega Esperada',
      status: 'Estado',
      priority: 'Prioridad',
      high: 'Alta',
      medium: 'Media',
      low: 'Baja',
      project: 'Proyecto',
      linkedTasks: 'Tareas Vinculadas',
      notes: 'Notas',
      items: 'Artículos',
      quantity: 'Cantidad',
      unitPrice: 'Precio Unitario',
      total: 'Total',
      addItem: 'Agregar Artículo',
      removeItem: 'Eliminar Artículo',
      save: 'Guardar',
      cancel: 'Cancelar',
      edit: 'Editar',
      delete: 'Eliminar',
      view: 'Ver',
      linkTasks: 'Vincular Tareas',
      unlinkTask: 'Desvincular Tarea',
      selectTasks: 'Seleccionar Tareas',
      availableTasks: 'Tareas Disponibles',
      selectedTasks: 'Tareas Seleccionadas',
      orderSaved: '¡Orden de compra guardada con éxito!',
      orderDeleted: '¡Orden de compra eliminada con éxito!',
      tasksLinked: '¡Tareas vinculadas con éxito!'
    }
  };

  const currentLang = t.language || 'pt';
  const texts = translations[currentLang] || translations.pt;

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'approved': return 'text-blue-600 bg-blue-100';
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return Clock;
      case 'approved': return CheckCircle;
      case 'delivered': return Package;
      case 'cancelled': return AlertCircle;
      default: return Clock;
    }
  };

  const filteredOrders = purchaseOrders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const calculateItemTotal = (quantity, unitPrice) => {
    return quantity * unitPrice;
  };

  const calculateOrderTotal = (items) => {
    return items.reduce((sum, item) => sum + item.total, 0);
  };

  const updateItemTotal = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    newItems[index].total = calculateItemTotal(newItems[index].quantity, newItems[index].unitPrice);
    
    const newFormData = {
      ...formData,
      items: newItems,
      totalAmount: calculateOrderTotal(newItems)
    };
    
    setFormData(newFormData);
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 1, unitPrice: 0, total: 0 }]
    }));
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      items: newItems,
      totalAmount: calculateOrderTotal(newItems)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    try {
      if (editingOrder) {
        setPurchaseOrders(prev => 
          prev.map(order => 
            order.id === editingOrder.id 
              ? { ...formData, id: editingOrder.id }
              : order
          )
        );
      } else {
        const newOrder = {
          ...formData,
          id: Date.now(),
          orderNumber: formData.orderNumber || `PO-2024-${String(Date.now()).slice(-3)}`
        };
        setPurchaseOrders(prev => [...prev, newOrder]);
      }

      setShowForm(false);
      setEditingOrder(null);
      resetForm();
      alert(texts.orderSaved);
    } catch (error) {
      console.error('Erro ao salvar ordem:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      orderNumber: '',
      supplier: '',
      description: '',
      items: [{ description: '', quantity: 1, unitPrice: 0, total: 0 }],
      totalAmount: 0,
      requestDate: '',
      expectedDelivery: '',
      status: 'pending',
      priority: 'medium',
      project: '',
      linkedTasks: [],
      notes: ''
    });
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
    setFormData(order);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('Tem certeza que deseja excluir esta ordem de compra?')) {
      setPurchaseOrders(prev => prev.filter(order => order.id !== id));
      alert(texts.orderDeleted);
    }
  };

  const handleLinkTasks = (order) => {
    setSelectedOrder(order);
    setShowTaskLinkModal(true);
  };

  const handleTaskLinkSubmit = (selectedTaskIds) => {
    const selectedTaskNames = tasks
      .filter(task => selectedTaskIds.includes(task.id))
      .map(task => task.name);

    setPurchaseOrders(prev => 
      prev.map(order => 
        order.id === selectedOrder.id 
          ? { ...order, linkedTasks: selectedTaskNames }
          : order
      )
    );

    setShowTaskLinkModal(false);
    setSelectedOrder(null);
    alert(texts.tasksLinked);
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
          {texts.newOrder}
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
          <option value="pending">{texts.pending}</option>
          <option value="approved">{texts.approved}</option>
          <option value="delivered">{texts.delivered}</option>
          <option value="cancelled">{texts.cancelled}</option>
        </select>
      </div>

      {/* Purchase Orders List */}
      <div className="grid gap-6">
        {filteredOrders.map((order) => {
          const StatusIcon = getStatusIcon(order.status);
          
          return (
            <div
              key={order.id}
              className={`p-6 rounded-lg border ${
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } shadow-sm`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <ShoppingCart className="h-5 w-5 text-gray-500" />
                    <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {order.orderNumber}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {texts[order.status]}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(order.priority)}`}>
                      {texts[order.priority]}
                    </span>
                  </div>
                  
                  <p className={`text-sm mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {order.description}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className={`font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {texts.supplier}:
                      </span>
                      <span className={`ml-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {order.supplier}
                      </span>
                    </div>
                    <div>
                      <span className={`font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {texts.totalAmount}:
                      </span>
                      <span className={`ml-2 font-semibold text-green-600`}>
                        R$ {order.totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div>
                      <span className={`font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {texts.requestDate}:
                      </span>
                      <span className={`ml-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {new Date(order.requestDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span className={`font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {texts.expectedDelivery}:
                      </span>
                      <span className={`ml-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {new Date(order.expectedDelivery).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {order.linkedTasks.length > 0 && (
                    <div className="mt-3">
                      <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {texts.linkedTasks}:
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {order.linkedTasks.map((task, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            {task}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleLinkTasks(order)}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-md"
                    title={texts.linkTasks}
                  >
                    <Link className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleEdit(order)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-md"
                    title={texts.edit}
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-md"
                    title={texts.delete}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Items Summary */}
              <div className={`mt-4 pt-4 border-t ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                <h4 className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {texts.items} ({order.items.length})
                </h4>
                <div className="space-y-1">
                  {order.items.slice(0, 3).map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                        {item.description} (x{item.quantity})
                      </span>
                      <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        R$ {item.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      +{order.items.length - 3} itens adicionais
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {editingOrder ? texts.edit : texts.newOrder}
                </h2>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingOrder(null);
                    resetForm();
                  }}
                  className="p-2 hover:bg-gray-100 rounded-md"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {texts.orderNumber}
                    </label>
                    <input
                      type="text"
                      value={formData.orderNumber}
                      onChange={(e) => setFormData(prev => ({ ...prev, orderNumber: e.target.value }))}
                      className={`w-full px-3 py-2 rounded-md border ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:ring-2 focus:ring-blue-500`}
                      placeholder="PO-2024-XXX"
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {texts.supplier}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.supplier}
                      onChange={(e) => setFormData(prev => ({ ...prev, supplier: e.target.value }))}
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
                    {texts.description}
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className={`w-full px-3 py-2 rounded-md border ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-blue-500`}
                  />
                </div>

                {/* Items */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {texts.items}
                    </label>
                    <button
                      type="button"
                      onClick={addItem}
                      className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm flex items-center gap-1"
                    >
                      <Plus className="h-3 w-3" />
                      {texts.addItem}
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {formData.items.map((item, index) => (
                      <div key={index} className={`p-4 border rounded-md ${
                        isDark ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'
                      }`}>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                          <div className="md:col-span-2">
                            <input
                              type="text"
                              placeholder={texts.description}
                              value={item.description}
                              onChange={(e) => updateItemTotal(index, 'description', e.target.value)}
                              className={`w-full px-3 py-2 rounded-md border ${
                                isDark 
                                  ? 'bg-gray-600 border-gray-500 text-white' 
                                  : 'bg-white border-gray-300 text-gray-900'
                              } focus:ring-2 focus:ring-blue-500`}
                            />
                          </div>
                          <div>
                            <input
                              type="number"
                              placeholder={texts.quantity}
                              min="1"
                              value={item.quantity}
                              onChange={(e) => updateItemTotal(index, 'quantity', parseInt(e.target.value) || 0)}
                              className={`w-full px-3 py-2 rounded-md border ${
                                isDark 
                                  ? 'bg-gray-600 border-gray-500 text-white' 
                                  : 'bg-white border-gray-300 text-gray-900'
                              } focus:ring-2 focus:ring-blue-500`}
                            />
                          </div>
                          <div>
                            <input
                              type="number"
                              placeholder={texts.unitPrice}
                              min="0"
                              step="0.01"
                              value={item.unitPrice}
                              onChange={(e) => updateItemTotal(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                              className={`w-full px-3 py-2 rounded-md border ${
                                isDark 
                                  ? 'bg-gray-600 border-gray-500 text-white' 
                                  : 'bg-white border-gray-300 text-gray-900'
                              } focus:ring-2 focus:ring-blue-500`}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              R$ {item.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </span>
                            {formData.items.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeItem(index)}
                                className="p-1 text-red-600 hover:bg-red-100 rounded"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-3 text-right">
                    <span className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {texts.total}: R$ {formData.totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {texts.requestDate}
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.requestDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, requestDate: e.target.value }))}
                      className={`w-full px-3 py-2 rounded-md border ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {texts.expectedDelivery}
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.expectedDelivery}
                      onChange={(e) => setFormData(prev => ({ ...prev, expectedDelivery: e.target.value }))}
                      className={`w-full px-3 py-2 rounded-md border ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {texts.status}
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
                      <option value="pending">{texts.pending}</option>
                      <option value="approved">{texts.approved}</option>
                      <option value="delivered">{texts.delivered}</option>
                      <option value="cancelled">{texts.cancelled}</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {texts.priority}
                    </label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
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
                      {texts.project}
                    </label>
                    <input
                      type="text"
                      value={formData.project}
                      onChange={(e) => setFormData(prev => ({ ...prev, project: e.target.value }))}
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
                    {texts.notes}
                  </label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    className={`w-full px-3 py-2 rounded-md border ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-blue-500`}
                  />
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
                      setEditingOrder(null);
                      resetForm();
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

      {/* Task Link Modal */}
      {showTaskLinkModal && selectedOrder && (
        <TaskLinkModal
          order={selectedOrder}
          tasks={tasks}
          onClose={() => {
            setShowTaskLinkModal(false);
            setSelectedOrder(null);
          }}
          onSubmit={handleTaskLinkSubmit}
          isDark={isDark}
          texts={texts}
        />
      )}
    </div>
  );
};

const TaskLinkModal = ({ order, tasks, onClose, onSubmit, isDark, texts }) => {
  const [selectedTaskIds, setSelectedTaskIds] = useState(order.linkedTasks.map(taskName => {
    const task = tasks.find(t => t.name === taskName);
    return task ? task.id : null;
  }).filter(Boolean));

  const handleCheckboxChange = (taskId) => {
    setSelectedTaskIds(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId) 
        : [...prev, taskId]
    );
  };

  const availableTasksForProject = tasks.filter(task => task.project === order.project);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`max-w-xl w-full max-h-[90vh] overflow-y-auto rounded-lg ${
        isDark ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {texts.linkTasks} - {order.orderNumber}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-md"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className={`text-lg font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                {texts.availableTasks}
              </h3>
              {availableTasksForProject.length === 0 ? (
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Nenhuma tarefa disponível para este projeto.</p>
              ) : (
                <div className="grid grid-cols-1 gap-2">
                  {availableTasksForProject.map(task => (
                    <label key={task.id} className={`flex items-center p-3 rounded-md cursor-pointer ${
                      isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                    }`}>
                      <input
                        type="checkbox"
                        checked={selectedTaskIds.includes(task.id)}
                        onChange={() => handleCheckboxChange(task.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className={`ml-3 text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {task.name} ({task.project})
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => onSubmit(selectedTaskIds)}
                disabled={selectedTaskIds.length === 0}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {texts.linkTasks}
              </button>
              <button
                onClick={onClose}
                className={`flex-1 px-4 py-2 rounded-md border ${
                  isDark 
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {texts.cancel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseOrders;
