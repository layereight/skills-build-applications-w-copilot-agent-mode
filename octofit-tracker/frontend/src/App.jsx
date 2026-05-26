import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities'
import Users from './components/Users'
import Teams from './components/Teams'
import Workouts from './components/Workouts'
import Leaderboard from './components/Leaderboard'
import { API_BASE_URL } from './api'

function App() {
  console.log('App component rendered. API Base URL:', API_BASE_URL)

  return (
    <Router>
      <div className="app">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              🏋️ OctoFit Tracker
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    Workouts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    Leaderboard
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <div className="container mt-5">
                  <h1 className="display-4">Welcome to OctoFit Tracker</h1>
                  <p className="lead">
                    Track your fitness activities, join teams, and compete on the leaderboard!
                  </p>
                  <p>
                    <strong>API Base URL:</strong> {API_BASE_URL}
                  </p>
                  <div className="alert alert-info">
                    <p>Navigate using the menu above to view:</p>
                    <ul>
                      <li>Activities - View all fitness activities</li>
                      <li>Users - View all registered users</li>
                      <li>Teams - View and manage teams</li>
                      <li>Workouts - View personalized workouts</li>
                      <li>Leaderboard - Competitive rankings</li>
                    </ul>
                  </div>
                </div>
              }
            />
            <Route path="/activities" element={<Activities />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </main>

        <footer className="bg-light text-center py-3 mt-5">
          <p>&copy; 2026 OctoFit Tracker. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
