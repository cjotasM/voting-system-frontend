import React, { useState, useEffect } from 'react';
import VoterCard from './VoteCard';
import { axiosPrivate } from '../../api/axios.config';

const VoterList = () => {
  const [voters, setVoters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit] = useState(10);

  useEffect(() => {
    fetchVoters();
  }, [page]);

  const fetchVoters = async () => {
    try {
      const response = await axiosPrivate.get(`/voters?page=${page}&limit=${limit}`);
      setVoters(response.data.voters);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (err) {
      setError('Error al cargar los votantes');
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center p-4">Cargando...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Lista de Votantes</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {voters.map(voter => (
          <VoterCard key={voter.id} voter={voter} onUpdate={fetchVoters} />
        ))}
      </div>
      
      {/* Paginación */}
      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="px-4 py-2">
          Página {page} de {totalPages}
        </span>
        <button
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default VoterList;