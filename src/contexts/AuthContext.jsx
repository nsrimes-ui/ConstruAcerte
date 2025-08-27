import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há usuário logado no localStorage
    const savedUser = localStorage.getItem('constructpro-user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
        localStorage.removeItem('constructpro-user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Simular chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Verificar credenciais (simulado)
      const users = JSON.parse(localStorage.getItem('constructpro-users') || '[]');
      const foundUser = users.find(u => u.email === email && u.password === password);
      
      if (!foundUser) {
        throw new Error('Email ou senha incorretos');
      }

      const userData = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        company: foundUser.company,
        role: foundUser.role,
        avatar: foundUser.avatar
      };

      setUser(userData);
      localStorage.setItem('constructpro-user', JSON.stringify(userData));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      // Simular chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const { name, email, password, company, role } = userData;
      
      // Verificar se email já existe
      const users = JSON.parse(localStorage.getItem('constructpro-users') || '[]');
      const existingUser = users.find(u => u.email === email);
      
      if (existingUser) {
        throw new Error('Este email já está cadastrado');
      }

      // Criar novo usuário
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password, // Em produção, isso seria hasheado
        company,
        role,
        avatar: null,
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      localStorage.setItem('constructpro-users', JSON.stringify(users));

      // Fazer login automático
      const loginData = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        company: newUser.company,
        role: newUser.role,
        avatar: newUser.avatar
      };

      setUser(loginData);
      localStorage.setItem('constructpro-user', JSON.stringify(loginData));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('constructpro-user');
  };

  const updateProfile = async (profileData) => {
    try {
      // Simular chamada de API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedUser = { ...user, ...profileData };
      setUser(updatedUser);
      localStorage.setItem('constructpro-user', JSON.stringify(updatedUser));
      
      // Atualizar também na lista de usuários
      const users = JSON.parse(localStorage.getItem('constructpro-users') || '[]');
      const userIndex = users.findIndex(u => u.id === user.id);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...profileData };
        localStorage.setItem('constructpro-users', JSON.stringify(users));
      }
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
  
};
