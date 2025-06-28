import React, { useState } from 'react';
import { X, User, Phone, Mail, Lock, Save, Edit as EditIcon, MessageSquare } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useClient } from '../../contexts/ClientContext';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { user, updateUser } = useAuth();
  const { state, dispatch } = useClient();

  if (!isOpen) return null;

  const client = state.clients.find(c => c.fullName === user?.name);

  const defaultProfile = {
    fullName: 'Cliente Exemplo',
    phone: '11999999999',
    email: 'cliente@exemplo.com',
    password: '123456',
  };

  const [formData, setFormData] = useState({
    fullName: client?.fullName || defaultProfile.fullName,
    phone: client?.phone || defaultProfile.phone,
    email: client?.email || defaultProfile.email,
    password: user?.password || defaultProfile.password,
  });

  const [isEditing, setIsEditing] = useState(false);

  const address = client?.address
    ? `${client.address.street}, ${client.address.number} - ${client.address.city}/${client.address.state}`
    : 'Sem endereço cadastrado';

  const handleSave = () => {
    if (!client) return;
    const updatedClient = { ...client, fullName: formData.fullName, phone: formData.phone, email: formData.email };
    dispatch({ type: 'UPDATE_CLIENT', payload: updatedClient });
    updateUser({ name: formData.fullName, email: formData.email, password: formData.password });
    setIsEditing(false);
    onClose();
  };

  return (
    <div className="client-modal">
      <div className="client-modal-content">
        <div className="client-modal-header">
          <h3 className="text-xl font-bold flex items-center">
            <User className="w-5 h-5 mr-2 text-amber-400" />
            Meu Perfil
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="client-modal-body">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="flex items-center text-sm font-medium mb-1">
                  <User className="w-4 h-4 mr-2 text-gray-400" />
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-[#222222] border border-[#444444] text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="flex items-center text-sm font-medium mb-1">
                  <Phone className="w-4 h-4 mr-2 text-gray-400" />
                  Telefone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-[#222222] border border-[#444444] text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="flex items-center text-sm font-medium mb-1">
                  <Mail className="w-4 h-4 mr-2 text-gray-400" />
                  E-mail
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-[#222222] border border-[#444444] text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="flex items-center text-sm font-medium mb-1">
                  <Lock className="w-4 h-4 mr-2 text-gray-400" />
                  Senha
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-[#222222] border border-[#444444] text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="••••••"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-[#222222] rounded-lg">
                <User className="w-5 h-5 text-amber-400" />
                <div>
                  <p className="text-xs text-gray-400">Nome</p>
                  <p className="font-medium">{formData.fullName}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-[#222222] rounded-lg">
                <Phone className="w-5 h-5 text-amber-400" />
                <div>
                  <p className="text-xs text-gray-400">Telefone</p>
                  <p className="font-medium">{formData.phone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-[#222222] rounded-lg">
                <Mail className="w-5 h-5 text-amber-400" />
                <div>
                  <p className="text-xs text-gray-400">E-mail</p>
                  <p className="font-medium">{formData.email}</p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="client-modal-footer">
          {isEditing ? (
            <div className="flex space-x-3">
              <button 
                onClick={() => setIsEditing(false)} 
                className="flex-1 py-3 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
              > 
                Cancelar
              </button>
              <button 
                onClick={handleSave} 
                className="flex-1 py-3 bg-amber-500 text-black rounded-lg font-medium hover:bg-amber-400 transition-colors flex items-center justify-center"
              >
                <Save className="w-4 h-4 mr-2" />
                Salvar
              </button>
            </div>
          ) : (
            <div className="flex space-x-3">
              <button 
                onClick={onClose} 
                className="flex-1 py-3 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
              > 
                Fechar
              </button>
              <button 
                onClick={() => setIsEditing(true)} 
                className="flex-1 py-3 bg-amber-500 text-black rounded-lg font-medium hover:bg-amber-400 transition-colors flex items-center justify-center"
              >
                <EditIcon className="w-4 h-4 mr-2" />
                Editar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;