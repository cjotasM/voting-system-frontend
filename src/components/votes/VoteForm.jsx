import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCandidates } from '../../api/candidates';
import { createVote } from '../../api/votes';
import { useAuth } from '../../contexts/AuthContext';

const VoteForm = ({ onVoteComplete }) => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    loadCandidates();
  }, []);

  const loadCandidates = async () => {
    try {
      const data = await getCandidates();
      setCandidates(data.candidates);
    } catch (err) {
      setError('Error al cargar los candidatos');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCandidate) {
      setError('Debes seleccionar un candidato');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await createVote({
        voter_id: user.id,
        candidate_id: parseInt(selectedCandidate)
      });
      
      if (onVoteComplete) {
        onVoteComplete();
      }
      
    } catch (err) {
      console.error('Error al votar:', err);
      setError(err.response?.data?.error || 'Error al registrar el voto');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-gray-600">Cargando candidatos...</div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Emitir Voto</h2>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Selecciona un candidato
          </label>
          <select
            className="w-full p-2 border rounded"
            value={selectedCandidate}
            onChange={(e) => setSelectedCandidate(e.target.value)}
            disabled={submitting}
            required
          >
            <option value="">Selecciona un candidato</option>
            {candidates.map((candidate) => (
              <option key={candidate.id} value={candidate.id}>
                {candidate.name} - {candidate.party}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={submitting || !selectedCandidate}
          className={`w-full p-2 rounded text-white font-medium
            ${submitting || !selectedCandidate 
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'}
          `}
        >
          {submitting ? 'Registrando voto...' : 'Emitir Voto'}
        </button>
      </form>
    </div>
  );
};

export default VoteForm;