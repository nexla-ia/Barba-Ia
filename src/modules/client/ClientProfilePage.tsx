import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useClient } from '../../contexts/ClientContext';
import { User, Phone, Mail, MapPin, Lock, ArrowLeft, Save, Edit as EditIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ClientProfilePage() {
  const { user, updateUser } = useAuth();
  const { state, dispatch } = useClient();
  const navigate = useNavigate();

  const client = state.clients.find(c => c.fullName === user?.name);

  const defaultProfile = {
    fullName: 'Cliente Exemplo',
    phone: '11999999999',
    email: 'cliente@exemplo.com',
    password: '123456',
    street: 'Rua Exemplo',
    number: '100',
    city: 'São Paulo',
  };

  const [formData, setFormData] = useState({
    fullName: client?.fullName || defaultProfile.fullName,
    phone: client?.phone || defaultProfile.phone,
    email: client?.email || defaultProfile.email,
    password: user?.password || defaultProfile.password,
    street: client?.address?.street || defaultProfile.street,
    number: client?.address?.number || defaultProfile.number,
    city: client?.address?.city || defaultProfile.city,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isEditing, setIsEditing] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Nome é obrigatório';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    }
    
    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    
    if (!client) return;
    
    const updatedClient = {
      ...client,
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      address: {
        ...(client.address || {}),
        street: formData.street,
        number: formData.number,
        city: formData.city,
      },
    };

    dispatch({ type: 'UPDATE_CLIENT', payload: updatedClient });
    updateUser({ name: formData.fullName, email: formData.email, password: formData.password });
    setIsEditing(false);
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center bg-fixed" style={{
      backgroundImage: "url('https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')"
    }}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative min-h-screen text-white p-4 sm:p-6 md:p-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl md:text-3xl font-bold flex items-center">
              <User className="w-6 h-6 mr-2 text-amber-400" />
              Meu Perfil
            </h1>
            <button 
              onClick={() => navigate('/client')}
              className="flex items-center space-x-2 px-3 py-2 bg-black/30 hover:bg-black/50 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Voltar</span>
            </button>
          </div>
          
          <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
            {/* Profile Header */}
            <div className="p-6 border-b border-gray-700 flex items-center space-x-4">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center text-black text-2xl font-bold">
                {formData.fullName.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-semibold">{formData.fullName}</h2>
                <p className="text-gray-300">Cliente desde {client ? new Date(client.createdAt).toLocaleDateString('pt-BR') : 'Recentemente'}</p>
              </div>
            </div>
            
            {/* Profile Content */}
            <div className="p-6">
              {isEditing ? (
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 flex items-center">
                      <User className="w-4 h-4 mr-2 text-gray-400" />
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      className={`w-full px-4 py-3 rounded-lg bg-black/50 border ${errors.fullName ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:ring-2 focus:ring-amber-500`}
                    />
                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        Telefone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full px-4 py-3 rounded-lg bg-black/50 border ${errors.phone ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:ring-2 focus:ring-amber-500`}
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1 flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-gray-400" />
                        E-mail
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-4 py-3 rounded-lg bg-black/50 border ${errors.email ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:ring-2 focus:ring-amber-500`}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1 flex items-center">
                      <Lock className="w-4 h-4 mr-2 text-gray-400" />
                      Senha
                    </label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={e => setFormData({ ...formData, password: e.target.value })}
                      className={`w-full px-4 py-3 rounded-lg bg-black/50 border ${errors.password ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:ring-2 focus:ring-amber-500`}
                      placeholder="••••••"
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                  </div>
                  
                  <div className="pt-2 border-t border-gray-700">
                    <label className="block text-sm font-medium mb-3 flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      Endereço
                    </label>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <input
                          type="text"
                          value={formData.street}
                          onChange={e => setFormData({ ...formData, street: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                          placeholder="Rua"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          value={formData.number}
                          onChange={e => setFormData({ ...formData, number: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                          placeholder="Número"
                        />
                      </div>
                      <div className="md:col-span-3">
                        <input
                          type="text"
                          value={formData.city}
                          onChange={e => setFormData({ ...formData, city: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                          placeholder="Cidade"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <User className="w-5 h-5 text-amber-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-400">Nome Completo</p>
                          <p className="font-medium">{formData.fullName}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <Phone className="w-5 h-5 text-amber-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-400">Telefone</p>
                          <p className="font-medium">{formData.phone}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <Mail className="w-5 h-5 text-amber-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-400">E-mail</p>
                          <p className="font-medium">{formData.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <MapPin className="w-5 h-5 text-amber-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-400">Endereço</p>
                          <p className="font-medium">{formData.street}, {formData.number}</p>
                          <p className="text-sm text-gray-300">{formData.city}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Actions */}
            <div className="p-6 border-t border-gray-700 flex justify-end space-x-3">
              {isEditing ? (
                <>
                  <button 
                    onClick={() => setIsEditing(false)} 
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={handleSave} 
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black rounded-lg transition-colors flex items-center"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Salvar Alterações
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)} 
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black rounded-lg transition-colors flex items-center"
                >
                  <EditIcon className="w-4 h-4 mr-2" />
                  Editar Perfil
                </button>
              )}
            </div>
          </div>
        </div>
        
        <div className="fixed bottom-6 right-6 md:hidden">
          <button 
            onClick={() => navigate('/client')}
            className="bg-amber-500 text-black p-3 rounded-full shadow-lg hover:bg-amber-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClientProfilePage;
