import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import VoteForm from '../components/votes/VoteForm';
import VotingStatistics from '../components/votes/VotingStatistics';
import VotesList from '../components/votes/VotesList';

const VotePage = () => {
  const [activeTab, setActiveTab] = useState('vote');
  const [refreshKey, setRefreshKey] = useState(0);
  const location = useLocation();

  const handleVoteComplete = () => {
    setActiveTab('statistics');
    setRefreshKey(prev => prev + 1);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'vote':
        return <VoteForm onVoteComplete={handleVoteComplete} />;
      case 'statistics':
        return <VotingStatistics key={refreshKey} />;
      case 'history':
        return <VotesList key={refreshKey} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Sistema de Votación</h1>
      
      <div className="mb-6 border-b">
        <nav className="flex space-x-4">
          <button
            onClick={() => setActiveTab('vote')}
            className={`py-2 px-4 transition-colors
              ${activeTab === 'vote'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'}
            `}
          >
            Emitir Voto
          </button>
          <button
            onClick={() => setActiveTab('statistics')}
            className={`py-2 px-4 transition-colors
              ${activeTab === 'statistics'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'}
            `}
          >
            Estadísticas
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`py-2 px-4 transition-colors
              ${activeTab === 'history'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'}
            `}
          >
            Historial
          </button>
        </nav>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default VotePage;