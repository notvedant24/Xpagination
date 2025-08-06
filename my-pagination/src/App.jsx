import React from 'react';
import EmployeeTable from './components/EmployeeTable';
import './index.css'
const App = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Employee Data Table</h1>
      <EmployeeTable />
    </div>
  );
};

export default App;
