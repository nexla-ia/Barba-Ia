import React from 'react';
import { Clock, Scissors, User } from 'lucide-react';
import LogoutButton from '@/components/Auth/LogoutButton';

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
  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/2502888/pexels-photo-2502888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
      }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative max-w-3xl mx-auto p-4 sm:p-8 text-white space-y-6">
        <h1 className="text-2xl font-bold">Próximos Agendamentos</h1>
        <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin">
          {appointments.map((apt, index) => (
            <div
              key={index}
              className="bg-white/10 border border-white/20 rounded-lg p-4 flex items-center justify-between backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <Scissors className="w-5 h-5 text-amber-400" />
                <div>
                  <p className="font-semibold">{apt.service}</p>
                  <div className="flex items-center text-sm text-gray-300 gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{apt.time}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-200">
                <User className="w-4 h-4" />
                <span>{apt.client}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="pt-4 flex justify-end">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;

