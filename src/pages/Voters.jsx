import React, { useState } from 'react';
import VoterList from '../components/voters/VoterList';
import { useAuth } from '../contexts/AuthContext';

const VotersPage = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestión de Votantes</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar votante..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Estadísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-blue-800 font-semibold">Total Votantes</h3>
            <p className="text-2xl font-bold">--</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-green-800 font-semibold">Han Votado</h3>
            <p className="text-2xl font-bold">--</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="text-yellow-800 font-semibold">Pendientes</h3>
            <p className="text-2xl font-bold">--</p>
          </div>
        </div>

        {/* Lista de Votantes */}
        <div>
          <VoterList searchTerm={searchTerm} />
        </div>
      </div>

      {/* Información Adicional */}
      <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Información Importante</h2>
        <div className="prose">
          <ul className="list-disc list-inside text-gray-700">
            <li>Los votantes solo pueden emitir un voto.</li>
            <li>La información de los votantes es confidencial y está protegida.</li>
            <li>Se requiere verificación de identidad para eliminar registros.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VotersPage;