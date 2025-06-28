import React from 'react';
import { X, Star, History as HistoryIcon, Calendar, User, MessageSquare } from 'lucide-react';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HistoryModal({ isOpen, onClose }: HistoryModalProps) {
  if (!isOpen) return null;

  const history = [
    {
      id: 'h1',
      service: 'Corte de Cabelo',
      date: '01/07/2024',
      professional: 'João Silva',
      rating: '5.0',
    },
    {
      id: 'h2',
      service: 'Corte + Barba',
      date: '15/06/2024',
      professional: 'Pedro Santos',
      rating: '4.8',
    },
    {
      id: 'h3',
      service: 'Barba',
      date: '28/05/2024',
      professional: 'Marcos Paulo',
      rating: '4.7',
    },
    {
      id: 'h4',
      service: 'Tratamento Capilar',
      date: '10/05/2024',
      professional: 'Carlos Alberto',
      rating: '5.0',
    },
    {
      id: 'h5',
      service: 'Selagem',
      date: '22/04/2024',
      professional: 'Rafael Costa',
      rating: '4.9',
    },
    {
      id: 'h6',
      service: 'Luzes',
      date: '02/04/2024',
      professional: 'Fernando Lima',
      rating: '4.8',
    },
  ];

  return (
    <div className="client-modal">
      <div className="client-modal-content">
        <div className="client-modal-header">
          <h3 className="text-xl font-bold flex items-center">
            <HistoryIcon className="w-5 h-5 mr-2 text-amber-400" />
            Histórico de Serviços
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-4 client-modal-body">
          {history.map(item => (
            <div key={item.id} className="bg-[#1f1f1f] p-4 rounded-lg border border-[#444444] hover:border-amber-500/50 transition-colors h-[140px] flex flex-col justify-between">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-amber-200">{item.service}</h4>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-amber-400 fill-current" />
                  <span className="text-sm font-medium">{item.rating}</span>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-300 mb-1">
                <Calendar className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                <span>{item.date}</span>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <User className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                <span>{item.professional}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="client-modal-footer">
          <button
            onClick={onClose} 
            className="w-full py-3 bg-amber-500 text-black rounded-lg font-medium hover:bg-amber-400 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

export default HistoryModal;
