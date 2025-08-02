import React, { useState, useMemo } from 'react';
import { DataTable, TableStats } from '../types';
import { mockTables, getTableStats } from '../data/mockData';

interface TableDashboardProps {
  className?: string;
}

const TableDashboard: React.FC<TableDashboardProps> = ({ className }) => {
  const [selectedTable, setSelectedTable] = useState<DataTable | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const stats: TableStats = useMemo(() => getTableStats(), []);

  const filteredTables = useMemo(() => {
    if (!searchTerm) return mockTables;
    return mockTables.filter(table => 
      table.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      table.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleTableSelect = (table: DataTable) => {
    setSelectedTable(table);
  };

  return (
    <div className={`table-dashboard ${className || ''}`}>
      <div className="dashboard-header">
        <h1>Data Tables Dashboard</h1>
        <div className="dashboard-stats">
          <div className="stat-card">
            <span className="stat-label">Total Tables</span>
            <span className="stat-value">{stats.totalTables}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Total Rows</span>
            <span className="stat-value">{stats.totalRows}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Avg Rows/Table</span>
            <span className="stat-value">{stats.avgRowsPerTable}</span>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="tables-sidebar">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search tables..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="tables-list">
            {filteredTables.map((table) => (
              <div
                key={table.id}
                className={`table-card ${selectedTable?.id === table.id ? 'selected' : ''}`}
                onClick={() => handleTableSelect(table)}
              >
                <h3 className="table-name">{table.name}</h3>
                <p className="table-description">{table.description}</p>
                <div className="table-meta">
                  <span className="table-rows">{table.totalRows} rows</span>
                  <span className="table-columns">{table.columns.length} columns</span>
                </div>
                <div className="table-dates">
                  <small>Updated: {table.updatedAt.toLocaleDateString()}</small>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="table-preview">
          {selectedTable ? (
            <div className="preview-container">
              <div className="preview-header">
                <h2>{selectedTable.name}</h2>
                <p>{selectedTable.description}</p>
              </div>
              
              <div className="preview-table">
                <table>
                  <thead>
                    <tr>
                      {selectedTable.columns.map((column) => (
                        <th key={column.id} style={{ width: column.width }}>
                          {column.name}
                          <span className="column-type">({column.type})</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {selectedTable.rows.slice(0, 10).map((row) => (
                      <tr key={row.id}>
                        {selectedTable.columns.map((column) => (
                          <td key={column.id}>
                            {column.type === 'date' && row[column.id] instanceof Date
                              ? row[column.id].toLocaleDateString()
                              : column.type === 'boolean'
                              ? row[column.id] ? 'Yes' : 'No'
                              : String(row[column.id] ?? '')}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {selectedTable.rows.length > 10 && (
                  <div className="table-footer">
                    Showing 10 of {selectedTable.rows.length} rows
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="no-selection">
              <h3>Select a table to preview</h3>
              <p>Choose a table from the sidebar to see its structure and data</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TableDashboard;