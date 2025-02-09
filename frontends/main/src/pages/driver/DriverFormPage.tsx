import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from "../../context/ApiContext";

interface User {
  id: string;
  first_name: string;
  last_name: string;
}

const DriverFormPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fk_user: '',
    license_link: '',
    experience: '',
  });

  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const api = useApi();

  useEffect(() => {
    // Fetch users from the API
    api.get('user', { credentials: 'include' })
      .then((response) => {
        const filteredUsers = response.data.filter((user: any) => user.driver === null);
        setUsers(filteredUsers);
      })
      .catch(console.error);
  }, [api]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dataToSend = {
        fk_user: formData.fk_user,
        license_link: formData.license_link,
        experience: formData.experience,
      };

      const response = await api.post('driver', dataToSend);
      if (response.status === 201) {
        console.log('Nouveau conducteur ajouté :', dataToSend);
        navigate('/drivers'); // Return to the list after submission
      } else {
        const errorText = await response.data;
        console.error('Erreur lors de l\'ajout du conducteur:', errorText);
        alert('Erreur lors de l\'ajout du conducteur.');
      }
    } catch (error) {
      console.error('Erreur :', error);
      alert('Erreur lors de l\'ajout du conducteur.');
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
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-500">
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default DriverFormPage;