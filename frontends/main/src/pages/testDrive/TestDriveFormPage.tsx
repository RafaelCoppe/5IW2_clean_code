import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from "../../context/ApiContext";

interface Driver {
  id: string;
  first_name: string;
  last_name: string;
}

interface Motorcycle {
  id: string;
  serial_number: string;
}

const TestDriveFormPage: React.FC = () => {
  const [formData, setFormData] = useState({
    driver_id: '',
    motorcycle_id: '',
    date: '',
    duration: '',
  });

  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const navigate = useNavigate();
  const api = useApi();

  useEffect(() => {
    // Fetch drivers from the API
    api.get('user', { credentials: 'include' })
      .then((response) => {
        const filteredUsers = response.data.filter((user: any) => user.driver !== null);
        setDrivers(filteredUsers);
      })
      .catch(console.error);

    // Fetch motorcycles from the API
    api.get('moto', { credentials: 'include' })
      .then((response) => {
        setMotorcycles(response.data);
      })
      .catch(console.error);
  }, [api]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dataToSend = {
        driver_id: formData.driver_id,
        motorcycle_id: formData.motorcycle_id,
        date: formData.date,
        duration: parseInt(formData.duration, 10), // Convert duration to number
      };

      const response = await api.post('test_drive', dataToSend);
      if (response.status === 201) {
        console.log('Nouveau test de conduite ajouté :', dataToSend);
        navigate('/test-drives'); // Return to the list after submission
      } else {
        const errorText = await response.data;
        console.error('Erreur lors de l\'ajout du test de conduite:', errorText);
        alert('Erreur lors de l\'ajout du test de conduite.');
      }
    } catch (error) {
      console.error('Erreur :', error);
      alert('Erreur lors de l\'ajout du test de conduite.');
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Ajouter un test de conduite</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md rounded-lg p-4">
        <div>
          <label className="block text-sm font-medium mb-2">Conducteur</label>
          <select
            value={formData.driver_id}
            onChange={(e) => setFormData({ ...formData, driver_id: e.target.value })}
            className="w-full border p-2 rounded-md"
            required
          >
            <option value="">Sélectionnez un conducteur</option>
            {drivers.map((driver) => (
              <option key={driver.id} value={driver.id}>
                {driver.first_name} {driver.last_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Moto</label>
          <select
            value={formData.motorcycle_id}
            onChange={(e) => setFormData({ ...formData, motorcycle_id: e.target.value })}
            className="w-full border p-2 rounded-md"
            required
          >
            <option value="">Sélectionnez une moto</option>
            {motorcycles.map((motorcycle) => (
              <option key={motorcycle.id} value={motorcycle.id}>
                {motorcycle.serial_number}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Durée (en minutes)</label>
          <input
            type="number"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-500">
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default TestDriveFormPage;