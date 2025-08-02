export type ColumnType = 'text' | 'number' | 'date' | 'dropdown' | 'yes_no' | 'user' | 'file_upload';

export type TableTemplate = 'risk' | 'chemical' | 'hazard' | 'asset' | 'custom';

export interface TableColumn {
  id: string;
  name: string;
  type: ColumnType;
  required?: boolean;
  width?: number;
  sortable?: boolean;
  filterable?: boolean;
  options?: string[];
  defaultValue?: any;
  validation?: {
    min?: number;
    max?: number;
    maxLength?: number;
    pattern?: string;
  };
}

export interface TableRow {
  id: string;
  [key: string]: any;
}

export interface DataTable {
  id: string;
  name: string;
  description?: string;
  template: TableTemplate;
  columns: TableColumn[];
  rows: TableRow[];
  createdAt: string;
  updatedAt: string;
  totalRows: number;
}

export interface TableFilter {
  columnId: string;
  operator: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan' | 'between';
  value: any;
}

export interface TableSort {
  columnId: string;
  direction: 'asc' | 'desc';
}

export interface TableViewConfig {
  filters: TableFilter[];
  sort: TableSort[];
  visibleColumns: string[];
  pageSize: number;
  currentPage: number;
}

export interface TableStats {
  totalTables: number;
  totalRows: number;
  avgRowsPerTable: number;
  lastUpdated: Date;
}

export interface TableTemplate {
  id: TableTemplate;
  name: string;
  description: string;
  icon: string;
  columns: Omit<TableColumn, 'id'>[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface FileAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
  url?: string;
}

export interface RiskLevel {
  level: 'low' | 'medium' | 'high' | 'critical';
  score: number;
  color: string;
}

export interface LocalStorageData {
  tables: DataTable[];
  users: User[];
  lastModified: string;
}