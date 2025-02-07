import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  // Simulate fetching users data
  useEffect(() => {
    const fetchUsers = () => {
      const simulatedData: User[] = [
        {
          id: 1,
          name: "John Doe",
          email: "john.doe@example.com",
          role: "Admin",
        },
        {
          id: 2,
          name: "Jane Doe",
          email: "jane.doe@example.com",
          role: "User",
        },
      ];
      setUsers(simulatedData);
    };
    fetchUsers();
  }, []);

  // Handle delete user
  const handleDelete = (id: number) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
      setUsers(users.filter((user) => user.id !== id)); // Delete locally
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

  // Handle delete all users
  const handleDeleteAll = () => {
    if (window.confirm("Voulez-vous vraiment supprimer tous les utilisateurs ?")) {
      setUsers([]); // Delete all locally
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Utilisateurs</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
        >
          Ajouter un utilisateur
        </button>
        <button
          onClick={handleDeleteAll}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 ml-2"
        >
          Supprimer tous les utilisateurs
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-2xl font-bold mb-4">Liste des utilisateurs</h2>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Nom</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Rôle</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.role}</td>
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