import React, { useState } from 'react';
import { DataTable, TableRow, TableColumn } from '../types';
import { mockTables, getUserDisplayName, mockUsers } from '../data/mockData';
import './TableDashboard.css';

// Icon components (simplified SVG icons)
const SearchIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const HomeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const DocumentIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const BoltIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const AcademicCapIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
  </svg>
);

const ChartBarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const DotsHorizontalIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

const CogIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const BellIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM15 3H6a3 3 0 00-3 3v12a3 3 0 003 3h9m3-12V6a3 3 0 00-3-3" />
  </svg>
);

const QuestionMarkCircleIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ViewColumnsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 0V5a2 2 0 012-2h6.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V7a2 2 0 01-2 2H11a2 2 0 01-2-2z" />
  </svg>
);

const ArrowsUpDownIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
  </svg>
);

const ArrowDownTrayIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const XMarkIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const PencilIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);

interface TableDashboardProps {
  className?: string;
}

const TableDashboard: React.FC<TableDashboardProps> = ({ className }) => {
  const [tables, setTables] = useState<DataTable[]>(mockTables);
  const [selectedTable, setSelectedTable] = useState<DataTable>(mockTables[0]);
  // const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [isManageMode, setIsManageMode] = useState(false);
  const [editingRow, setEditingRow] = useState<string | null>(null);
  const [showNewRowModal, setShowNewRowModal] = useState(false);

  const handleTableSelect = (table: DataTable) => {
    const currentTable = tables.find(t => t.id === table.id) || table;
    setSelectedTable(currentTable);
    setSelectedRows(new Set());
    setIsManageMode(false);
    setShowNewRowModal(false);
    setEditingRow(null);
  };

  const handleRowSelect = (rowId: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(rowId)) {
      newSelected.delete(rowId);
    } else {
      newSelected.add(rowId);
    }
    setSelectedRows(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedRows.size === selectedTable.rows.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(selectedTable.rows.map(row => row.id)));
    }
  };

  const handleNewRow = () => {
    setShowNewRowModal(true);
  };

  const handleManageMode = () => {
    setIsManageMode(!isManageMode);
    setShowNewRowModal(false);
    setEditingRow(null);
    setSelectedRows(new Set());
  };

  const handleEditRow = (rowId: string) => {
    setEditingRow(rowId);
  };

  const handleSaveRow = (rowId: string, data: Record<string, any>) => {
    const updatedRows = selectedTable.rows.map(row => 
      row.id === rowId ? { ...row, ...data } : row
    );
    
    const updatedTable = {
      ...selectedTable,
      rows: updatedRows,
      updatedAt: new Date().toISOString()
    };
    
    updateTable(updatedTable);
    setEditingRow(null);
  };

  const handleDeleteRows = () => {
    if (selectedRows.size === 0) return;
    
    const updatedRows = selectedTable.rows.filter(row => !selectedRows.has(row.id));
    const updatedTable = {
      ...selectedTable,
      rows: updatedRows,
      updatedAt: new Date().toISOString()
    };
    
    updateTable(updatedTable);
    setSelectedRows(new Set());
  };

  const handleAddNewRow = (data: Record<string, any>) => {
    const newRow: TableRow = {
      id: `new-${Date.now()}`,
      ...data
    };
    
    const updatedTable = {
      ...selectedTable,
      rows: [...selectedTable.rows, newRow],
      updatedAt: new Date().toISOString()
    };
    
    updateTable(updatedTable);
    setShowNewRowModal(false);
  };

  const updateTable = (updatedTable: DataTable) => {
    const updatedTables = tables.map(table => 
      table.id === updatedTable.id ? updatedTable : table
    );
    setTables(updatedTables);
    setSelectedTable(updatedTable);
  };


  // Moved formatCellValue logic into component methods

  return (
    <div className="app-container">
      {/* Top Navigation */}
      <div className="top-nav">
        <div className="nav-left">
          <span className="nav-title">Prototype</span>
        </div>
        <div className="nav-center">
          <div className="search-container">
            <span className="search-icon"><SearchIcon /></span>
            <input type="text" placeholder="Search" className="global-search" />
          </div>
        </div>
        <div className="nav-right">
          <button className="nav-icon"><BellIcon /></button>
          <button className="nav-icon"><QuestionMarkCircleIcon /></button>
        </div>
      </div>

      <div className="main-content">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-header">
            <div className="company-logo">SC</div>
          </div>
          
          <nav className="sidebar-nav">
            <div className="nav-item">
              <span className="nav-icon"><HomeIcon /></span>
              <span className="nav-label">Home</span>
            </div>
            <div className="nav-item">
              <span className="nav-icon"><DocumentIcon /></span>
              <span className="nav-label">Template</span>
            </div>
            <div className="nav-item">
              <span className="nav-icon"><BoltIcon /></span>
              <span className="nav-label">Actions</span>
            </div>
            <div className="nav-item">
              <span className="nav-icon"><AcademicCapIcon /></span>
              <span className="nav-label">Training</span>
            </div>
            <div className="nav-item active">
              <span className="nav-icon"><ChartBarIcon /></span>
              <span className="nav-label">Data</span>
            </div>
            <div className="nav-item">
              <span className="nav-icon"><DotsHorizontalIcon /></span>
              <span className="nav-label">More</span>
            </div>
          </nav>

          <div className="data-tables-section">
            <h3 className="section-title">Data Tables</h3>
            <div className="table-list">
              {mockTables.map((table) => (
                <div
                  key={table.id}
                  className={`table-item ${selectedTable?.id === table.id ? 'active' : ''}`}
                  onClick={() => handleTableSelect(table)}
                >
                  {table.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Panel */}
        <div className="content-panel">
          <div className="content-header">
            <div className="breadcrumb">
              <button className="back-btn"><ArrowLeftIcon /></button>
            </div>
            <div className="page-title">
              <h1>{selectedTable.name}</h1>
            </div>
            <div className="page-actions">
              <button 
                className={`btn-secondary ${isManageMode ? 'active' : ''}`}
                onClick={handleManageMode}
              >
                <span className="btn-icon"><CogIcon /></span>
                {isManageMode ? 'Exit Manage' : 'Manage'}
              </button>
              <button className="btn-primary" onClick={handleNewRow}>
                <span className="btn-icon"><PlusIcon /></span>
                New
              </button>
            </div>
          </div>

          <div className="table-controls">
            <div className="table-search">
              <span className="search-icon"><SearchIcon /></span>
              <input type="text" placeholder="Search" className="table-search-input" />
            </div>
            <div className="table-filters">
              {isManageMode && selectedRows.size > 0 && (
                <button className="delete-btn" onClick={handleDeleteRows}>
                  <span className="delete-icon"><TrashIcon /></span>
                  Delete ({selectedRows.size})
                </button>
              )}
              <button className="filter-btn">
                <span className="filter-icon"><BoltIcon /></span>
                Filters
              </button>
              <button className="view-btn">
                <span className="view-icon"><ViewColumnsIcon /></span>
              </button>
              <button className="sort-btn">
                <span className="sort-icon"><ArrowsUpDownIcon /></span>
              </button>
              <button className="export-btn">
                <span className="export-icon"><ArrowDownTrayIcon /></span>
              </button>
            </div>
          </div>

          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th className="checkbox-col">
                    <input
                      type="checkbox"
                      checked={selectedRows.size === selectedTable.rows.length && selectedTable.rows.length > 0}
                      onChange={handleSelectAll}
                    />
                  </th>
                  {selectedTable.columns.map((column) => (
                    <th key={column.id}>
                      {column.name}
                    </th>
                  ))}
                  {isManageMode && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {selectedTable.rows.map((row) => (
                  <EditableTableRow
                    key={row.id}
                    row={row}
                    columns={selectedTable.columns}
                    isSelected={selectedRows.has(row.id)}
                    isEditing={editingRow === row.id}
                    isManageMode={isManageMode}
                    onSelect={() => handleRowSelect(row.id)}
                    onEdit={() => handleEditRow(row.id)}
                    onSave={(data) => handleSaveRow(row.id, data)}
                    onCancel={() => setEditingRow(null)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* New Row Modal */}
      {showNewRowModal && (
        <NewRowModal
          tableName={selectedTable.name}
          columns={selectedTable.columns}
          onSave={handleAddNewRow}
          onCancel={() => setShowNewRowModal(false)}
        />
      )}
    </div>
  );
};

// EditableTableRow Component for inline editing
interface EditableTableRowProps {
  row: TableRow;
  columns: TableColumn[];
  isSelected: boolean;
  isEditing: boolean;
  isManageMode: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onSave: (data: Record<string, any>) => void;
  onCancel: () => void;
}

const EditableTableRow: React.FC<EditableTableRowProps> = ({
  row, columns, isSelected, isEditing, isManageMode, onSelect, onEdit, onSave, onCancel
}) => {
  const [editData, setEditData] = useState<Record<string, any>>(row);

  const handleSave = () => {
    onSave(editData);
  };

  const renderCell = (column: TableColumn) => {
    if (isEditing) {
      return renderEditCell(column);
    }
    
    const value = row[column.id];
    if (value === null || value === undefined || value === '') return '';
    
    switch (column.type) {
      case 'date':
        return typeof value === 'string' ? new Date(value).toLocaleDateString() : value.toLocaleDateString();
      case 'yes_no':
        return value ? 'Yes' : 'No';
      case 'user':
        return getUserDisplayName(value);
      case 'dropdown':
        if (column.id.includes('likelihood') || column.id.includes('severity') || column.id.includes('risk_level')) {
          return (
            <span className={`severity-badge severity-${value.toLowerCase().replace(' ', '-')}`}>
              {value}
            </span>
          );
        }
        return value;
      default:
        return String(value);
    }
  };

  const renderEditCell = (column: TableColumn) => {
    const value = editData[column.id] || '';
    
    switch (column.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => setEditData({...editData, [column.id]: e.target.value})}
            className="edit-input"
          />
        );
      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => setEditData({...editData, [column.id]: Number(e.target.value)})}
            className="edit-input"
          />
        );
      case 'date':
        return (
          <input
            type="date"
            value={typeof value === 'string' ? value.split('T')[0] : value}
            onChange={(e) => setEditData({...editData, [column.id]: e.target.value})}
            className="edit-input"
          />
        );
      case 'yes_no':
        return (
          <select
            value={value ? 'true' : 'false'}
            onChange={(e) => setEditData({...editData, [column.id]: e.target.value === 'true'})}
            className="edit-select"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        );
      case 'dropdown':
        return (
          <select
            value={value}
            onChange={(e) => setEditData({...editData, [column.id]: e.target.value})}
            className="edit-select"
          >
            {column.options?.map((option: string) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      case 'user':
        return (
          <select
            value={value}
            onChange={(e) => setEditData({...editData, [column.id]: e.target.value})}
            className="edit-select"
          >
            {mockUsers.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        );
      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => setEditData({...editData, [column.id]: e.target.value})}
            className="edit-input"
          />
        );
    }
  };

  return (
    <tr className={`${isSelected ? 'selected' : ''} ${isEditing ? 'editing' : ''}`}>
      <td className="checkbox-col">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
        />
      </td>
      {columns.map((column) => (
        <td key={column.id}>
          {renderCell(column)}
        </td>
      ))}
      {isManageMode && (
        <td className="actions-col">
          {isEditing ? (
            <div className="edit-actions">
              <button className="save-btn" onClick={handleSave}><CheckIcon /></button>
              <button className="cancel-btn" onClick={onCancel}><XMarkIcon /></button>
            </div>
          ) : (
            <button className="edit-btn" onClick={onEdit}><PencilIcon /></button>
          )}
        </td>
      )}
    </tr>
  );
};

// NewRowModal Component
interface NewRowModalProps {
  tableName: string;
  columns: TableColumn[];
  onSave: (data: Record<string, any>) => void;
  onCancel: () => void;
}

const NewRowModal: React.FC<NewRowModalProps> = ({ tableName, columns, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    return columns.reduce((acc, col) => {
      switch (col.type) {
        case 'text': acc[col.id] = ''; break;
        case 'number': acc[col.id] = ''; break;
        case 'date': acc[col.id] = new Date().toISOString().split('T')[0]; break;
        case 'yes_no': acc[col.id] = false; break;
        case 'dropdown': acc[col.id] = col.options?.[0] || ''; break;
        case 'user': acc[col.id] = mockUsers[0]?.id || ''; break;
        default: acc[col.id] = '';
      }
      return acc;
    }, {} as Record<string, any>);
  });

  const handleSave = () => {
    // Convert number fields from strings to numbers
    const processedData = { ...formData };
    columns.forEach(col => {
      if (col.type === 'number' && processedData[col.id] !== '') {
        processedData[col.id] = Number(processedData[col.id]);
      }
    });
    onSave(processedData);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  const renderFormField = (column: TableColumn) => {
    const value = formData[column.id] || '';
    
    switch (column.type) {
      case 'text':
        return (
          <div className="form-field">
            <label htmlFor={column.id} className="field-label">
              {column.name} {column.required && <span className="required">*</span>}
            </label>
            <input
              id={column.id}
              type="text"
              value={value}
              onChange={(e) => setFormData({...formData, [column.id]: e.target.value})}
              className="form-input"
              placeholder={`Enter ${column.name}`}
              required={column.required}
            />
          </div>
        );
      case 'number':
        return (
          <div className="form-field">
            <label htmlFor={column.id} className="field-label">
              {column.name} {column.required && <span className="required">*</span>}
            </label>
            <input
              id={column.id}
              type="number"
              value={value}
              onChange={(e) => setFormData({...formData, [column.id]: e.target.value})}
              className="form-input"
              placeholder={`Enter ${column.name}`}
              required={column.required}
            />
          </div>
        );
      case 'date':
        return (
          <div className="form-field">
            <label htmlFor={column.id} className="field-label">
              {column.name} {column.required && <span className="required">*</span>}
            </label>
            <input
              id={column.id}
              type="date"
              value={value}
              onChange={(e) => setFormData({...formData, [column.id]: e.target.value})}
              className="form-input"
              required={column.required}
            />
          </div>
        );
      case 'yes_no':
        return (
          <div className="form-field">
            <label htmlFor={column.id} className="field-label">
              {column.name} {column.required && <span className="required">*</span>}
            </label>
            <select
              id={column.id}
              value={value ? 'true' : 'false'}
              onChange={(e) => setFormData({...formData, [column.id]: e.target.value === 'true'})}
              className="form-select"
              required={column.required}
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
        );
      case 'dropdown':
        return (
          <div className="form-field">
            <label htmlFor={column.id} className="field-label">
              {column.name} {column.required && <span className="required">*</span>}
            </label>
            <select
              id={column.id}
              value={value}
              onChange={(e) => setFormData({...formData, [column.id]: e.target.value})}
              className="form-select"
              required={column.required}
            >
              <option value="">Select {column.name}</option>
              {column.options?.map((option: string) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        );
      case 'user':
        return (
          <div className="form-field">
            <label htmlFor={column.id} className="field-label">
              {column.name} {column.required && <span className="required">*</span>}
            </label>
            <select
              id={column.id}
              value={value}
              onChange={(e) => setFormData({...formData, [column.id]: e.target.value})}
              className="form-select"
              required={column.required}
            >
              <option value="">Select User</option>
              {mockUsers.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
          </div>
        );
      default:
        return (
          <div className="form-field">
            <label htmlFor={column.id} className="field-label">
              {column.name} {column.required && <span className="required">*</span>}
            </label>
            <input
              id={column.id}
              type="text"
              value={value}
              onChange={(e) => setFormData({...formData, [column.id]: e.target.value})}
              className="form-input"
              placeholder={`Enter ${column.name}`}
              required={column.required}
            />
          </div>
        );
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-container">
        <div className="modal-header">
          <h2>Add New Row to {tableName}</h2>
          <button className="modal-close" onClick={onCancel}><XMarkIcon /></button>
        </div>
        
        <div className="modal-body">
          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
            <div className="form-grid">
              {columns.map((column) => (
                <div key={column.id}>
                  {renderFormField(column)}
                </div>
              ))}
            </div>
          </form>
        </div>
        
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-save" onClick={handleSave}>
            Save Row
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableDashboard;