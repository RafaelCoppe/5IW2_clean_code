import React from "react";
import { Link } from "react-router-dom";

interface SidebarProps {
  user: object; // Prop pour savoir si l'utilisateur est admin
}

const handleDisconnect = () => {
  localStorage.removeItem("token");
  window.location.reload();
};

export const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const company_type = user.fk_company.type;

  return (
    <aside className="fixed h-screen w-64 bg-gray-900 text-white flex flex-col">
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
          {}
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
              to="/spare-parts/company"
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
          {user.is_admin && (
            <li>
              <Link
                to="/users"
                className="block p-2 rounded-lg hover:bg-gray-700"
              >
                Gestion des utilisateurs
              </Link>
            </li>
          )}
          {company_type == "Concessionnaire" && (
            <li>
              <Link
                to="/drivers"
                className="block p-2 rounded-lg hover:bg-gray-700"
              >
                Gestion des conducteurs
              </Link>
            </li>
          )}
          <li>
            <Link
              to="/companies"
              className="block p-2 rounded-lg hover:bg-gray-700"
            >
              Gestion des entreprises
            </Link>
          </li>
          <li>
            <Link
              to="/notifications"
              className="block p-2 rounded-lg hover:bg-gray-700"
            >
              Notifications
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4 mt-auto">
        <button
          className="w-full p-2 bg-red-600 rounded-lg hover:bg-red-500"
          onClick={() => handleDisconnect()}
        >
          Déconnexion
        </button>
      </div>
    </aside>
  );
};
