import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Plus } from 'lucide-react';

export default function Projects() {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get('http://localhost:5000/api/projects', config);
        setProjects(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProjects();
  }, [user]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
        {user?.role === 'Admin' && (
          <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center shadow hover:bg-indigo-700 transition">
            <Plus className="h-5 w-5 mr-2" /> New Project
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <div key={project._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
            <h3 className="text-lg font-bold text-gray-800 mb-2">{project.name}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
            <div className="flex justify-between items-center">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${project.status === 'Completed' ? 'bg-green-100 text-green-800' : project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                {project.status}
              </span>
              <span className={`text-xs font-bold ${project.priority === 'High' ? 'text-red-500' : project.priority === 'Medium' ? 'text-yellow-500' : 'text-green-500'}`}>
                {project.priority} Priority
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
