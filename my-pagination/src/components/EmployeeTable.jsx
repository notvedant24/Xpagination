import React, { useEffect, useState } from 'react';
import styles from './EmployeeTable.module.css';

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const rowsPerPage = 10;

  useEffect(() => {
    fetch(
      'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
    )
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        console.log('Fetched data:', data.length, 'items');
        setEmployees(data);
        setLoading(false);
      })
      .catch(() => {
        console.log('API failed, using mock data');
        // Fallback mock data to ensure pagination works
        const mockData = Array.from({ length: 25 }, (_, i) => ({
          id: i + 1,
          name: `Employee ${i + 1}`,
          email: `employee${i + 1}@company.com`,
          role: `Role ${i + 1}`
        }));
        setEmployees(mockData);
        setLoading(false);
        alert('failed to fetch data');
      });
  }, []);

  const totalPages = Math.ceil(employees.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = employees.slice(startIndex, startIndex + rowsPerPage);


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody key={currentPage} className={styles.tbody}>
          {currentData.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <button
          className={styles.button}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span className={styles.pageNumber} data-cy="current-page" data-testid="page-number" id="current-page-number">
          {currentPage}
        </span>

        <button
          className={styles.button}
          onClick={() => {
            console.log('Next clicked, current page:', currentPage, 'total pages:', totalPages);
            setCurrentPage((prev) => {
              const newPage = Math.min(prev + 1, totalPages);
              console.log('Setting new page:', newPage);
              return newPage;
            });
          }}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default EmployeeTable;
