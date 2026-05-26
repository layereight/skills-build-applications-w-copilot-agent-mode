import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const endpoint = `${API_BASE_URL}/api/users/`;
        console.log('Fetching Users from:', endpoint);
        
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Users response:', data);
        
        // Handle both paginated and plain array responses
        const usersList = data.results || (Array.isArray(data) ? data : []);
        console.log('Processed users:', usersList);
        
        setUsers(usersList);
        setError(null);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err.message);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="loading-spinner">
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <span className="ms-2">Loading users...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-12">
          <h2>👥 Users</h2>
          
          {users.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">👤</div>
              <h4>No Users Found</h4>
              <p>There are currently no registered users.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <span className="badge bg-primary">{user.id}</span>
                      </td>
                      <td className="fw-bold">{user.username || 'N/A'}</td>
                      <td>{user.email || 'N/A'}</td>
                      <td>{user.first_name || 'N/A'}</td>
                      <td>{user.last_name || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="mt-3">
            <p className="text-muted">Total Users: <strong>{users.length}</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
