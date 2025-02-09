import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApi } from "../../context/ApiContext";

interface User {
  id: string;
  first_name: string;
  last_name: string;
}

interface Motorcycle {
  id: string;
  serial_number: string;
}

const DriverEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Récupérer l'ID dans l'URL
  const navigate = useNavigate();
  const api = useApi();

  const [formData, setFormData] = useState({
    fk_user: '',
    license_link: '',
    experience: '',
    motorcycle_id: '',
  });

  const [users, setUsers] = useState<User[]>([]);
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users from the API
        const userResponse = await api.get('user', { credentials: 'include' });
        const filteredUsers = userResponse.data.filter((user: any) => user.driver !== null);
        setUsers(filteredUsers);

        // Fetch motorcycles from the API
        const motoResponse = await api.get('moto', { credentials: 'include' });
        setMotorcycles(motoResponse.data);

        if (id) {
          const driverData = filteredUsers.find((user: any) => user.driver.fk_user === id);

          console.log('Données du conducteur :', driverData);
          if (driverData) {
            setFormData({
              fk_user: driverData.id,
              license_link: driverData.driver.license_link,
              experience: driverData.driver.experience,
              motorcycle_id: driverData.driver.motorcycle_id || '',
            });
          }
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };

    fetchData();
  }, [api, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dataToSend = {
        fk_user: formData.fk_user,
        license_link: formData.license_link,
        experience: formData.experience,
      };

      if (id) {
        await api.patch(`driver/${id}`, dataToSend);
        console.log("Updated driver:", dataToSend);
      } else {
        await api.post("driver", dataToSend);
        console.log("Added driver:", dataToSend);
      }

      if (formData.motorcycle_id) {
        await api.put(`moto/${formData.motorcycle_id}`, { fk_owner: { id: formData.fk_user } });
        console.log('Moto liée au conducteur :', formData.motorcycle_id);
      }

      navigate("/drivers");
    } catch (error) {
      console.error("Erreur lors de la soumission du conducteur:", error);
      alert("Erreur lors de la soumission du conducteur.");
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">
        {id ? "Modifier le conducteur" : "Ajouter un conducteur"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Utilisateur</label>
          <select
            value={formData.fk_user}
            onChange={(e) => setFormData({ ...formData, fk_user: e.target.value })}
            className="w-full border p-2 rounded-md"
            required
          >
            <option value="">Sélectionnez un utilisateur</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.first_name} {user.last_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Lien du permis</label>
          <input
            type="text"
            value={formData.license_link}
            onChange={(e) => setFormData({ ...formData, license_link: e.target.value })}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Expérience</label>
          <textarea
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Moto (optionnel)</label>
          <select
            value={formData.motorcycle_id}
            onChange={(e) => setFormData({ ...formData, motorcycle_id: e.target.value })}
            className="w-full border p-2 rounded-md"
          >
            <option value="">Sélectionnez une moto</option>
            {motorcycles.map((moto) => (
              <option key={moto.id} value={moto.id}>
                {moto.serial_number}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-500"
        >
          {id ? "Mettre à jour" : "Ajouter"}
        </button>
      </form>
    </div>
  );
};

export default DriverEditPage;