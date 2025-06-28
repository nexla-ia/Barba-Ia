import React from 'react';
import { DollarSign, Calendar, Users, TrendingUp, BarChart3, Scissors, User, LogOut, ChevronRight, Star } from 'lucide-react';
import LogoutButton from '@/components/Auth/LogoutButton';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative min-h-screen text-white p-4 sm:p-6 md:p-8 flex flex-col gap-6 max-w-5xl mx-auto">
        {/* Welcome Section */}
        <section className="bg-black/40 backdrop-blur-sm rounded-xl shadow-lg border border-amber-500/50 p-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Bem-vindo, {user?.name || 'Administrador'}!</h1>
          <p className="text-gray-300">Aqui está um resumo do desempenho do seu negócio.</p>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 service-boxes">
          <div className="bg-black/40 backdrop-blur-sm rounded-xl shadow-lg border border-amber-500/50 p-6">
            <div className="flex flex-col items-center sm:items-start sm:flex-row sm:space-x-4">
              <div className="bg-green-900/50 p-3 rounded-full mb-3 sm:mb-0">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-sm text-gray-300">Receita Hoje</p>
                <p className="text-2xl font-bold">{formatCurrency(1250)}</p>
                <div className="flex items-center justify-center sm:justify-start mt-1">
                  <TrendingUp className="w-3 h-3 text-green-400 mr-1" />
                  <span className="text-xs text-green-400">+15%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-sm rounded-xl shadow-lg border border-amber-500/50 p-6">
            <div className="flex flex-col items-center sm:items-start sm:flex-row sm:space-x-4">
              <div className="bg-blue-900/50 p-3 rounded-full mb-3 sm:mb-0">
                <Calendar className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-sm text-gray-300">Agendamentos</p>
                <p className="text-2xl font-bold">24</p>
                <div className="flex items-center justify-center sm:justify-start mt-1">
                  <TrendingUp className="w-3 h-3 text-green-400 mr-1" />
                  <span className="text-xs text-green-400">+8%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-sm rounded-xl shadow-lg border border-amber-500/50 p-6">
            <div className="flex flex-col items-center sm:items-start sm:flex-row sm:space-x-4">
              <div className="bg-purple-900/50 p-3 rounded-full mb-3 sm:mb-0">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-sm text-gray-300">Clientes Ativos</p>
                <p className="text-2xl font-bold">156</p>
                <div className="flex items-center justify-center sm:justify-start mt-1">
                  <TrendingUp className="w-3 h-3 text-green-400 mr-1" />
                  <span className="text-xs text-green-400">+12%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-sm rounded-xl shadow-lg border border-amber-500/50 p-6">
            <div className="flex flex-col items-center sm:items-start sm:flex-row sm:space-x-4">
              <div className="bg-amber-900/50 p-3 rounded-full mb-3 sm:mb-0">
                <TrendingUp className="w-6 h-6 text-amber-400" />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-sm text-gray-300">Ticket Médio</p>
                <p className="text-2xl font-bold">{formatCurrency(52)}</p>
                <div className="flex items-center justify-center sm:justify-start mt-1">
                  <TrendingUp className="w-3 h-3 text-green-400 mr-1" />
                  <span className="text-xs text-green-400">+5%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Charts and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <section className="bg-black/40 backdrop-blur-sm rounded-xl shadow-lg border border-amber-500/50 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-amber-400" />
              Receita dos Últimos 7 Dias
            </h3>
            <div className="h-64 flex items-end justify-between space-x-2">
              {Array.from({ length: 7 }, (_, i) => {
                const height = Math.random() * 100 + 20;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-amber-500 rounded-t-lg transition-all duration-300 hover:bg-amber-600"
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-xs text-gray-400 mt-2">
                      {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'][i]}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Recent Appointments */}
          <section className="bg-black/40 backdrop-blur-sm rounded-xl shadow-lg border border-amber-500/50 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-amber-400" />
              Próximos Agendamentos
            </h3>
            <div className="space-y-3">
              {[
                { client: 'Carlos Oliveira', service: 'Corte + Barba', time: '10:00', barber: 'João Silva' },
                { client: 'Marcos Lima', service: 'Corte de Cabelo', time: '10:30', barber: 'Pedro Santos' },
                { client: 'André Costa', service: 'Barba', time: '11:00', barber: 'João Silva' },
              ].map((appointment, index) => (
                <div key={index} className="bg-black/30 rounded-lg p-4 border border-gray-700 hover:border-amber-500/50 transition-all hover:-translate-y-1 duration-300">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-amber-200">{appointment.service}</h4>
                      <p className="text-sm text-gray-300 mt-1">{appointment.client}</p>
                      <p className="text-xs text-gray-400 mt-1">com {appointment.barber}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-amber-400">{appointment.time}</p>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-900/60 text-green-200">
                        Confirmado
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Quick Access Modules */}
        <section className="bg-black/40 backdrop-blur-sm rounded-xl shadow-lg border border-amber-500/50 p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <ChevronRight className="w-5 h-5 mr-2 text-amber-400" />
            Módulos de Acesso Rápido
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-black/30 rounded-lg p-4 border border-gray-700 hover:border-amber-500/50 transition-all hover:-translate-y-1 duration-300 text-left">
              <h4 className="font-medium text-amber-200 mb-2">Agendamentos</h4>
              <p className="text-sm text-gray-300">Gerencie todos os agendamentos</p>
            </button>

            <button className="bg-black/30 rounded-lg p-4 border border-gray-700 hover:border-amber-500/50 transition-all hover:-translate-y-1 duration-300 text-left">
              <h4 className="font-medium text-amber-200 mb-2">Clientes</h4>
              <p className="text-sm text-gray-300">Cadastre e gerencie clientes</p>
            </button>

            <button className="bg-black/30 rounded-lg p-4 border border-gray-700 hover:border-amber-500/50 transition-all hover:-translate-y-1 duration-300 text-left">
              <h4 className="font-medium text-amber-200 mb-2">Relatórios</h4>
              <p className="text-sm text-gray-300">Visualize dados de desempenho</p>
            </button>
          </div>
        </section>

        {/* Team Performance */}
        <section className="bg-black/40 backdrop-blur-sm rounded-xl shadow-lg border border-amber-500/50 p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2 text-amber-400" />
            Desempenho da Equipe
          </h3>
          
          <div className="space-y-3">
            {[
              { name: 'João Silva', appointments: 45, revenue: 2250, rating: 4.8 },
              { name: 'Pedro Santos', appointments: 38, revenue: 1900, rating: 4.6 },
              { name: 'Carlos Lima', appointments: 32, revenue: 1600, rating: 4.7 },
            ].map((professional, index) => (
              <div key={index} className="bg-black/30 rounded-lg p-4 border border-gray-700 hover:border-amber-500/50 transition-all hover:-translate-y-1 duration-300">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-amber-900/50 rounded-full flex items-center justify-center mr-3">
                      <User className="w-5 h-5 text-amber-400" />
                    </div>
                    <span className="font-medium text-amber-200">{professional.name}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-xs text-gray-400">Atendimentos</p>
                      <p className="font-medium">{professional.appointments}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-400">Receita</p>
                      <p className="font-medium text-green-400">{formatCurrency(professional.revenue)}</p>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 font-medium">{professional.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-auto flex justify-end pt-4">
          <button
            onClick={() => logout()} 
            className="logout-btn flex items-center gap-2 px-4 py-2"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
