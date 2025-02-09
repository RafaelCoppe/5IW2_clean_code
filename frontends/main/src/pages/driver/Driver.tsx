import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from "../../context/ApiContext";

interface Driver {
  id: string;
  fk_user: {
    first_name: string;
    last_name: string;
    id: string;
  };
  license_link: string;
  experience: string;
  fk_status: {
    id: number;
    name: string;
  };
}

export const Driver: React.FC = () => {
  const api = useApi();
  const navigate = useNavigate();
  const [drivers, setDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    api.get("user", { credentials: 'include' })
      .then((response) => {
        const filteredUsers = response.data.filter((user: any) => 
          user.driver !== null &&
          user.driver.fk_status &&
          user.driver.fk_status.id === 1
        );
        setDrivers(filteredUsers.map((user: any) => ({
          id: user.driver.id,
          fk_user: {
            first_name: user.first_name,
            last_name: user.last_name,
            id: user.id,
          },
          license_link: user.driver.license_link,
          experience: user.driver.experience,
          fk_status: user.driver.fk_status,
        })));
      })
      .catch(console.error);
  }, [api]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce conducteur ?")) {
      try {
        const dataToSend = {
          fk_status: { id: 4 }
        };
        const response = await api.patch(`driver/${id}`, dataToSend);
        if (response.status === 200) {
          setDrivers(drivers.filter((driver) => driver.id !== id)); // Update the state immediately
          window.location.reload();
          console.log('Conducteur supprimé :', id);
        } else {
          const errorText = await response.data;
          console.error('Erreur lors de la suppression du conducteur:', errorText);
          alert('Erreur lors de la suppression du conducteur.');
        }
      } catch (error) {
        console.error('Erreur :', error);
        if (error) {
          console.error('Response data:', error);
        }
        alert('Erreur lors de la suppression du conducteur.');
      }
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/drivers/edit/${id}`);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Gestion des conducteurs</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate('/drivers/add')}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500"
        >
          Ajouter un conducteur
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-2xl font-bold mb-4">Liste des conducteurs</h2>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Nom</th>
              <th className="border px-4 py-2">Lien du permis</th>
              <th className="border px-4 py-2">Expérience</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <tr key={driver.fk_user.id}>
                <td className="border px-4 py-2">{driver.fk_user.last_name.toUpperCase()} {driver.fk_user.first_name}</td>
                <td className="border px-4 py-2">{driver.license_link}</td>
                <td className="border px-4 py-2">{driver.experience}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEdit(driver.fk_user.id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded mr-2 hover:bg-blue-500"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(driver.fk_user.id)}
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

export default Driver;