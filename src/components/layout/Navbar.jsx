import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Sistema de Votación
        </Link>
        <div className="flex gap-4">
          {user ? (
            <>
              <Link to="/candidates" className="hover:text-gray-300">
                Candidatos
              </Link>
              <Link to="/vote" className="hover:text-gray-300">
                Votar
              </Link>
              <button onClick={logout} className="hover:text-gray-300">
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300">
                Iniciar Sesión
              </Link>
              <Link to="/register" className="hover:text-gray-300">
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;