import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../api';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const endpoint = `${API_BASE_URL}/api/teams/`;
        console.log('Fetching Teams from:', endpoint);
        
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Teams response:', data);
        
        // Handle both paginated and plain array responses
        const teamsList = data.results || (Array.isArray(data) ? data : []);
        console.log('Processed teams:', teamsList);
        
        setTeams(teamsList);
        setError(null);
      } catch (err) {
        console.error('Error fetching teams:', err);
        setError(err.message);
        setTeams([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="loading-spinner">
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <span className="ms-2">Loading teams...</span>
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
          <h2>🏆 Teams</h2>
          
          {teams.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🎯</div>
              <h4>No Teams Found</h4>
              <p>There are currently no teams created.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Team Name</th>
                    <th>Description</th>
                    <th>Members</th>
                    <th>Created Date</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team) => (
                    <tr key={team.id}>
                      <td>
                        <span className="badge bg-primary">{team.id}</span>
                      </td>
                      <td className="fw-bold">{team.name || 'N/A'}</td>
                      <td>{team.description || 'N/A'}</td>
                      <td>
                        <span className="badge bg-info">
                          {team.members ? team.members.length : 0} members
                        </span>
                      </td>
                      <td>
                        {team.created_at 
                          ? new Date(team.created_at).toLocaleDateString()
                          : 'N/A'
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="mt-3">
            <p className="text-muted">Total Teams: <strong>{teams.length}</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;
