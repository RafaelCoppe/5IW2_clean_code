import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from "../../context/ApiContext";

interface Company {
  id: string;
  name: string;
}

const UserFormPage: React.FC = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    fk_company: '',
    is_admin: 'false',
  });

  const [companies, setCompanies] = useState<Company[]>([]);
  const navigate = useNavigate();
  const api = useApi();

  useEffect(() => {
    // Fetch companies from the API
    api.get('company', { credentials: 'include' })
      .then((response) => setCompanies(response.data))
      .catch(console.error);
  }, [api]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('user', formData);
      if (response.status === 201) {
        console.log('Nouvel utilisateur ajouté :', formData);
        navigate('/users'); // Return to the list after submission
      } else {
        const errorText = await response.data;
        console.error('Erreur lors de l\'ajout de l\'utilisateur:', errorText);
        alert('Erreur lors de l\'ajout de l\'utilisateur.');
      }
    } catch (error) {
      console.error('Erreur :', error);
      alert('Erreur lors de l\'ajout de l\'utilisateur.');
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Ajouter un utilisateur</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md rounded-lg p-4">
        <div>
          <label className="block text-sm font-medium mb-2">Prénom</label>
          <input
            type="text"
            value={formData.first_name}
            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Nom</label>
          <input
            type="text"
            value={formData.last_name}
            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Téléphone</label>
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Mot de passe</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Entreprise</label>
          <select
            value={formData.fk_company}
            onChange={(e) => setFormData({ ...formData, fk_company: e.target.value })}
            className="w-full border p-2 rounded-md"
          >
            <option value="">Sélectionnez une entreprise</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Admin</label>
          <select
            value={formData.is_admin}
            onChange={(e) => setFormData({ ...formData, is_admin: e.target.value })}
            className="w-full border p-2 rounded-md"
            required
          >
            <option value="false">Non</option>
            <option value="true">Oui</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-500">
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default UserFormPage;