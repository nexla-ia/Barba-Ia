import React from 'react';
import { X, Calendar, Clock, Scissors, MessageSquare } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="client-modal">
      <div className="client-modal-content">
        <div className="client-modal-header">
          <h3 className="text-xl font-bold flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-amber-400" />
            Agendar Horário
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form className="space-y-5 client-modal-body">
          <div className="relative">
            <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
              <Scissors className="w-4 h-4 mr-2 text-amber-400" />
              Serviço
            </label>
            <div className="relative">
              <select className="w-full px-4 py-3 bg-[#222222] border border-[#444444] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white">
                <option value="">Selecione um serviço</option>
                <option value="corte">Corte de Cabelo</option>
                <option value="barba">Barba</option>
                <option value="combo">Corte + Barba</option>
                <option value="outros">Outros serviços</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                <Calendar className="w-4 h-4 mr-2 text-amber-400" />
                Data
              </label>
              <div className="relative">
                <input
                  type="date"
                  className="w-full px-4 py-3 bg-[#222222] border border-[#444444] rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white"
                />
              </div>
            </div>
            
            <div>
              <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                <Clock className="w-4 h-4 mr-2 text-amber-400" />
                Horário
              </label>
              <div className="relative">
                <select className="w-full px-4 py-3 bg-[#222222] border border-[#444444] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white">
                  <option value="">Selecione</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                  <option value="16:00">16:00</option>
                  <option value="17:00">17:00</option>
                  <option value="18:00">18:00</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
              <MessageSquare className="w-4 h-4 mr-2 text-amber-400" />
              Observações (opcional)
            </label>
            <div className="relative">
              <textarea
                className="w-full px-4 py-3 bg-[#222222] border border-[#444444] rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white"
                rows={3}
                placeholder="Alguma informação adicional?"
              ></textarea>
            </div>
          </div>
        </form>
        
        <div className="client-modal-footer">
          <button
            type="button"
            className="w-full bg-amber-500 text-black py-3 rounded-lg font-medium hover:bg-amber-400 transition-colors"
          >
            Confirmar Agendamento
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingModal;
