import React, { useState, FC } from 'react';
import { Calendar, Clock, User, History, Star, LogOut, ChevronRight, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { BookingModal } from './BookingModal';
import { AppointmentsModal } from './AppointmentsModal';
import { ProfileModal } from './ProfileModal';
import { HistoryModal } from './HistoryModal';
import { useNavigate } from 'react-router-dom';

export const ClientDashboard: FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isBookingOpen, setBookingOpen] = useState(false);
  const [isAppointmentsOpen, setAppointmentsOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isHistoryOpen, setHistoryOpen] = useState(false);

  const quickActions = [
    {
      key: 'booking',
      label: 'Agendar',
      desc: 'Marque um novo horário',
      icon: <Calendar className="w-6 h-6 text-amber-600" />,
      bg: 'bg-amber-100',
      onClick: () => setBookingOpen(true),
    },
    {
      key: 'appointments',
      label: 'Meus Agendamentos',
      desc: 'Visualize ou cancele horários',
      icon: <Clock className="w-6 h-6 text-blue-600" />,
      bg: 'bg-blue-100',
      onClick: () => navigate('/client/appointments'),
    },
    {
      key: 'profile',
      label: 'Meu Perfil',
      desc: 'Atualize suas informações',
      icon: <User className="w-6 h-6 text-green-600" />,
      bg: 'bg-green-100',
      onClick: () => navigate('/client/profile'),
    },
    {
      key: 'history',
      label: 'Histórico',
      desc: 'Veja seus serviços anteriores',
      icon: <History className="w-6 h-6 text-purple-600" />,
      bg: 'bg-purple-100',
      onClick: () => navigate('/client/history'),
    },
  ];

  return (
    <div className="relative min-h-screen bg-cover bg-center bg-fixed bg-[url('https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')]">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative min-h-screen text-white p-4 sm:p-6 md:p-8 flex flex-col gap-6 max-w-5xl mx-auto">
        {/* Welcome Section */}
        <section className="bg-black/40 backdrop-blur-sm rounded-xl shadow-lg border border-amber-500/50 p-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Bem-vindo, {user?.name || 'Cliente'}!</h1>
          <p className="text-gray-300">Gerencie seus agendamentos e acompanhe seu histórico de serviços na barbearia.</p>
        </section>

        {/* Quick Actions */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 service-boxes">
          {quickActions.map(action => (
            <button
              key={action.key}
              onClick={action.onClick}
              className="bg-black/40 backdrop-blur-sm rounded-xl shadow-lg border border-amber-500/50 p-6 hover:bg-black/60 transition-all hover:-translate-y-1 duration-300 text-left h-[160px] flex items-center"
            >
              <div className="flex flex-col items-center sm:items-start sm:flex-row sm:space-x-4 w-full">
                <div className={`${action.bg} p-3 rounded-full mb-3 sm:mb-0 flex-shrink-0`}>{action.icon}</div>
                <div className="text-center sm:text-left flex-grow">
                  <h3 className="font-semibold text-amber-200">{action.label}</h3>
                  <p className="text-sm text-gray-300 mt-1">{action.desc}</p>
                </div>
              </div>
            </button>
          ))}
        </section>

        {/* Próximos Agendamentos */}
        <section className="bg-black/40 backdrop-blur-sm rounded-xl shadow-lg border border-amber-500/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-amber-400" />
              Próximos Agendamentos
            </h2>
            <button
              onClick={() => navigate('/client/appointments')}
              className="view-all-link"
            >
              Ver todos <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          <div className="space-y-3">
            {/* Sample appointments - replace with real data */}
            <div className="bg-black/30 rounded-lg p-4 border border-gray-700">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-amber-200">Corte + Barba</h3>
                  <p className="text-sm text-gray-300 mt-1">15/07/2024 • 14:00</p>
                  <p className="text-xs text-gray-400 mt-1">com João Silva</p>
                </div>
                <span className="px-2 py-1 bg-green-900/60 text-green-200 text-xs rounded-full">
                  Confirmado
                </span>
              </div>
            </div>
            
            <div className="bg-black/30 rounded-lg p-4 border border-gray-700">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-amber-200">Barba</h3>
                  <p className="text-sm text-gray-300 mt-1">22/07/2024 • 10:30</p>
                  <p className="text-xs text-gray-400 mt-1">com Pedro Santos</p>
                </div>
                <span className="px-2 py-1 bg-yellow-900/60 text-yellow-200 text-xs rounded-full">
                  Pendente
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Histórico de Serviços */}
        <section className="bg-black/40 backdrop-blur-sm rounded-xl shadow-lg border border-amber-500/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center">
              <History className="w-5 h-5 mr-2 text-amber-400" />
              Histórico de Serviços
            </h2>
            <button
              onClick={() => navigate('/client/history')}
              className="view-all-link"
            >
              Ver todos <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          <div className="space-y-3">
            {/* Sample history items - replace with real data */}
            <div className="bg-black/30 rounded-lg p-4 border border-gray-700">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-amber-200">Corte de Cabelo</h3>
                  <p className="text-sm text-gray-300 mt-1">01/07/2024</p>
                  <p className="text-xs text-gray-400 mt-1">com Maria Silva</p>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-amber-400 fill-current" />
                  <span className="ml-1 text-sm font-medium">5.0</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Loyalty Program */}
        {/* ... similares ao código original, extraído para outro componente se desejar ... */}

        <div className="mt-auto flex justify-end pt-4">
          <button
            onClick={logout} 
            className="logout-btn flex items-center gap-2 px-4 py-2"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>

        {/* Modals */}
        <BookingModal isOpen={isBookingOpen} onClose={() => setBookingOpen(false)} />
        <AppointmentsModal isOpen={isAppointmentsOpen} onClose={() => setAppointmentsOpen(false)} />
        <ProfileModal isOpen={isProfileOpen} onClose={() => setProfileOpen(false)} />
        <HistoryModal isOpen={isHistoryOpen} onClose={() => setHistoryOpen(false)} />
      </div>
    </div>
  );
};
