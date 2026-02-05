import { NavLink } from 'react-router-dom';

function Navigation() {
  const navItems = [
    { id: 'home', path: '/', label: 'Home', icon: '🏠' },
    { id: 'dashboard', path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'create', path: '/create-routine', label: 'Create', icon: '➕' },
    { id: 'rewards', path: '/rewards', label: 'Rewards', icon: '🏆' },
    { id: 'settings', path: '/settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <nav className="bottom-navigation">
      {navItems.map((item) => (
        <NavLink
          key={item.id}
          to={item.path}
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          title={item.label}
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export default Navigation;
