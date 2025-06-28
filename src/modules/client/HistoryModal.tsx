import React from 'react';
import { X, Star, History as HistoryIcon, Calendar, User } from 'lucide-react';

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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity overflow-hidden">
      <div className="bg-[#303030] rounded-lg p-6 max-w-md w-full border border-[#444444] text-white max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold flex items-center">
            <HistoryIcon className="w-5 h-5 mr-2 text-amber-400" />
            Histórico de Serviços
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-4 overflow-y-auto pr-1 flex-grow">
          {history.map(item => (
            <div key={item.id} className="bg-[#1f1f1f] p-4 rounded-lg border border-[#444444] hover:border-amber-500/50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-amber-200">{item.service}</h4>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-amber-400 fill-current" />
                  <span className="text-sm font-medium">{item.rating}</span>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-300 mb-1">
                <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                <span>{item.date}</span>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <User className="w-4 h-4 mr-2 text-gray-400" />
                <span>{item.professional}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="pt-4 mt-4 border-t border-gray-700">
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
