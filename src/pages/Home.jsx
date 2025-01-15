import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Bienvenido al Sistema de Votación</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-lg mb-4">
          Hola {user?.name}, bienvenido al sistema de votación electrónica.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded">
            <h2 className="font-bold text-xl mb-2">Candidatos</h2>
            <p>Revisa la lista de candidatos y sus propuestas.</p>
          </div>
          <div className="bg-green-50 p-4 rounded">
            <h2 className="font-bold text-xl mb-2">Votar</h2>
            <p>Emite tu voto de manera segura y confidencial.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;