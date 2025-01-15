import React, { useState, useEffect } from 'react';
import { getCandidates } from '../../api/candidates';
import CandidateCard from './CandidateCard';

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const response = await getCandidates(page);
      setCandidates(response.candidates);
      setTotalPages(response.totalPages);
      setError('');
    } catch (err) {
      setError('Error al cargar los candidatos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, [page]);

  const handleDelete = () => {
    fetchCandidates();
  };

  if (loading) return <div className="text-center p-4">Cargando...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
        {candidates.map(candidate => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {candidates.length === 0 ? (
        <div className="text-center p-4 bg-yellow-50 rounded">
          No hay candidatos registrados
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default CandidateList;