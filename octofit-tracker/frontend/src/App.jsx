import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import octofitLogo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { to: '/activities', label: 'Activities', number: '01' },
  { to: '/leaderboard', label: 'Leaderboard', number: '02' },
  { to: '/teams', label: 'Teams', number: '03' },
  { to: '/users', label: 'Athletes', number: '04' },
  { to: '/workouts', label: 'Workouts', number: '05' },
]

function AppFrame() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink className="brand" to="/activities" aria-label="OctoFit Tracker home">
          <img className="brand__logo" src={octofitLogo} alt="" />
          <span className="brand__name">OCTOFIT</span>
          <span className="brand__descriptor">TRACKER</span>
        </NavLink>

        <div className="sidebar__section-label">TRAINING DESK</div>
        <nav className="side-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <NavLink
              className={({ isActive }) => `side-nav__link${isActive ? ' is-active' : ''}`}
              key={item.to}
              to={item.to}
            >
              <span className="side-nav__number">{item.number}</span>
              <span>{item.label}</span>
              <span className="side-nav__arrow" aria-hidden="true">›</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar__footer">
          <span className="status-mark" aria-hidden="true" />
          <div>
            <strong>OCTOFIT / 2026</strong>
            <span>Move well. Keep going.</span>
          </div>
        </div>
      </aside>

      <main className="workspace">
        <header className="topbar">
          <div className="topbar__path">
            <span className="topbar__signal" aria-hidden="true" />
            <span>PERFORMANCE</span>
            <span className="topbar__divider">/</span>
            <span className="topbar__current">TRACKER</span>
          </div>
          <div className="topbar__date">TRAINING SEASON / 2026</div>
        </header>

        <div className="page-content">
          <Routes>
            <Route path="/" element={<Navigate to="/activities" replace />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="*" element={<Navigate to="/activities" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

export default function App() {
  return <AppFrame />
}
