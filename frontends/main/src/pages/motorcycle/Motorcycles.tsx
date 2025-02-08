import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../context/ApiContext";

interface Motorcycle {
    id: number;
    serial_number: string;
    fk_model: {
      label: string;
    } | null;
    fk_dealer: {
      name: string;
    } | null;
    fk_owner: {
      first_name: string;
      last_name: string;
    } | null;
  }

export const Motorcycles: React.FC<{ userRole: string }> = ({ userRole }) => {
  const api = useApi();
  const navigate = useNavigate();
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);

  useEffect(() => {
    api.get("moto", { credentials: 'include' })
        .then((data) => setMotorcycles(data))
        .catch(console.error);
  }, [api]);

  const handleDelete = (id: number) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
      setMotorcycles(motorcycles.filter((moto) => moto.id !== id)); // Delete locally
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/motorcycles/edit/${id}`);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Gestion des motos</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate('/motorcycles/add')}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500"
        >
          Ajouter une moto
        </button>
        <button
          onClick={() => setMotorcycles([])}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 ml-2"
        >
          Supprimer toutes les motos
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-2xl font-bold mb-4">Liste des motos</h2>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Modèle</th>
              <th className="border px-4 py-2">Numéro de série</th>
              <th className="border px-4 py-2">Concessionnaire</th>
              <th className="border px-4 py-2">Propriétaire</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {motorcycles.map((moto) => (
              <tr key={moto.id}>
                <td className="border px-4 py-2">{moto.fk_model ? moto.fk_model.label : ''}</td>
                <td className="border px-4 py-2">{moto.serial_number}</td>
                <td className="border px-4 py-2">{moto.fk_dealer ? moto.fk_dealer.name : ''}</td>
                <td className="border px-4 py-2">{moto.fk_owner ? (moto.fk_owner.last_name.toUpperCase() + ' ' + moto.fk_owner.first_name) : ''}</td>
                <td className="border px-4 py-2">
                <button
                    onClick={() => handleEdit(moto.id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded mr-2 hover:bg-blue-500"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(moto.id)}
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