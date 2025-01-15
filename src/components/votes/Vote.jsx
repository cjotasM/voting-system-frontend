import React from 'react';
import VoteForm from '../components/votes/VoteForm';

const VotePage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Emitir Voto</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <VoteForm />
      </div>
    </div>
  );
};

export default VotePage;