import React from 'react';
import { axiosPrivate } from '../../api/axios.config';

const VoteCard = ({ voter, onUpdate }) => {
  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este votante?')) {
      try {
        await axiosPrivate.delete(`/voters/${voter.id}`);
        onUpdate(); // Refrescar la lista
      } catch (error) {
        console.error('Error al eliminar votante:', error);
        alert('Error al eliminar el votante');
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-2">{voter.name}</h3>
      <p className="text-gray-600 mb-2">{voter.email}</p>
      <div className="flex items-center justify-between">
        <span className={`px-2 py-1 rounded-full text-sm ${
          voter.has_voted 
            ? 'bg-green-100 text-green-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {voter.has_voted ? 'Ha votado' : 'No ha votado'}
        </span>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default VoteCard;