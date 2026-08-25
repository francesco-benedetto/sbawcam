import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

function App() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="mb-3">Octofit Tracker</h1>
        <nav className="nav nav-pills gap-2">
          <NavLink to="/users" className="nav-link">
            Users
          </NavLink>
          <NavLink to="/teams" className="nav-link">
            Teams
          </NavLink>
          <NavLink to="/activities" className="nav-link">
            Activities
          </NavLink>
          <NavLink to="/leaderboard" className="nav-link">
            Leaderboard
          </NavLink>
          <NavLink to="/workouts" className="nav-link">
            Workouts
          </NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
