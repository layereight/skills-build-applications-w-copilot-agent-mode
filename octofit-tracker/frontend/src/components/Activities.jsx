import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../api';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const endpoint = `${API_BASE_URL}/api/activities/`;
        console.log('Fetching Activities from:', endpoint);
        
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Activities response:', data);
        
        // Handle both paginated and plain array responses
        const activitiesList = data.results || (Array.isArray(data) ? data : []);
        console.log('Processed activities:', activitiesList);
        
        setActivities(activitiesList);
        setError(null);
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError(err.message);
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="loading-spinner">
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <span className="ms-2">Loading activities...</span>
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
          <h2>🏃 Activities</h2>
          
          {activities.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📋</div>
              <h4>No Activities Found</h4>
              <p>There are currently no activities recorded.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Duration</th>
                    <th>Calories</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity) => (
                    <tr key={activity.id}>
                      <td>
                        <span className="badge bg-primary">{activity.id}</span>
                      </td>
                      <td className="fw-bold">{activity.name || 'N/A'}</td>
                      <td>{activity.type || 'N/A'}</td>
                      <td>{activity.duration || 'N/A'}</td>
                      <td>
                        <span className="badge bg-success">{activity.calories || 0} kcal</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Activities;
