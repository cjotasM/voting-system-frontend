import React, { useState } from 'react';
import { createCandidate } from '../../api/candidates';

const CandidateForm = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    party: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await createCandidate(formData);
      setFormData({ name: '', email: '', party: '' }); // Limpiar el formulario
      if (onSubmitSuccess) onSubmitSuccess(); // Llamar al callback de éxito
    } catch (err) {
      setError(err.response?.data?.error || 'Error al crear el candidato');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Registrar Nuevo Candidato</h2>
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Nombre
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            className="w-full p-2 border rounded"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Partido Político
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={formData.party}
            onChange={(e) => setFormData({...formData, party: e.target.value})}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Registrando...' : 'Registrar Candidato'}
        </button>
      </form>
    </div>
  );
};

export default CandidateForm;