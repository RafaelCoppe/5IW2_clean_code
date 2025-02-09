import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useApi } from "../../context/ApiContext";

interface TestDrive {
  id: number;
  client_name: string;
  vehicle_model: string;
  date: string;
  status: string;
}

const TestDrives: React.FC = () => {
  const [testDrives, setTestDrives] = useState<TestDrive[]>([]);
  const navigate = useNavigate();
  const api = useApi();

  useEffect(() => {
    api.get("testdrive", { credentials: 'include' })
      .then((response) => setTestDrives(response.data))
      .catch(console.error);
  }, [api]);

  const handleDelete = async (id: number) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce Test Drive ?")) {
      try {
        const response = await api.delete(`testdrive/${id}`);
        if (response.status === 200) {
          setTestDrives(testDrives.filter((td) => td.id !== id));
          console.log('Test Drive supprimé :', id);
        } else {
          console.error('Erreur lors de la suppression :', response.data);
          alert('Erreur lors de la suppression.');
        }
      } catch (error) {
        console.error('Erreur :', error);
        alert('Erreur lors de la suppression.');
      }
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/testdrives/edit/${id}`);
  };

  const handleAdd = () => {
    navigate(`/testdrives/add`);
  };

  const handleDeleteAll = async () => {
    if (window.confirm("Voulez-vous vraiment supprimer tous les Test Drives ?")) {
      try {
        const response = await api.delete('testdrive');
        if (response.status === 200) {
          setTestDrives([]);
          console.log('Tous les Test Drives ont été supprimés');
        } else {
          console.error('Erreur lors de la suppression :', response.data);
          alert('Erreur lors de la suppression.');
        }
      } catch (error) {
        console.error('Erreur :', error);
        alert('Erreur lors de la suppression.');
      }
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Test Drives</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500"
        >
          Ajouter un Test Drive
        </button>
        <button
          onClick={handleDeleteAll}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 ml-2"
        >
          Supprimer tous les Test Drives
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-2xl font-bold mb-4">Liste des Test Drives</h2>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Client</th>
              <th className="border px-4 py-2">Véhicule</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Statut</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {testDrives.map((td) => (
              <tr key={td.id}>
                <td className="border px-4 py-2">{td.client_name}</td>
                <td className="border px-4 py-2">{td.vehicle_model}</td>
                <td className="border px-4 py-2">{td.date}</td>
                <td className="border px-4 py-2">{td.status}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEdit(td.id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded mr-2 hover:bg-blue-500"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(td.id)}
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

export default TestDrives;
