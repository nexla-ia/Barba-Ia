import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useClient } from '../../contexts/ClientContext';
import { Star, History, ArrowLeft, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ClientHistoryPage() {
  const { user } = useAuth();
  const { state } = useClient();
  const navigate = useNavigate();

  const client = state.clients.find(c => c.fullName === user?.name);

  return (
    <div className="relative min-h-screen bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative min-h-screen text-white p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold flex items-center">
            <History className="w-6 h-6 mr-2 text-amber-400" />
            Histórico de Serviços
          </h1>
          <button 
            onClick={() => navigate('/client')}
            className="flex items-center space-x-2 px-3 py-2 bg-black/30 hover:bg-black/50 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Voltar</span>
          </button>
        </div>
        
        {client && client.serviceHistory.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-h-[calc(100vh-150px)] overflow-y-auto pr-1">
            {client.serviceHistory.map(service => (
              <div key={service.id} className="history-card">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-amber-200">{service.serviceName}</h3>
                  <div className="flex items-center space-x-1 bg-amber-900/40 px-2 py-1 rounded-full">
                    <Star className="w-3 h-3 text-amber-400 fill-current" />
                    <span className="text-xs font-medium text-amber-200">{service.pointsEarned} pts</span>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-300 mb-2">
                  <Calendar className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                  <span>{service.date.toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">{service.professionalName}</span>
                  <span className="text-sm font-medium text-white">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(service.finalPrice)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-black/30 backdrop-blur-md rounded-lg p-8 text-center">
            <History className="w-16 h-16 mx-auto mb-4 text-amber-400 opacity-50" />
            <p className="text-gray-300 mb-6">Você ainda não realizou nenhum serviço.</p>
            <button 
              onClick={() => navigate('/client')}
              className="px-4 py-2 bg-amber-500 text-black rounded-lg font-medium hover:bg-amber-400 transition-colors"
            >
              Voltar ao Início
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClientHistoryPage;