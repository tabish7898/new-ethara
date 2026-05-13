import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Briefcase, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({ projects: 0, tasks: 0, completed: 0, pending: 0, overdue: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data: projects } = await axios.get('http://localhost:5000/api/projects', config);
        const { data: tasks } = await axios.get('http://localhost:5000/api/tasks', config);
        
        const completed = tasks.filter(t => t.status === 'Completed').length;
        const pending = tasks.filter(t => t.status !== 'Completed').length;
        const overdue = tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'Completed').length;

        setStats({
          projects: projects.length,
          tasks: tasks.length,
          completed,
          pending,
          overdue
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchStats();
  }, [user]);

  const cards = [
    { title: 'Total Projects', value: stats.projects, icon: Briefcase, color: 'bg-blue-500' },
    { title: 'Total Tasks', value: stats.tasks, icon: CheckCircle, color: 'bg-indigo-500' },
    { title: 'Completed Tasks', value: stats.completed, icon: CheckCircle, color: 'bg-green-500' },
    { title: 'Pending Tasks', value: stats.pending, icon: Clock, color: 'bg-yellow-500' },
    { title: 'Overdue Tasks', value: stats.overdue, icon: AlertCircle, color: 'bg-red-500' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {cards.map((card, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm p-6 flex items-center space-x-4 border border-gray-100 hover:shadow-md transition-shadow">
            <div className={`p-3 rounded-lg ${card.color} text-white`}>
              <card.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{card.title}</p>
              <p className="text-2xl font-semibold text-gray-900">{card.value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mt-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>
        <p className="text-gray-500">Analytics and charts would go here in a full implementation.</p>
      </div>
    </div>
  );
}
