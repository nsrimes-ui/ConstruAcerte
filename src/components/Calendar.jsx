import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

const Calendar = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month'); // month, week, day

  // Eventos de exemplo
  const events = [
    {
      id: '1',
      title: 'Reunião de Obra - Edifício Aurora',
      date: '2024-09-10',
      time: '09:00',
      type: 'meeting',
      location: 'Canteiro de Obras',
      project: 'Edifício Residencial Aurora'
    },
    {
      id: '2',
      title: 'Entrega de Materiais',
      date: '2024-09-12',
      time: '14:00',
      type: 'delivery',
      location: 'Depósito Central',
      project: 'Centro Comercial Plaza'
    },
    {
      id: '3',
      title: 'Inspeção de Qualidade',
      date: '2024-09-15',
      time: '10:30',
      type: 'inspection',
      location: 'Obra Jardim Verde',
      project: 'Condomínio Jardim Verde'
    },
    {
      id: '4',
      title: 'Prazo Final - Fundação',
      date: '2024-09-20',
      time: '17:00',
      type: 'deadline',
      location: 'Edifício Aurora',
      project: 'Edifício Residencial Aurora'
    }
  ];

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'meeting': return 'bg-blue-500';
      case 'delivery': return 'bg-green-500';
      case 'inspection': return 'bg-yellow-500';
      case 'deadline': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getEventTypeIcon = (type) => {
    switch (type) {
      case 'meeting': return <CalendarIcon className="h-4 w-4" />;
      case 'delivery': return <Clock className="h-4 w-4" />;
      case 'inspection': return <MapPin className="h-4 w-4" />;
      case 'deadline': return <Clock className="h-4 w-4" />;
      default: return <CalendarIcon className="h-4 w-4" />;
    }
  };

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Dias vazios no início
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200 dark:border-gray-700"></div>);
    }

    // Dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayEvents = events.filter(event => event.date === dateStr);

      days.push(
        <div key={day} className="h-24 border border-gray-200 dark:border-gray-700 p-1">
          <div className="font-medium text-sm mb-1">{day}</div>
          <div className="space-y-1">
            {dayEvents.map(event => (
              <div 
                key={event.id} 
                className={`text-xs p-1 rounded text-white ${getEventTypeColor(event.type)}`}
                title={`${event.title} - ${event.time}`}
              >
                {event.title.substring(0, 15)}...
              </div>
            ))}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Calendário de Projetos</h1>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => setView('month')}>
            Mês
          </Button>
          <Button variant="outline" size="sm" onClick={() => setView('week')}>
            Semana
          </Button>
          <Button variant="outline" size="sm" onClick={() => setView('day')}>
            Dia
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendário Principal */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={() => navigateMonth(-1)}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
                <Button variant="ghost" size="sm" onClick={() => navigateMonth(1)}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {/* Cabeçalho dos dias da semana */}
            <div className="grid grid-cols-7 gap-0 mb-2">
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                <div key={day} className="p-2 text-center font-medium text-sm bg-gray-100 dark:bg-gray-800">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Grid do calendário */}
            <div className="grid grid-cols-7 gap-0">
              {renderCalendarGrid()}
            </div>
          </CardContent>
        </Card>

        {/* Lista de Eventos */}
        <Card>
          <CardHeader>
            <CardTitle>Próximos Eventos</CardTitle>
            <CardDescription>Marcos importantes dos projetos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.map(event => (
                <div key={event.id} className="border rounded-lg p-3">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded ${getEventTypeColor(event.type)} text-white`}>
                      {getEventTypeIcon(event.type)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{event.title}</h4>
                      <p className="text-xs text-muted-foreground">{event.project}</p>
                      <div className="flex items-center space-x-2 mt-1 text-xs text-muted-foreground">
                        <span>{event.date}</span>
                        <span>•</span>
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-1 mt-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Legenda */}
      <Card>
        <CardHeader>
          <CardTitle>Legenda</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-sm">Reuniões</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-sm">Entregas</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span className="text-sm">Inspeções</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-sm">Prazos</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Calendar;
