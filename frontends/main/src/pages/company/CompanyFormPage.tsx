import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from "../../context/ApiContext";

interface CompanyType {
  id: number;
  name: string;
}

const CompanyFormPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    fk_type: { id: '', name: '' },
    number: '',
    address: '',
    city: '',
    citycode: '',
    contact_first_name: '',
    contact_last_name: '',
    contact_mail: '',
    contact_phone: '',
  });

  const [companyTypes, setCompanyTypes] = useState<CompanyType[]>([]);
  const navigate = useNavigate();
  const api = useApi();

  useEffect(() => {
    // Fetch company types from the API
    api.get('company_type', { credentials: 'include' })
      .then((response) => setCompanyTypes(response.data))
      .catch(console.error);
  }, [api]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        fk_type: {
          id: parseInt(formData.fk_type.id, 10),
          name: formData.fk_type.name,
        },
      };
      console.log('Submitting form data:', JSON.stringify(dataToSend, null, 2)); // Log form data for debugging
      const response = await api.post('company', dataToSend);
      if (response.status === 201) {
        console.log('Nouvelle entreprise ajoutée :', dataToSend);
        navigate('/companies'); // Return to the list after submission
      } else {
        const errorText = response.data;
        console.error('Erreur lors de l\'ajout de l\'entreprise:', errorText);
        alert('Erreur lors de l\'ajout de l\'entreprise.');
      }
    } catch (error) {
      console.error('Erreur :', error);
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Ajouter une entreprise</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md rounded-lg p-4">
        <div>
          <label className="block text-sm font-medium mb-2">Nom</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Type</label>
          <select
            value={formData.fk_type.id}
            onChange={(e) => {
              const selectedType = companyTypes.find(type => type.id === parseInt(e.target.value, 10));
              setFormData({ ...formData, fk_type: { id: e.target.value, name: selectedType ? selectedType.name : '' } });
            }}
            className="w-full border p-2 rounded-md"
            required
          >
            <option value="">Sélectionnez un type</option>
            {companyTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Numéro</label>
          <input
            type="text"
            value={formData.number}
            onChange={(e) => setFormData({ ...formData, number: e.target.value })}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Adresse</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Ville</label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Code postal</label>
          <input
            type="text"
            value={formData.citycode}
            onChange={(e) => setFormData({ ...formData, citycode: e.target.value })}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Prénom du contact</label>
          <input
            type="text"
            value={formData.contact_first_name}
            onChange={(e) => setFormData({ ...formData, contact_first_name: e.target.value })}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Nom du contact</label>
          <input
            type="text"
            value={formData.contact_last_name}
            onChange={(e) => setFormData({ ...formData, contact_last_name: e.target.value })}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email du contact</label>
          <input
            type="email"
            value={formData.contact_mail}
            onChange={(e) => setFormData({ ...formData, contact_mail: e.target.value })}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Téléphone du contact</label>
          <input
            type="text"
            value={formData.contact_phone}
            onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
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

export default CompanyFormPage;