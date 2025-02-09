import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from "../../context/ApiContext";

interface User {
  id: string;
  first_name: string;
  last_name: string;
  driver?: {
    id: string;
    fk_status?: {
      id: number;
    };
  };
}

interface Motorcycle {
  id: string;
  serial_number: string;
  fk_model: {
    label: string;
  };
}

const DriverFormPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fk_user: '',
    license_link: '',
    experience: '',
    motorcycle_id: '',
  });

  const [users, setUsers] = useState<User[]>([]);
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const api = useApi();

  useEffect(() => {
    // Fetch users from the API
    api.get('user', { credentials: 'include' })
      .then((response) => {
        const filteredUsers = response.data.filter((user: any) => 
          user.driver === null || (user.driver && user.driver.fk_status === null) || (user.driver && user.driver.fk_status && user.driver.fk_status.id === 4)
        );
        setUsers(filteredUsers);
      })
      .catch(console.error);

    // Fetch motorcycles from the API
    api.get('moto', { credentials: 'include' })
      .then((response) => {
        const filteredMotorcycles = response.data.filter((motorcycle: any) => motorcycle.fk_owner === null);
        setMotorcycles(filteredMotorcycles);
      })
      .catch(console.error);
  }, [api]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      const fileName = e.target.files[0].name;
      const licenseLink = `/licenses/${fileName}`;
      setFormData({ ...formData, license_link: licenseLink });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const existingUser = users.find(user => user.id === formData.fk_user);
      if (existingUser && existingUser.driver) {
        console.log("ce scénario est pour la mise à jour d'un conducteur existant");
        // Update existing driver record
        const dataToSend = {
          license_link: formData.license_link,
          experience: formData.experience,
          fk_status: { id: 1 } // Set status to 1 when re-adding a driver
        };
        const response = await api.patch(`driver/${existingUser.driver.fk_user}`, dataToSend);
        if (response.status === 200) {
          console.log('Conducteur mis à jour :', dataToSend);
          if (formData.motorcycle_id) {
            await api.patch(`moto/${formData.motorcycle_id}`, { fk_owner: { id: formData.fk_user } });
            console.log('Moto liée au conducteur :', formData.motorcycle_id);
          }
          navigate('/drivers'); // Return to the list after submission
        } else {
          const errorText = await response.data;
          console.error('Erreur lors de la mise à jour du conducteur:', errorText);
          alert('Erreur lors de la mise à jour du conducteur.');
        }
      } else {
        console.log("ce scénario est pour l'ajout d'un nouveau conducteur");
        // Create new driver record
        const dataToSend = {
          fk_user: formData.fk_user,
          license_link: formData.license_link,
          experience: formData.experience,
          fk_status: { id: 1 } // Set status to 1 when creating a new driver
        };
        const response = await api.post('driver', dataToSend);
        if (response.status === 201) {
          console.log('Nouveau conducteur ajouté :', dataToSend);
          if (formData.motorcycle_id) {
            await api.patch(`moto/${formData.motorcycle_id}`, { fk_owner: { id: formData.fk_user } });
            console.log('Moto liée au conducteur :', formData.motorcycle_id);
          }
          navigate('/drivers'); // Return to the list after submission
        } else {
          const errorText = await response.data;
          console.error('Erreur lors de l\'ajout du conducteur:', errorText);
          alert('Erreur lors de l\'ajout du conducteur.');
        }
      }
    } catch (error) {
      console.error('Erreur :', error);
      alert('Erreur lors de l\'ajout du conducteur.');
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Ajouter un conducteur</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md rounded-lg p-4">
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
            {motorcycles.map((motorcycle) => (
              <option key={motorcycle.id} value={motorcycle.id}>
                {motorcycle.serial_number} - {motorcycle.fk_model.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Ajouter votre permis</label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          {selectedFile && (
            <p className="text-sm text-gray-600 mb-2">{selectedFile.name}</p>
          )}
          <button
            type="button"
            onClick={triggerFileInput}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 mt-2"
          >
            Upload File
          </button>
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500">
          Ajouter le conducteur
        </button>
      </form>
    </div>
  );
};

export default DriverFormPage;