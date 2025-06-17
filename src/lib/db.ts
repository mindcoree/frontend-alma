import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface User {
  id: string;
  email: string;
  name: string;
  password: string; // В реальном приложении пароль должен быть хэширован
  role: 'student' | 'teacher' | 'admin';
  createdAt: string;
}

interface AlmaDB extends DBSchema {
  users: {
    key: string;
    value: User;
    indexes: { 'by-email': string };
  };
}

class Database {
  private db: IDBPDatabase<AlmaDB> | null = null;

  async init() {
    this.db = await openDB<AlmaDB>('alma-db', 1, {
      upgrade(db) {
        // Создаем хранилище пользователей
        const userStore = db.createObjectStore('users', { keyPath: 'id' });
        // Создаем индекс по email для быстрого поиска
        userStore.createIndex('by-email', 'email', { unique: true });
      },
    });
  }

  async createUser(user: Omit<User, 'id' | 'createdAt'>) {
    if (!this.db) await this.init();
    
    const newUser: User = {
      ...user,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    await this.db!.add('users', newUser);
    return newUser;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    if (!this.db) await this.init();
    
    const tx = this.db!.transaction('users', 'readonly');
    const index = tx.store.index('by-email');
    const user = await index.get(email);
    await tx.done;
    return user;
  }

  async getUserById(id: string): Promise<User | undefined> {
    if (!this.db) await this.init();
    
    const tx = this.db!.transaction('users', 'readonly');
    const user = await tx.store.get(id);
    await tx.done;
    return user;
  }

  async updateUser(id: string, updates: Partial<User>) {
    if (!this.db) await this.init();
    
    const tx = this.db!.transaction('users', 'readwrite');
    const user = await tx.store.get(id);
    if (!user) throw new Error('User not found');
    
    const updatedUser = { ...user, ...updates };
    await tx.store.put(updatedUser);
    await tx.done;
    return updatedUser;
  }

  async deleteUser(id: string) {
    if (!this.db) await this.init();
    
    const tx = this.db!.transaction('users', 'readwrite');
    await tx.store.delete(id);
    await tx.done;
  }
}

export const db = new Database(); 