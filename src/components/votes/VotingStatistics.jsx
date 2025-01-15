// src/components/votes/VotingStatistics.jsx
import React, { useState, useEffect } from 'react';
import { getVotingStatistics } from '../../api/votes';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const VotingStatistics = () => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await getVotingStatistics();
        console.log('Estadísticas recibidas:', response); // Para debug
        setStatistics(response);
        setLoading(false);
      } catch (err) {
        console.error('Error al cargar estadísticas:', err);
        setError('Error al cargar las estadísticas');
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) return <div className="text-center p-4">Cargando estadísticas...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;
  if (!statistics) return <div className="text-center p-4">No hay datos disponibles</div>;

  const { candidates = [], total_votes = 0 } = statistics;

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-6">Estadísticas de Votación</h2>
      
      {/* Métricas generales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-blue-800 font-semibold">Total de Votos</h3>
          <p className="text-2xl font-bold">{total_votes}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-green-800 font-semibold">Candidatos</h3>
          <p className="text-2xl font-bold">{candidates?.length || 0}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-purple-800 font-semibold">Mayor Porcentaje</h3>
          <p className="text-2xl font-bold">
            {candidates?.length > 0 ? `${candidates[0].percentage}%` : '0%'}
          </p>
        </div>
      </div>

      {candidates?.length > 0 ? (
        <>
          {/* Gráfico de barras */}
          <div className="bg-white p-4 rounded-lg shadow h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={candidates}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value, name) => [value, name === 'votes' ? 'Votos' : 'Porcentaje']} />
                <Legend />
                <Bar dataKey="votes" fill="#8884d8" name="Votos" />
                <Bar dataKey="percentage" fill="#82ca9d" name="Porcentaje" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico circular */}
          <div className="bg-white p-4 rounded-lg shadow h-96">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={candidates}
                  dataKey="votes"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  label={({name, percentage}) => `${name} (${percentage}%)`}
                >
                  {candidates.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name, props) => [value, 'Votos']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Tabla de resultados */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Detalle de Resultados</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Candidato
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Partido
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Votos
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Porcentaje
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {candidates.map((candidate) => (
                    <tr key={candidate.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{candidate.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{candidate.party}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{candidate.votes}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{candidate.percentage}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center p-4 bg-yellow-50 rounded-lg">
          No hay datos de votación disponibles
        </div>
      )}
    </div>
  );
};

export default VotingStatistics;