import { DataTable, LocalStorageData, User } from '../types';
import { mockTables, mockUsers } from '../data/mockData';

const STORAGE_KEY = 'safetyculture_data_tables';
const STORAGE_VERSION = '1.0';

export const getStorageData = (): LocalStorageData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      return {
        tables: data.tables || [],
        users: data.users || mockUsers,
        lastModified: data.lastModified || new Date().toISOString()
      };
    }
  } catch (error) {
    console.error('Error reading from localStorage:', error);
  }
  
  return initializeStorage();
};

export const initializeStorage = (): LocalStorageData => {
  const initialData: LocalStorageData = {
    tables: mockTables,
    users: mockUsers,
    lastModified: new Date().toISOString()
  };
  
  saveStorageData(initialData);
  return initialData;
};

export const saveStorageData = (data: LocalStorageData): void => {
  try {
    const dataToSave = {
      ...data,
      lastModified: new Date().toISOString(),
      version: STORAGE_VERSION
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    throw new Error('Failed to save data to local storage');
  }
};

export const getAllTables = (): DataTable[] => {
  const data = getStorageData();
  return data.tables;
};

export const getTableById = (id: string): DataTable | undefined => {
  const tables = getAllTables();
  return tables.find(table => table.id === id);
};

export const saveTable = (table: DataTable): DataTable => {
  const data = getStorageData();
  const existingIndex = data.tables.findIndex(t => t.id === table.id);
  
  const updatedTable = {
    ...table,
    updatedAt: new Date().toISOString(),
    totalRows: table.rows.length
  };
  
  if (existingIndex >= 0) {
    data.tables[existingIndex] = updatedTable;
  } else {
    data.tables.push(updatedTable);
  }
  
  saveStorageData(data);
  return updatedTable;
};

export const deleteTable = (id: string): boolean => {
  const data = getStorageData();
  const initialLength = data.tables.length;
  data.tables = data.tables.filter(table => table.id !== id);
  
  if (data.tables.length < initialLength) {
    saveStorageData(data);
    return true;
  }
  return false;
};

export const createTable = (tableData: Omit<DataTable, 'id' | 'createdAt' | 'updatedAt' | 'totalRows'>): DataTable => {
  const newTable: DataTable = {
    ...tableData,
    id: generateUniqueId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    totalRows: tableData.rows.length
  };
  
  return saveTable(newTable);
};

export const updateTableStructure = (id: string, updates: Partial<Pick<DataTable, 'name' | 'description' | 'columns'>>): DataTable | null => {
  const table = getTableById(id);
  if (!table) return null;
  
  const updatedTable = {
    ...table,
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  return saveTable(updatedTable);
};

export const addTableRow = (tableId: string, rowData: Record<string, any>): DataTable | null => {
  const table = getTableById(tableId);
  if (!table) return null;
  
  const newRow = {
    id: generateUniqueId(),
    ...rowData
  };
  
  const updatedTable = {
    ...table,
    rows: [...table.rows, newRow]
  };
  
  return saveTable(updatedTable);
};

export const updateTableRow = (tableId: string, rowId: string, rowData: Record<string, any>): DataTable | null => {
  const table = getTableById(tableId);
  if (!table) return null;
  
  const rowIndex = table.rows.findIndex(row => row.id === rowId);
  if (rowIndex === -1) return null;
  
  const updatedRows = [...table.rows];
  updatedRows[rowIndex] = { ...updatedRows[rowIndex], ...rowData };
  
  const updatedTable = {
    ...table,
    rows: updatedRows
  };
  
  return saveTable(updatedTable);
};

export const deleteTableRow = (tableId: string, rowId: string): DataTable | null => {
  const table = getTableById(tableId);
  if (!table) return null;
  
  const updatedTable = {
    ...table,
    rows: table.rows.filter(row => row.id !== rowId)
  };
  
  return saveTable(updatedTable);
};

export const getAllUsers = (): User[] => {
  const data = getStorageData();
  return data.users;
};

export const getUserById = (id: string): User | undefined => {
  const users = getAllUsers();
  return users.find(user => user.id === id);
};

export const exportTableData = (tableId: string): string => {
  const table = getTableById(tableId);
  if (!table) throw new Error('Table not found');
  
  return JSON.stringify(table, null, 2);
};

export const importTableData = (jsonData: string): DataTable => {
  try {
    const tableData = JSON.parse(jsonData);
    
    if (!tableData.name || !tableData.columns || !Array.isArray(tableData.rows)) {
      throw new Error('Invalid table data format');
    }
    
    return createTable({
      name: tableData.name,
      description: tableData.description || '',
      template: tableData.template || 'custom',
      columns: tableData.columns,
      rows: tableData.rows
    });
  } catch (error) {
    throw new Error('Failed to import table data: ' + (error as Error).message);
  }
};

export const clearAllData = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

export const getTableStats = () => {
  const tables = getAllTables();
  const totalRows = tables.reduce((sum, table) => sum + table.totalRows, 0);
  
  return {
    totalTables: tables.length,
    totalRows,
    avgRowsPerTable: tables.length > 0 ? Math.round(totalRows / tables.length) : 0,
    lastUpdated: new Date()
  };
};

const generateUniqueId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const isStorageAvailable = (): boolean => {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
};

export const getStorageUsage = (): { used: number; percentage: number } => {
  if (!isStorageAvailable()) {
    return { used: 0, percentage: 0 };
  }
  
  try {
    const data = JSON.stringify(getStorageData());
    const used = new Blob([data]).size;
    const quota = 5 * 1024 * 1024;
    
    return {
      used,
      percentage: Math.round((used / quota) * 100)
    };
  } catch {
    return { used: 0, percentage: 0 };
  }
};