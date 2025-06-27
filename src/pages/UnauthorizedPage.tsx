// src/components/Clients/ClientAppointmentsEnhanced.tsx

import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useScheduling } from '../../contexts/SchedulingContext';
import { Scissors, Clock } from 'lucide-react';

interface Appointment {
  id: string;
  date: string;
  startTime: string;
  services: { name: string }[];
  barberName: string;
  status: string;
  clientName: string;
}

export const ClientAppointmentsEnhanced: React.FC = () => {
  const { user } = useAuth();
  const { state } = useScheduling();

  const appointments: Appointment[] = state?.appointments
    ?.filter(a => a.clientName === user?.name) ?? [];

  return (
    <div className="relative min-h-screen">
      {/* Background image blurred */}
      <img
        src="/images/barbershop.jpg"
        alt="Barbearia"
        className="absolute inset-0 w-full h-full object-cover filter blur-md"
      />
      {/* Overlay to darken slightly */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 max-w-5xl mx-auto p-6 text-white">
        <h1 className="text-3xl font-bold mb-6">Meus Agendamentos</h1>

        {appointments.length > 0 ? (
          <div className="grid gap-4">
            {appointments.map(apt => (
              <div
                key={apt.id}
                className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-lg p-4"
              >
                <div>
                  <div className="text-lg font-semibold flex items-center gap-2">
                    <Scissors className="w-5 h-5 text-amber-400" />
                    {apt.services.map(s => s.name).join(', ')}
                  </div>
                  <div className="text-sm text-gray-200 mt-1">
                    {apt.date} às {apt.startTime}
                  </div>
                  <div className="text-sm text-gray-300 mt-1">
                    Profissional: {apt.barberName}
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium  
                      ${apt.status === 'confirmed' ? 'bg-green-600' : 'bg-yellow-600'}`}
                  >
                    {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                  </span>
                  <button
                    className="mt-2 text-sm text-red-400 hover:underline"
                    onClick={() => {/* TODO: cancelar agendamento */}}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-300">Você ainda não possui agendamentos.</p>
        )}
      </div>
    </div>
  );
};

export default ClientAppointmentsEnhanced;
