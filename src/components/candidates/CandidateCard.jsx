import React from 'react';
import { deleteCandidate } from '../../api/candidates';

const CandidateCard = ({ candidate, onDelete }) => {
  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este candidato?')) {
      try {
        await deleteCandidate(candidate.id);
        if (onDelete) onDelete();
      } catch (error) {
        console.error('Error al eliminar candidato:', error);
        alert('Error al eliminar el candidato');
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold mb-2">{candidate.name}</h3>
          <p className="text-gray-600 mb-2">{candidate.email}</p>
          <p className="text-gray-700">
            <span className="font-medium">Partido:</span> {candidate.party}
          </p>
          {candidate.votes !== undefined && (
            <p className="mt-2 text-blue-600">
              <span className="font-medium">Votos:</span> {candidate.votes}
            </p>
          )}
        </div>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700 transition-colors"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default CandidateCard;