import React, { useState } from 'react';
import { Calendar, Clock, Scissors, User, History, Star, LogOut, ChevronRight, ArrowRight } from 'lucide-react';
import LogoutButton from '@/components/Auth/LogoutButton';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface Appointment {
  time: string;
  service: string;
  client: string;
}

const appointments: Appointment[] = [
  { time: '09:00', service: 'Corte de Cabelo', client: 'Carlos Almeida' },
  { time: '10:30', service: 'Barba', client: 'Marcos Lima' },
  { time: '13:00', service: 'Corte + Barba', client: 'Roberto Silva' },
];

export function EmployeeDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/1570806/pexels-photo-1570806.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative min-h-screen text-white p-4 sm:p-6 md:p-8 flex flex-col gap-6 max-w-5xl mx-auto">
        {/* Welcome Section */}
        <section className="bg-black/40 backdrop-blur-sm rounded-xl shadow-lg border border-amber-500/50 p-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Bem-vindo, {user?.name || 'Profissional'}!</h1>
          <p className="text-gray-300">Gerencie seus agendamentos e visualize seus clientes do dia.</p>
        </section>

        {/* Today's Appointments */}
        <section className="bg-black/40 backdrop-blur-sm rounded-xl shadow-lg border border-amber-500/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-amber-400" />
              Próximos Agendamentos
            </h2>
          </div>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {appointments.map((apt, index) => (
              <div
                key={index}
                className="bg-black/30 rounded-lg p-4 border border-gray-700 hover:border-amber-500/50 transition-all hover:-translate-y-1 duration-300"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-amber-200">{apt.service}</h3>
                    <p className="text-sm text-gray-300 mt-1 flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-gray-400" />
                      {apt.time}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-200">
                    <User className="w-4 h-4 text-amber-400" />
                    <span>{apt.client}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Performance Summary */}
        <section className="bg-black/40 backdrop-blur-sm rounded-xl shadow-lg border border-amber-500/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center">
              <Star className="w-5 h-5 mr-2 text-amber-400" />
              Resumo de Desempenho
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-black/30 rounded-lg p-4 border border-gray-700">
              <div className="flex flex-col items-center">
                <p className="text-3xl font-bold text-amber-400">12</p>
                <p className="text-sm text-gray-300">Atendimentos Hoje</p>
              </div>
            </div>
            
            <div className="bg-black/30 rounded-lg p-4 border border-gray-700">
              <div className="flex flex-col items-center">
                <p className="text-3xl font-bold text-green-400">R$ 480</p>
                <p className="text-sm text-gray-300">Comissões Hoje</p>
              </div>
            </div>
            
            <div className="bg-black/30 rounded-lg p-4 border border-gray-700">
              <div className="flex flex-col items-center">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <p className="text-3xl font-bold text-white ml-1">4.9</p>
                </div>
                <p className="text-sm text-gray-300">Avaliação Média</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="bg-black/40 backdrop-blur-sm rounded-xl shadow-lg border border-amber-500/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center">
              <ChevronRight className="w-5 h-5 mr-2 text-amber-400" />
              Ações Rápidas
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="bg-black/30 rounded-lg p-4 border border-gray-700 hover:border-amber-500/50 transition-all hover:-translate-y-1 duration-300 text-left">
              <h3 className="font-medium text-amber-200 mb-2">Ver Agenda Completa</h3>
              <p className="text-sm text-gray-300">Visualize todos os seus agendamentos</p>
            </button>
            
            <button className="bg-black/30 rounded-lg p-4 border border-gray-700 hover:border-amber-500/50 transition-all hover:-translate-y-1 duration-300 text-left">
              <h3 className="font-medium text-amber-200 mb-2">Relatório de Comissões</h3>
              <p className="text-sm text-gray-300">Acompanhe seus ganhos</p>
            </button>
          </div>
        </section>

        <div className="mt-auto flex justify-end pt-4">
          <button
            onClick={logout} 
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

export default EmployeeDashboard;

