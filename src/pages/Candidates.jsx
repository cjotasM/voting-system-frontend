import React, { useState } from 'react';
import CandidateList from '../components/candidates/CandidateList';
import CandidateForm from '../components/candidates/CandidateForm';

const CandidatesPage = () => {
  // Referencia para el método de recarga de la lista
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCandidateCreated = () => {
    // Incrementar la key para forzar la recarga de la lista
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-6">Gestión de Candidatos</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CandidateList key={refreshKey} />
        </div>
        <div>
          <CandidateForm onSubmitSuccess={handleCandidateCreated} />
        </div>
      </div>
    </div>
  );
};

export default CandidatesPage;