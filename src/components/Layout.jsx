import React, { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet.jsx';
import { Menu, Home, LayoutDashboard, ListTodo, Calendar, BarChart2, Settings, Building2 } from 'lucide-react';

const Layout = ({ children, currentPage, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigation = (page) => {
    onNavigate(page);
    setIsMobileMenuOpen(false); // Fecha o menu mobile após a navegação
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar para Desktop */}
      <aside className="hidden w-64 bg-white p-4 shadow-md md:flex flex-col">
        <div className="mb-6 flex items-center space-x-2">
          <Building2 className="h-8 w-8 text-orange-500" />
          <h2 className="text-2xl font-bold text-gray-800">ConstructPro</h2>
        </div>
        <nav className="flex-1 space-y-2">
          <Button
            variant={currentPage === 'dashboard' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => handleNavigation('dashboard')}
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button
            variant={currentPage === 'projects' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => handleNavigation('projects')}
          >
            <Building2 className="mr-2 h-4 w-4" />
            Projetos
          </Button>
          <Button
            variant={currentPage === 'tasks' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => handleNavigation('tasks')}
          >
            <ListTodo className="mr-2 h-4 w-4" />
            Tarefas
          </Button>
          <Button
            variant={currentPage === 'calendar' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => handleNavigation('calendar')}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Calendário
          </Button>
          <Button
            variant={currentPage === 'reports' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => handleNavigation('reports')}
          >
            <BarChart2 className="mr-2 h-4 w-4" />
            Relatórios
          </Button>
        </nav>
        <div className="mt-auto border-t pt-4">
          <Button
            variant={currentPage === 'settings' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => handleNavigation('settings')}
          >
            <Settings className="mr-2 h-4 w-4" />
            Configurações
          </Button>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col">
        {/* Header para Mobile */}
        <header className="flex items-center justify-between bg-white p-4 shadow-md md:hidden">
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-orange-500" />
            <h2 className="text-xl font-bold text-gray-800">ConstructPro</h2>
          </div>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-4">
              <div className="mb-6 flex items-center space-x-2">
                <Building2 className="h-8 w-8 text-orange-500" />
                <h2 className="text-2xl font-bold text-gray-800">ConstructPro</h2>
              </div>
              <nav className="flex-1 space-y-2">
                <Button
                  variant={currentPage === 'dashboard' ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => handleNavigation('dashboard')}
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
                <Button
                  variant={currentPage === 'projects' ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => handleNavigation('projects')}
                >
                  <Building2 className="mr-2 h-4 w-4" />
                  Projetos
                </Button>
                <Button
                  variant={currentPage === 'tasks' ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => handleNavigation('tasks')}
                >
                  <ListTodo className="mr-2 h-4 w-4" />
                  Tarefas
                </Button>
                <Button
                  variant={currentPage === 'calendar' ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => handleNavigation('calendar')}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Calendário
                </Button>
                <Button
                  variant={currentPage === 'reports' ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => handleNavigation('reports')}
                >
                  <BarChart2 className="mr-2 h-4 w-4" />
                  Relatórios
                </Button>
              </nav>
              <div className="mt-auto border-t pt-4">
                <Button
                  variant={currentPage === 'settings' ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => handleNavigation('settings')}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Configurações
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
