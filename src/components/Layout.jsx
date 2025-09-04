import React, { useState } from 'react';
import { Home, LayoutDashboard, FolderKanban, CalendarDays, BarChart4, Settings, Menu, X, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageSelector } from '@/components/LanguageSelector';

const Layout = ({ children, currentPage, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logout, user } = useAuth();
  const { t } = useLanguage();

  const navigationItems = [
    { name: t('dashboard'), icon: LayoutDashboard, page: 'dashboard' },
    { name: t('projects'), icon: FolderKanban, page: 'projects' },
    { name: t('tasks'), icon: CalendarDays, page: 'tasks' },
    { name: t('calendar'), icon: CalendarDays, page: 'calendar' },
    { name: t('reports'), icon: BarChart4, page: 'reports' },
    { name: t('settings'), icon: Settings, page: 'settings' },
  ];

  const handleNavigate = (page) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r bg-card shadow-sm p-4">
        <div className="flex items-center justify-center h-16 border-b mb-6">
          <h1 className="text-2xl font-bold text-primary">ConstructPro</h1>
        </div>
        <nav className="flex-1 space-y-2">
          {navigationItems.map((item) => (
            <Button
              key={item.name}
              variant={currentPage === item.page ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => handleNavigate(item.page)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.name}
            </Button>
          ))}
        </nav>
        <div className="mt-auto pt-4 border-t flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium">{user?.name || 'Usuário'}</span>
          </div>
          <Button variant="outline" className="w-full justify-start" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
          <div className="flex justify-between items-center mt-2">
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between h-16 border-b bg-card shadow-sm px-4">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-4 flex flex-col">
            <div className="flex items-center justify-center h-16 border-b mb-6">
              <h1 className="text-2xl font-bold text-primary">ConstructPro</h1>
            </div>
            <nav className="flex-1 space-y-2">
              {navigationItems.map((item) => (
                <Button
                  key={item.name}
                  variant={currentPage === item.page ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => handleNavigate(item.page)}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Button>
              ))}
            </nav>
            <div className="mt-auto pt-4 border-t flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium">{user?.name || 'Usuário'}</span>
              </div>
              <Button variant="outline" className="w-full justify-start" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
              <div className="flex justify-between items-center mt-2">
                <LanguageSelector />
                <ThemeToggle />
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <h1 className="text-xl font-bold text-primary">ConstructPro</h1>
        <div className="w-10">{/* Placeholder for alignment */}</div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;
