import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LayoutDashboard, Folder, CheckSquare, Users, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const { logout, user } = useContext(AuthContext);
  const location = useLocation();

  const links = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Projects', path: '/projects', icon: Folder },
    { name: 'Tasks', path: '/tasks', icon: CheckSquare },
  ];

  if (user?.role === 'Admin') {
    links.push({ name: 'Team', path: '/team', icon: Users });
  }

  return (
    <div className="w-64 bg-dark text-white h-screen flex flex-col">
      <div className="p-6 text-2xl font-bold text-center tracking-wider border-b border-gray-800">
        <span className="text-primary">Pro</span>Manage
      </div>
      <div className="flex-1 py-6 space-y-2">
        {links.map((link) => (
          <Link key={link.name} to={link.path} className={`flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors ${location.pathname === link.path ? 'bg-gray-800 border-r-4 border-primary text-white' : ''}`}>
            <link.icon className="h-5 w-5 mr-3" />
            {link.name}
          </Link>
        ))}
      </div>
      <div className="p-6 border-t border-gray-800">
        <div className="flex items-center mb-4">
          <div className="bg-primary text-white rounded-full h-10 w-10 flex items-center justify-center font-bold mr-3 uppercase">
            {user?.name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-gray-400">{user?.role}</p>
          </div>
        </div>
        <button onClick={logout} className="flex items-center text-gray-400 hover:text-white transition-colors w-full">
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
}
