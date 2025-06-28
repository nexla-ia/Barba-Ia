import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useScheduling } from '../../contexts/SchedulingContext';
import { Calendar, Clock, User, ArrowLeft, Scissors } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Appointment {
  id: string;
  date: string;
  startTime: string;
  services: { name: string }[];
  barberName: string;
  status: string;
  clientName: string;
}

export const ClientAppointments: React.FC = () => {
  const { user } = useAuth();
  const { state } = useScheduling();
  const navigate = useNavigate();

  // Protege caso state ou appointments sejam undefined
  const appointments: Appointment[] = state?.appointments
    ?.filter(a => a.clientName === user?.name) ?? [];

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
      }}
    >
      {/* Camada de overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div className="relative p-4 sm:p-6 md:p-8 space-y-6 max-w-5xl mx-auto text-white">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold flex items-center">
            <Calendar className="w-6 h-6 mr-2 text-amber-400" />
            Meus Agendamentos
          </h1>
          <button 
            onClick={() => navigate('/client')}
            className="flex items-center space-x-2 px-3 py-2 bg-black/30 hover:bg-black/50 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Voltar</span>
          </button>
        </div>

        {appointments.length > 0 ? (
          <div className="overflow-x-auto max-h-[calc(100vh-150px)] overflow-y-auto rounded-lg bg-black/30 backdrop-blur-md p-4">
            <div className="hidden md:block">
              <table className="min-w-full text-sm">
                <thead className="bg-black/50 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left rounded-tl-lg">Dia</th>
                    <th className="px-4 py-3 text-left">Horário</th>
                    <th className="px-4 py-3 text-left">Serviço</th>
                    <th className="px-4 py-3 text-left">Profissional</th>
                    <th className="px-4 py-3 text-left rounded-tr-lg">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {appointments.map(apt => (
                    <tr key={apt.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3 text-gray-200">{apt.date}</td>
                      <td className="px-4 py-3 text-gray-200">{apt.startTime}</td>
                      <td className="px-4 py-3 text-gray-200">
                        {apt.services.map(s => s.name).join(', ')}
                      </td>
                      <td className="px-4 py-3 text-gray-200">{apt.barberName}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          apt.status === 'confirmed' ? 'bg-green-900/60 text-green-200' :
                          apt.status === 'pending' ? 'bg-yellow-900/60 text-yellow-200' :
                          apt.status === 'cancelled' ? 'bg-red-900/60 text-red-200' :
                          'bg-gray-900/60 text-gray-200'
                        }`}>
                          {apt.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Mobile view */}
            <div className="md:hidden space-y-4">
              {appointments.map(apt => (
                <div key={apt.id} className="appointment-card hover:border-amber-500/50">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-amber-200 flex items-center">
                      <Scissors className="w-4 h-4 mr-2 text-amber-400 flex-shrink-0" />
                      {apt.services.map(s => s.name).join(', ')}
                    </h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      apt.status === 'confirmed' ? 'bg-green-900/60 text-green-200' :
                      apt.status === 'pending' ? 'bg-yellow-900/60 text-yellow-200' :
                      apt.status === 'cancelled' ? 'bg-red-900/60 text-red-200' :
                      'bg-gray-900/60 text-gray-200'
                    }`}>
                      {apt.status}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-300 mb-1">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                    <span>{apt.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-300 mb-1">
                    <Clock className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                    <span>{apt.startTime}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <User className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                    <span>{apt.barberName}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-black/30 backdrop-blur-md rounded-lg p-8 text-center">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-amber-400 opacity-50" />
            <p className="text-gray-300 mb-6">Você ainda não possui agendamentos.</p>
            <button 
              onClick={() => navigate('/client')}
              className="px-4 py-2 bg-amber-500 text-black rounded-lg font-medium hover:bg-amber-400 transition-colors"
            >
              Agendar Agora
            </button>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default ClientAppointments;
