import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'teacher' | 'admin';
}

// Для хранения пароля во внутренней логике
interface UserWithPassword extends User {
  password: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- Вспомогательные функции для работы с localStorage ---
const USERS_KEY = 'users';

function getUsersFromStorage(): UserWithPassword[] {
  const users = localStorage.getItem(USERS_KEY);
  if (!users) return [];
  try {
    return JSON.parse(users);
  } catch {
    localStorage.removeItem(USERS_KEY);
    return [];
  }
}

function saveUsersToStorage(users: UserWithPassword[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function findUserByEmail(email: string): UserWithPassword | undefined {
  const users = getUsersFromStorage();
  return users.find(u => u.email === email);
}

function createUser({ email, password, name, role }: { email: string; password: string; name: string; role: 'student' | 'teacher' | 'admin' }): UserWithPassword {
  const users = getUsersFromStorage();
  const newUser: UserWithPassword = {
    id: Date.now().toString(),
    email,
    password,
    name,
    role,
  };
  users.push(newUser);
  saveUsersToStorage(users);
  return newUser;
}
// --------------------------------------------------------

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Проверяем, есть ли сохраненный пользователь в localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Error parsing saved user:', e);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setError(null);
    setLoading(true);
    try {
      const user = findUserByEmail(email);
      if (!user) {
        throw new Error('Пользователь не найден');
      }
      if (user.password !== password) {
        throw new Error('Неверный пароль');
      }
      const { password: _, ...userWithoutPassword } = user;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    } catch (error) {
      console.error('Login error:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Произошла непредвиденная ошибка');
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setError(null);
    setLoading(true);
    try {
      // Проверяем, существует ли пользователь с таким email
      const existingUser = findUserByEmail(email);
      if (existingUser) {
        throw new Error('Пользователь с таким email уже существует');
      }
      // Создаем нового пользователя
      const newUser = createUser({
        email,
        password,
        name,
        role: 'student',
      });
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    } catch (error) {
      console.error('Registration error:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Произошла непредвиденная ошибка');
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setError(null);
    setLoading(true);
    try {
      setUser(null);
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout error:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Произошла непредвиденная ошибка');
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 