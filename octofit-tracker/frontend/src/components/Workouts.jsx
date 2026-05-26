import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../api';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const endpoint = `${API_BASE_URL}/api/workouts/`;
        console.log('Fetching Workouts from:', endpoint);
        
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Workouts response:', data);
        
        // Handle both paginated and plain array responses
        const workoutsList = data.results || (Array.isArray(data) ? data : []);
        console.log('Processed workouts:', workoutsList);
        
        setWorkouts(workoutsList);
        setError(null);
      } catch (err) {
        console.error('Error fetching workouts:', err);
        setError(err.message);
        setWorkouts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="loading-spinner">
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <span className="ms-2">Loading workouts...</span>
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
          <h2>💪 Workouts</h2>
          
          {workouts.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🏋️</div>
              <h4>No Workouts Found</h4>
              <p>There are currently no personalized workouts available.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Workout Name</th>
                    <th>Type</th>
                    <th>Duration</th>
                    <th>Intensity</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {workouts.map((workout) => (
                    <tr key={workout.id}>
                      <td>
                        <span className="badge bg-primary">{workout.id}</span>
                      </td>
                      <td className="fw-bold">{workout.name || 'N/A'}</td>
                      <td>{workout.type || 'N/A'}</td>
                      <td>{workout.duration || 'N/A'}</td>
                      <td>
                        <span className={`badge ${
                          workout.intensity === 'High' ? 'bg-danger' :
                          workout.intensity === 'Medium' ? 'bg-warning' :
                          'bg-success'
                        }`}>
                          {workout.intensity || 'N/A'}
                        </span>
                      </td>
                      <td>
                        {workout.date 
                          ? new Date(workout.date).toLocaleDateString()
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
            <p className="text-muted">Total Workouts: <strong>{workouts.length}</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workouts;
