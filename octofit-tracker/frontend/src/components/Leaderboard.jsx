import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../api';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const endpoint = `${API_BASE_URL}/api/leaderboard/`;
        console.log('Fetching Leaderboard from:', endpoint);
        
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Leaderboard response:', data);
        
        // Handle both paginated and plain array responses
        const leaderboardList = data.results || (Array.isArray(data) ? data : []);
        console.log('Processed leaderboard:', leaderboardList);
        
        setLeaderboard(leaderboardList);
        setError(null);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError(err.message);
        setLeaderboard([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="loading-spinner">
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <span className="ms-2">Loading leaderboard...</span>
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

  const getRankBadge = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '🏅';
  };

  const getRankClass = (rank) => {
    if (rank === 1) return 'bg-warning';
    if (rank === 2) return 'bg-secondary';
    if (rank === 3) return 'bg-danger';
    return 'bg-info';
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-12">
          <h2>🏆 Competitive Leaderboard</h2>
          
          {leaderboard.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📊</div>
              <h4>No Leaderboard Data</h4>
              <p>No competitive data available at this time.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th style={{ width: '10%' }}>Rank</th>
                    <th style={{ width: '30%' }}>User</th>
                    <th style={{ width: '20%' }}>Score</th>
                    <th style={{ width: '20%' }}>Points</th>
                    <th style={{ width: '20%' }}>Activities</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, index) => {
                    const rank = index + 1;
                    return (
                      <tr key={entry.id || index} className={rank <= 3 ? 'table-active' : ''}>
                        <td>
                          <span className={`badge ${getRankClass(rank)}`}>
                            {getRankBadge(rank)} {rank}
                          </span>
                        </td>
                        <td className="fw-bold">
                          {entry.user 
                            ? entry.user.username 
                            : entry.username || 'N/A'
                          }
                        </td>
                        <td>
                          <span className="badge bg-primary">
                            {entry.score || 0}
                          </span>
                        </td>
                        <td>
                          <span className="badge bg-success">
                            {entry.points || 0}pts
                          </span>
                        </td>
                        <td>
                          <span className="badge bg-info">
                            {entry.activities_count || 0} activities
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          <div className="mt-3">
            <p className="text-muted">Leaderboard Entries: <strong>{leaderboard.length}</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
