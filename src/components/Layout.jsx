import React from 'react';
import { Home, FolderOpen, CheckSquare, Calendar, BarChart3, Settings, Menu, Bell, User, AlertTriangle, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';

const Layout = ({ children, currentPage = 'dashboard', onNavigate }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const navigation = [
    { name: 'Dashboard', icon: Home, id: 'dashboard' },
    { name: 'Projetos', icon: FolderOpen, id: 'projects' },
    { name: 'Tarefas', icon: CheckSquare, id: 'tasks' },
    { name: 'Calendário', icon: Calendar, id: 'calendar' },
    { name: 'Não Conformidades', icon: AlertTriangle, id: 'nonconformities' },
    { name: 'Ordens de Compra', icon: ShoppingCart, id: 'purchaseorders' },
    { name: 'Relatórios', icon: BarChart3, id: 'reports' },
    { name: 'Configurações', icon: Settings, id: 'settings' },
  ];

  const handleNavigation = (pageId) => {
    if (onNavigate) {
      onNavigate(pageId);
    }
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar para desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col bg-blue-900">
          <div className="flex h-16 flex-shrink-0 items-center px-4">
            <h1 className="text-xl font-bold text-white">ConstructPro</h1>
          </div>
          <div className="flex flex-1 flex-col overflow-y-auto">
            <nav className="flex-1 space-y-1 px-2 py-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item.id)}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left ${
                      isActive
                        ? 'bg-blue-800 text-white'
                        : 'text-blue-100 hover:bg-blue-800 hover:text-white'
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    {item.name}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Sidebar mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          <div className="relative flex w-full max-w-xs flex-1 flex-col bg-blue-900">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(false)}
                className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="sr-only">Fechar sidebar</span>
                <Menu className="h-6 w-6 text-white" />
              </Button>
            </div>
            <div className="flex h-16 flex-shrink-0 items-center px-4">
              <h1 className="text-xl font-bold text-white">ConstructPro</h1>
            </div>
            <div className="mt-5 h-0 flex-1 overflow-y-auto">
              <nav className="space-y-1 px-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  return (
                    <button
                      key={item.name}
                      onClick={() => handleNavigation(item.id)}
                      className={`group flex items-center px-2 py-2 text-base font-medium rounded-md w-full text-left ${
                        isActive
                          ? 'bg-blue-800 text-white'
                          : 'text-blue-100 hover:bg-blue-800 hover:text-white'
                      }`}
                    >
                      <Icon className="mr-4 h-6 w-6 flex-shrink-0" />
                      {item.name}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo principal */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Header */}
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
          >
            <span className="sr-only">Abrir sidebar</span>
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex flex-1 justify-between px-4">
            <div className="flex flex-1">
              {/* Espaço para busca ou breadcrumb */}
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <Button variant="ghost" size="sm" className="p-1">
                <span className="sr-only">Ver notificações</span>
                <Bell className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="sm" className="ml-3 p-1">
                <span className="sr-only">Abrir menu do usuário</span>
                <User className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Conteúdo da página */}
        <main className="flex-1">
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;


export default Layout;
