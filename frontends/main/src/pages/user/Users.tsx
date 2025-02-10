import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useApi } from "../../context/ApiContext";

interface User {
  id: number;
  last_name: string;
  first_name: string;
  email: string;
  role: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const api = useApi();

  useEffect(() => {
    api.get("user", { credentials: 'include' })
        .then((response) => setUsers(response.data))
        .catch(console.error);
  }, [api]);

  // Handle delete user
  const handleDelete = async (id: number) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
      try {
        const response = await api.delete(`user/${id}`);
        if (response.status === 200) {
          setUsers(users.filter((user) => user.id !== id)); // Delete locally
          console.log('Utilisateur supprimé :', id);
        } else {
          const errorText = await response.data;
          console.error('Erreur lors de la suppression de l\'utilisateur:', errorText);
          alert('Erreur lors de la suppression de l\'utilisateur.');
        }
      } catch (error) {
        console.error('Erreur :', error);
        alert('Erreur lors de la suppression de l\'utilisateur.');
      }
    }
  };

  // Handle edit user
  const handleEdit = (id: number) => {
    navigate(`/users/edit/${id}`);
  };

  // Handle add user
  const handleAdd = () => {
    navigate(`/users/add`);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Utilisateurs</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500"
        >
          Ajouter un utilisateur
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-2xl font-bold mb-4">Liste des utilisateurs</h2>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Nom</th>
              <th className="border px-4 py-2">Prénom</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.last_name}</td>
                <td className="border px-4 py-2">{user.first_name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEdit(user.id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded mr-2 hover:bg-blue-500"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;