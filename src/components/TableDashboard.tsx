import React, { useState } from 'react';
import { DataTable, TableRow, TableColumn } from '../types';
import { mockTables, getUserDisplayName, mockUsers } from '../data/mockData';
import './TableDashboard.css';

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

  const getDefaultValue = (type: string, options?: string[]) => {
    switch (type) {
      case 'text': return '';
      case 'number': return 0;
      case 'date': return new Date().toISOString().split('T')[0];
      case 'yes_no': return false;
      case 'dropdown': return options?.[0] || '';
      case 'user': return mockUsers[0]?.id || '';
      default: return '';
    }
  };

  // Moved formatCellValue logic into component methods

  return (
    <div className="app-container">
      {/* Top Navigation */}
      <div className="top-nav">
        <div className="nav-left">
          <span className="nav-title">Main Container</span>
        </div>
        <div className="nav-center">
          <div className="search-container">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Search" className="global-search" />
          </div>
        </div>
        <div className="nav-right">
          <button className="nav-icon">🔔</button>
          <button className="nav-icon">❓</button>
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
              <span className="nav-icon">🏠</span>
              <span className="nav-label">Home</span>
            </div>
            <div className="nav-item">
              <span className="nav-icon">📄</span>
              <span className="nav-label">Template</span>
            </div>
            <div className="nav-item">
              <span className="nav-icon">⚡</span>
              <span className="nav-label">Actions</span>
            </div>
            <div className="nav-item">
              <span className="nav-icon">🎓</span>
              <span className="nav-label">Training</span>
            </div>
            <div className="nav-item active">
              <span className="nav-icon">📊</span>
              <span className="nav-label">Data</span>
            </div>
            <div className="nav-item">
              <span className="nav-icon">⋯</span>
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
              <button className="back-btn">←</button>
            </div>
            <div className="page-title">
              <h1>{selectedTable.name}</h1>
            </div>
            <div className="page-actions">
              <button 
                className={`btn-secondary ${isManageMode ? 'active' : ''}`}
                onClick={handleManageMode}
              >
                <span className="btn-icon">⚙️</span>
                {isManageMode ? 'Exit Manage' : 'Manage'}
              </button>
              <button className="btn-primary" onClick={handleNewRow}>
                <span className="btn-icon">+</span>
                New
              </button>
            </div>
          </div>

          <div className="table-controls">
            <div className="table-search">
              <span className="search-icon">🔍</span>
              <input type="text" placeholder="Search" className="table-search-input" />
            </div>
            <div className="table-filters">
              {isManageMode && selectedRows.size > 0 && (
                <button className="delete-btn" onClick={handleDeleteRows}>
                  <span className="delete-icon">🗑️</span>
                  Delete ({selectedRows.size})
                </button>
              )}
              <button className="filter-btn">
                <span className="filter-icon">⚡</span>
                Filters
              </button>
              <button className="view-btn">
                <span className="view-icon">⊞</span>
              </button>
              <button className="sort-btn">
                <span className="sort-icon">↕</span>
              </button>
              <button className="export-btn">
                <span className="export-icon">↓</span>
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
              <button className="save-btn" onClick={handleSave}>✓</button>
              <button className="cancel-btn" onClick={onCancel}>✕</button>
            </div>
          ) : (
            <button className="edit-btn" onClick={onEdit}>✏️</button>
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
          <button className="modal-close" onClick={onCancel}>✕</button>
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