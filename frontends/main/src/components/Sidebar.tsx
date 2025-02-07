import React from "react";
import { Link } from "react-router-dom";

interface SidebarProps {
  isAdmin: boolean; // Prop pour savoir si l'utilisateur est admin
}

export const Sidebar: React.FC<SidebarProps> = ({ isAdmin }) => {
  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-4 text-xl font-bold">Triumph Fleet</div>
      <nav className="flex-1 mt-4">
        <ul className="space-y-2">
          <li>
            <Link
              to="/dashboard"
              className="block p-2 rounded-lg hover:bg-gray-700"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/motorcycles"
              className="block p-2 rounded-lg hover:bg-gray-700"
            >
              Gestion des motos
            </Link>
          </li>
          <li>
            <Link
              to="/maintenances"
              className="block p-2 rounded-lg hover:bg-gray-700"
            >
              Gestion des entretiens
            </Link>
          </li>
          <li>
            <Link
              to="/spare-parts"
              className="block p-2 rounded-lg hover:bg-gray-700"
            >
              Gestion des pièces
            </Link>
          </li>
          <li>
            <Link
              to="/test-drives"
              className="block p-2 rounded-lg hover:bg-gray-700"
            >
              Gestion des essais
            </Link>
          </li>
          {isAdmin && (
            <li>
              <Link
                to="/users"
                className="block p-2 rounded-lg hover:bg-gray-700"
              >
                Gestion des utilisateurs
              </Link>
            </li>
          )}
          <li>
            <Link
              to="/notifications"
              className="block p-2 rounded-lg hover:bg-gray-700"
            >
              Notifications
            </Link>
          </li>
          <li>
            <Link
              to="/parametres"
              className="block p-2 rounded-lg hover:bg-gray-700"
            >
              Paramètres
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4 mt-auto">
        <button className="w-full p-2 bg-red-600 rounded-lg hover:bg-red-500">
          Déconnexion
        </button>
      </div>
    </aside>
  );
};
