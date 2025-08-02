import { DataTable, TableColumn, TableRow, User, TableTemplate } from '../types';

export const mockUsers: User[] = [
  { id: 'user-1', name: 'John Smith', email: 'john.smith@company.com', role: 'Safety Manager' },
  { id: 'user-2', name: 'Sarah Johnson', email: 'sarah.johnson@company.com', role: 'Site Supervisor' },
  { id: 'user-3', name: 'Mike Davis', email: 'mike.davis@company.com', role: 'Safety Officer' },
  { id: 'user-4', name: 'Emma Wilson', email: 'emma.wilson@company.com', role: 'Environmental Specialist' },
  { id: 'user-5', name: 'David Brown', email: 'david.brown@company.com', role: 'Operations Manager' }
];

const riskRegisterColumns: TableColumn[] = [
  { id: 'risk_id', name: 'Risk ID', type: 'text', width: 100, sortable: true, filterable: true, required: true },
  { id: 'risk_description', name: 'Risk Description', type: 'text', width: 250, sortable: true, filterable: true, required: true },
  { id: 'category', name: 'Category', type: 'dropdown', width: 120, sortable: true, filterable: true, required: true,
    options: ['Operational', 'Environmental', 'Safety', 'Financial', 'Regulatory'] },
  { id: 'likelihood', name: 'Likelihood', type: 'dropdown', width: 100, sortable: true, filterable: true, required: true,
    options: ['Very Low', 'Low', 'Medium', 'High', 'Very High'] },
  { id: 'consequence', name: 'Consequence', type: 'dropdown', width: 120, sortable: true, filterable: true, required: true,
    options: ['Insignificant', 'Minor', 'Moderate', 'Major', 'Catastrophic'] },
  { id: 'risk_level', name: 'Risk Level', type: 'dropdown', width: 100, sortable: true, filterable: true,
    options: ['Low', 'Medium', 'High', 'Critical'] },
  { id: 'control_measures', name: 'Control Measures', type: 'text', width: 200, sortable: false, filterable: true },
  { id: 'owner', name: 'Risk Owner', type: 'user', width: 150, sortable: true, filterable: true, required: true },
  { id: 'review_date', name: 'Review Date', type: 'date', width: 120, sortable: true, filterable: true, required: true },
  { id: 'status', name: 'Status', type: 'dropdown', width: 100, sortable: true, filterable: true,
    options: ['Open', 'In Progress', 'Closed', 'Overdue'] }
];

const riskRegisterRows: TableRow[] = [
  { id: 'risk-1', risk_id: 'RISK-001', risk_description: 'Chemical spill during transportation', category: 'Environmental', likelihood: 'Medium', consequence: 'Major', risk_level: 'High', control_measures: 'Proper containment equipment, trained personnel', owner: 'user-1', review_date: '2024-03-15', status: 'Open' },
  { id: 'risk-2', risk_id: 'RISK-002', risk_description: 'Equipment failure on production line', category: 'Operational', likelihood: 'High', consequence: 'Moderate', risk_level: 'High', control_measures: 'Regular maintenance schedule, backup equipment', owner: 'user-5', review_date: '2024-02-28', status: 'In Progress' },
  { id: 'risk-3', risk_id: 'RISK-003', risk_description: 'Worker injury from fall hazard', category: 'Safety', likelihood: 'Low', consequence: 'Major', risk_level: 'Medium', control_measures: 'Fall protection systems, safety training', owner: 'user-3', review_date: '2024-04-01', status: 'Open' },
  { id: 'risk-4', risk_id: 'RISK-004', risk_description: 'Non-compliance with environmental regulations', category: 'Regulatory', likelihood: 'Medium', consequence: 'Major', risk_level: 'High', control_measures: 'Regular audits, compliance monitoring', owner: 'user-4', review_date: '2024-01-15', status: 'Overdue' },
  { id: 'risk-5', risk_id: 'RISK-005', risk_description: 'Data breach of customer information', category: 'Operational', likelihood: 'Low', consequence: 'Catastrophic', risk_level: 'Medium', control_measures: 'Cybersecurity protocols, encrypted storage', owner: 'user-2', review_date: '2024-05-01', status: 'Closed' }
];

const chemicalRegisterColumns: TableColumn[] = [
  { id: 'chemical_id', name: 'Chemical ID', type: 'text', width: 100, sortable: true, filterable: true, required: true },
  { id: 'chemical_name', name: 'Chemical Name', type: 'text', width: 180, sortable: true, filterable: true, required: true },
  { id: 'cas_number', name: 'CAS Number', type: 'text', width: 120, sortable: true, filterable: true },
  { id: 'hazard_class', name: 'Hazard Classification', type: 'dropdown', width: 150, sortable: true, filterable: true, required: true,
    options: ['Flammable', 'Toxic', 'Corrosive', 'Oxidizing', 'Explosive', 'Environmental Hazard'] },
  { id: 'location', name: 'Storage Location', type: 'text', width: 150, sortable: true, filterable: true, required: true },
  { id: 'quantity', name: 'Quantity (L/kg)', type: 'number', width: 120, sortable: true, filterable: true, required: true },
  { id: 'sds_available', name: 'SDS Available', type: 'yes_no', width: 100, sortable: true, filterable: true, required: true },
  { id: 'last_inspection', name: 'Last Inspection', type: 'date', width: 130, sortable: true, filterable: true },
  { id: 'responsible_person', name: 'Responsible Person', type: 'user', width: 150, sortable: true, filterable: true, required: true },
  { id: 'expiry_date', name: 'Expiry Date', type: 'date', width: 120, sortable: true, filterable: true }
];

const chemicalRegisterRows: TableRow[] = [
  { id: 'chem-1', chemical_id: 'CHEM-001', chemical_name: 'Sodium Hydroxide', cas_number: '1310-73-2', hazard_class: 'Corrosive', location: 'Chemical Storage Room A', quantity: 25, sds_available: true, last_inspection: '2024-01-15', responsible_person: 'user-4', expiry_date: '2025-06-30' },
  { id: 'chem-2', chemical_id: 'CHEM-002', chemical_name: 'Acetone', cas_number: '67-64-1', hazard_class: 'Flammable', location: 'Flammable Cabinet B-2', quantity: 10, sds_available: true, last_inspection: '2024-02-01', responsible_person: 'user-3', expiry_date: '2024-12-31' },
  { id: 'chem-3', chemical_id: 'CHEM-003', chemical_name: 'Hydrochloric Acid', cas_number: '7647-01-0', hazard_class: 'Corrosive', location: 'Acid Storage Cabinet', quantity: 5, sds_available: true, last_inspection: '2024-01-20', responsible_person: 'user-4', expiry_date: '2025-03-15' },
  { id: 'chem-4', chemical_id: 'CHEM-004', chemical_name: 'Methanol', cas_number: '67-56-1', hazard_class: 'Toxic', location: 'Solvent Storage Area', quantity: 15, sds_available: false, last_inspection: '2023-12-15', responsible_person: 'user-3', expiry_date: '2024-08-30' },
  { id: 'chem-5', chemical_id: 'CHEM-005', chemical_name: 'Hydrogen Peroxide', cas_number: '7722-84-1', hazard_class: 'Oxidizing', location: 'Oxidizer Cabinet', quantity: 8, sds_available: true, last_inspection: '2024-02-10', responsible_person: 'user-4', expiry_date: '2024-11-20' }
];

const hazardRegisterColumns: TableColumn[] = [
  { id: 'hazard_id', name: 'Hazard ID', type: 'text', width: 100, sortable: true, filterable: true, required: true },
  { id: 'hazard_type', name: 'Hazard Type', type: 'dropdown', width: 120, sortable: true, filterable: true, required: true,
    options: ['Physical', 'Chemical', 'Biological', 'Ergonomic', 'Psychosocial'] },
  { id: 'description', name: 'Description', type: 'text', width: 250, sortable: true, filterable: true, required: true },
  { id: 'location', name: 'Location/Area', type: 'text', width: 150, sortable: true, filterable: true, required: true },
  { id: 'potential_injury', name: 'Potential Injury', type: 'text', width: 180, sortable: true, filterable: true },
  { id: 'severity', name: 'Severity', type: 'dropdown', width: 100, sortable: true, filterable: true, required: true,
    options: ['Low', 'Medium', 'High', 'Critical'] },
  { id: 'controls_implemented', name: 'Controls Implemented', type: 'yes_no', width: 130, sortable: true, filterable: true },
  { id: 'identified_by', name: 'Identified By', type: 'user', width: 150, sortable: true, filterable: true, required: true },
  { id: 'date_identified', name: 'Date Identified', type: 'date', width: 120, sortable: true, filterable: true, required: true },
  { id: 'action_required', name: 'Action Required', type: 'text', width: 200, sortable: false, filterable: true }
];

const hazardRegisterRows: TableRow[] = [
  { id: 'haz-1', hazard_id: 'HAZ-001', hazard_type: 'Physical', description: 'Unguarded machinery in production area', location: 'Production Floor - Line 2', potential_injury: 'Cuts, amputations, crushing injuries', severity: 'High', controls_implemented: false, identified_by: 'user-2', date_identified: '2024-01-10', action_required: 'Install machine guards and emergency stops' },
  { id: 'haz-2', hazard_id: 'HAZ-002', hazard_type: 'Chemical', description: 'Inadequate ventilation in paint booth', location: 'Paint Shop - Booth 3', potential_injury: 'Respiratory issues, skin irritation', severity: 'Medium', controls_implemented: true, identified_by: 'user-3', date_identified: '2024-01-25', action_required: 'Upgrade ventilation system' },
  { id: 'haz-3', hazard_id: 'HAZ-003', hazard_type: 'Ergonomic', description: 'Heavy lifting without mechanical aids', location: 'Warehouse - Loading Bay', potential_injury: 'Back injuries, muscle strains', severity: 'Medium', controls_implemented: false, identified_by: 'user-5', date_identified: '2024-02-05', action_required: 'Provide lifting equipment and training' },
  { id: 'haz-4', hazard_id: 'HAZ-004', hazard_type: 'Physical', description: 'Wet floors in processing area', location: 'Food Processing - Area B', potential_injury: 'Slips, falls, fractures', severity: 'Medium', controls_implemented: true, identified_by: 'user-1', date_identified: '2024-02-12', action_required: 'Install better drainage and non-slip surfaces' }
];

const assetRegisterColumns: TableColumn[] = [
  { id: 'asset_id', name: 'Asset ID', type: 'text', width: 100, sortable: true, filterable: true, required: true },
  { id: 'asset_name', name: 'Asset Name', type: 'text', width: 180, sortable: true, filterable: true, required: true },
  { id: 'category', name: 'Category', type: 'dropdown', width: 120, sortable: true, filterable: true, required: true,
    options: ['Machinery', 'Vehicles', 'IT Equipment', 'Safety Equipment', 'Tools'] },
  { id: 'manufacturer', name: 'Manufacturer', type: 'text', width: 130, sortable: true, filterable: true },
  { id: 'model', name: 'Model', type: 'text', width: 120, sortable: true, filterable: true },
  { id: 'serial_number', name: 'Serial Number', type: 'text', width: 130, sortable: true, filterable: true },
  { id: 'purchase_date', name: 'Purchase Date', type: 'date', width: 120, sortable: true, filterable: true },
  { id: 'warranty_expiry', name: 'Warranty Expiry', type: 'date', width: 120, sortable: true, filterable: true },
  { id: 'location', name: 'Location', type: 'text', width: 150, sortable: true, filterable: true, required: true },
  { id: 'condition', name: 'Condition', type: 'dropdown', width: 100, sortable: true, filterable: true,
    options: ['Excellent', 'Good', 'Fair', 'Poor', 'Out of Service'] },
  { id: 'responsible_person', name: 'Responsible Person', type: 'user', width: 150, sortable: true, filterable: true, required: true }
];

const assetRegisterRows: TableRow[] = [
  { id: 'asset-1', asset_id: 'AST-001', asset_name: 'CNC Milling Machine', category: 'Machinery', manufacturer: 'Haas Automation', model: 'VF-2SS', serial_number: 'HA2023001', purchase_date: '2023-03-15', warranty_expiry: '2026-03-15', location: 'Machine Shop - Bay 1', condition: 'Excellent', responsible_person: 'user-5' },
  { id: 'asset-2', asset_id: 'AST-002', asset_name: 'Forklift', category: 'Vehicles', manufacturer: 'Toyota', model: '8FGCU25', serial_number: 'TY2022456', purchase_date: '2022-08-20', warranty_expiry: '2025-08-20', location: 'Warehouse', condition: 'Good', responsible_person: 'user-2' },
  { id: 'asset-3', asset_id: 'AST-003', asset_name: 'Gas Detection System', category: 'Safety Equipment', manufacturer: 'Honeywell', model: 'OPTIMA Plus', serial_number: 'HW2023789', purchase_date: '2023-11-10', warranty_expiry: '2028-11-10', location: 'Chemical Storage Area', condition: 'Excellent', responsible_person: 'user-3' },
  { id: 'asset-4', asset_id: 'AST-004', asset_name: 'Server Rack', category: 'IT Equipment', manufacturer: 'Dell', model: 'PowerEdge R740', serial_number: 'DL2023321', purchase_date: '2023-06-05', warranty_expiry: '2026-06-05', location: 'IT Server Room', condition: 'Good', responsible_person: 'user-1' },
  { id: 'asset-5', asset_id: 'AST-005', asset_name: 'Emergency Shower Station', category: 'Safety Equipment', manufacturer: 'Bradley', model: 'S19-314SS', serial_number: 'BR2021654', purchase_date: '2021-04-12', warranty_expiry: '2024-04-12', location: 'Chemical Lab', condition: 'Fair', responsible_person: 'user-4' }
];

const incidentRegisterColumns: TableColumn[] = [
  { id: 'incident_id', name: 'Incident ID', type: 'text', width: 100, sortable: true, filterable: true, required: true },
  { id: 'incident_type', name: 'Incident Type', type: 'dropdown', width: 120, sortable: true, filterable: true, required: true,
    options: ['Near Miss', 'Minor Injury', 'Major Injury', 'Property Damage', 'Environmental', 'Security'] },
  { id: 'date_occurred', name: 'Date Occurred', type: 'date', width: 120, sortable: true, filterable: true, required: true },
  { id: 'location', name: 'Location', type: 'text', width: 150, sortable: true, filterable: true, required: true },
  { id: 'description', name: 'Description', type: 'text', width: 250, sortable: false, filterable: true, required: true },
  { id: 'injured_person', name: 'Injured Person', type: 'text', width: 130, sortable: true, filterable: true },
  { id: 'severity', name: 'Severity', type: 'dropdown', width: 100, sortable: true, filterable: true,
    options: ['Low', 'Medium', 'High', 'Critical'] },
  { id: 'reported_by', name: 'Reported By', type: 'user', width: 130, sortable: true, filterable: true, required: true },
  { id: 'investigation_complete', name: 'Investigation Complete', type: 'yes_no', width: 140, sortable: true, filterable: true },
  { id: 'corrective_actions', name: 'Corrective Actions', type: 'text', width: 200, sortable: false, filterable: true }
];

const incidentRegisterRows: TableRow[] = [
  { id: 'inc-1', incident_id: 'INC-001', incident_type: 'Minor Injury', date_occurred: '2024-02-15', location: 'Production Floor - Line 1', description: 'Worker cut finger while handling sharp metal edge', injured_person: 'Michael Thompson', severity: 'Low', reported_by: 'user-2', investigation_complete: true, corrective_actions: 'Provide cut-resistant gloves, improve edge protection' },
  { id: 'inc-2', incident_id: 'INC-002', incident_type: 'Near Miss', date_occurred: '2024-02-20', location: 'Warehouse - Aisle C', description: 'Forklift nearly collided with pedestrian', injured_person: '', severity: 'Medium', reported_by: 'user-5', investigation_complete: false, corrective_actions: 'Install pedestrian warning system' },
  { id: 'inc-3', incident_id: 'INC-003', incident_type: 'Environmental', date_occurred: '2024-01-30', location: 'Chemical Storage', description: 'Small chemical spill contained quickly', injured_person: '', severity: 'Low', reported_by: 'user-4', investigation_complete: true, corrective_actions: 'Review storage procedures, additional training' }
];

export const mockTables: DataTable[] = [
  {
    id: 'risk-register',
    name: 'Risk Register',
    description: 'Company-wide risk assessment and management',
    template: 'risk',
    columns: riskRegisterColumns,
    rows: riskRegisterRows,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-02-15T10:30:00Z',
    totalRows: riskRegisterRows.length
  },
  {
    id: 'chemical-register',
    name: 'Chemical Register',
    description: 'Hazardous chemicals inventory and safety data',
    template: 'chemical',
    columns: chemicalRegisterColumns,
    rows: chemicalRegisterRows,
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-02-20T14:15:00Z',
    totalRows: chemicalRegisterRows.length
  },
  {
    id: 'hazard-register',
    name: 'Hazard Register',
    description: 'Workplace hazard identification and control measures',
    template: 'hazard',
    columns: hazardRegisterColumns,
    rows: hazardRegisterRows,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-02-12T09:45:00Z',
    totalRows: hazardRegisterRows.length
  },
  {
    id: 'asset-register',
    name: 'Asset Register',
    description: 'Equipment and asset management tracking',
    template: 'asset',
    columns: assetRegisterColumns,
    rows: assetRegisterRows,
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-02-25T16:20:00Z',
    totalRows: assetRegisterRows.length
  },
  {
    id: 'incident-register',
    name: 'Incident Register',
    description: 'Safety incidents and near-miss reporting',
    template: 'custom',
    columns: incidentRegisterColumns,
    rows: incidentRegisterRows,
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-22T11:10:00Z',
    totalRows: incidentRegisterRows.length
  }
];

export const tableTemplates: TableTemplate[] = [
  {
    id: 'risk',
    name: 'Risk Register',
    description: 'Identify, assess, and manage organizational risks',
    icon: '⚠️',
    columns: riskRegisterColumns.map(col => ({ ...col, id: undefined })) as Omit<TableColumn, 'id'>[]
  },
  {
    id: 'chemical',
    name: 'Chemical Register',
    description: 'Track hazardous chemicals and safety data sheets',
    icon: '🧪',
    columns: chemicalRegisterColumns.map(col => ({ ...col, id: undefined })) as Omit<TableColumn, 'id'>[]
  },
  {
    id: 'hazard',
    name: 'Hazard Register',
    description: 'Document workplace hazards and control measures',
    icon: '🚨',
    columns: hazardRegisterColumns.map(col => ({ ...col, id: undefined })) as Omit<TableColumn, 'id'>[]
  },
  {
    id: 'asset',
    name: 'Asset Register',
    description: 'Manage equipment, machinery, and facility assets',
    icon: '🏭',
    columns: assetRegisterColumns.map(col => ({ ...col, id: undefined })) as Omit<TableColumn, 'id'>[]
  },
  {
    id: 'custom',
    name: 'Custom Table',
    description: 'Create a custom table from scratch',
    icon: '📝',
    columns: []
  }
];

export const getTableById = (id: string): DataTable | undefined => {
  return mockTables.find(table => table.id === id);
};

export const getTableStats = () => {
  const totalRows = mockTables.reduce((sum, table) => sum + table.totalRows, 0);
  return {
    totalTables: mockTables.length,
    totalRows,
    avgRowsPerTable: Math.round(totalRows / mockTables.length),
    lastUpdated: new Date()
  };
};

export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getUserDisplayName = (userId: string): string => {
  const user = getUserById(userId);
  return user ? user.name : 'Unknown User';
};