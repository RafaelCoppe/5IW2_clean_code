import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from "../../context/ApiContext";

interface Model {
  id: number;
  label: string;
}

interface Dealer {
  id: string;
  name: string;
}

interface Owner {
  id: string;
  first_name: string;
  last_name: string;
}

const MotorcycleFormPage: React.FC = () => {
  const [formData, setFormData] = useState({
    serial_number: '',
    price: '',
    color: '',
    capacity: '',
    year: '',
    warranty_end: '',
    next_service_date: '',
    next_service_distance: '',
    fk_model: '',
    fk_dealer: '',
    fk_owner: '',
  });

  const [models, setModels] = useState<Model[]>([]);
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [owners, setOwners] = useState<Owner[]>([]);
  const navigate = useNavigate();
  const api = useApi();

  useEffect(() => {
    // Fetch models from the API
    api.get('moto_model', { credentials: 'include' })
      .then((response) => setModels(response.data))
      .catch(console.error);

    // Fetch dealers from the API
    api.get('company', { credentials: 'include' })
      .then((response) => {
        const filteredDealers = response.data.filter((company: any) => company.fk_type.id === 1);
        setDealers(filteredDealers);
      })
      .catch(console.error);

    // Fetch owners from the API
    api.get('user', { credentials: 'include' })
      .then((response) => {
        const filteredOwners = response.data.filter((user: any) => user.driver !== null);
        setOwners(filteredOwners);
      })
      .catch(console.error);
  }, [api]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dataToSend = {
        serial_number: formData.serial_number,
        price: parseFloat(formData.price),
        color: formData.color,
        capacity: parseInt(formData.capacity, 10),
        year: parseInt(formData.year, 10),
        warranty_end: formData.warranty_end,
        next_service_date: formData.next_service_date,
        next_service_distance: parseInt(formData.next_service_distance, 10),
        fk_model: { id: parseInt(formData.fk_model, 10) },
        fk_dealer: { id: formData.fk_dealer },
        fk_owner: formData.fk_owner ? { id: formData.fk_owner } : null,
      };
      console.log('Submitting form data:', JSON.stringify(dataToSend, null, 2)); // Log form data for debugging
      const response = await api.post('moto', dataToSend);
      if (response.status === 201) {
        console.log('Nouvelle moto ajoutée :', dataToSend);
        navigate('/motorcycles'); // Return to the list after submission
      } else {
        const errorText = await response.data;
        console.error('Erreur lors de l\'ajout de la moto:', errorText);
        alert('Erreur lors de l\'ajout de la moto.');
      }
    } catch (error) {
      console.error('Erreur :', error);
      alert('Erreur lors de l\'ajout de la moto.');
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Ajouter une moto</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md rounded-lg p-4">
        <div>
          <label className="block text-sm font-medium mb-2">Numéro de série</label>
          <input
            type="text"
            value={formData.serial_number}
            onChange={(e) => setFormData({ ...formData, serial_number: e.target.value })}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Prix</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Couleur</label>
          <input
            type="text"
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Capacité</label>
          <input
            type="number"
            value={formData.capacity}
            onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Année</label>
          <input
            type="number"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Fin de garantie</label>
          <input
            type="date"
            value={formData.warranty_end}
            onChange={(e) => setFormData({ ...formData, warranty_end: e.target.value })}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Date du prochain service</label>
          <input
            type="date"
            value={formData.next_service_date}
            onChange={(e) => setFormData({ ...formData, next_service_date: e.target.value })}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Distance du prochain service</label>
          <input
            type="number"
            value={formData.next_service_distance}
            onChange={(e) => setFormData({ ...formData, next_service_distance: e.target.value })}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Modèle</label>
          <select
            value={formData.fk_model}
            onChange={(e) => setFormData({ ...formData, fk_model: e.target.value })}
            className="w-full border p-2 rounded-md"
            required
          >
            <option value="">Sélectionnez un modèle</option>
            {models.map((model) => (
              <option key={model.id} value={model.id}>
                {model.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Concessionnaire</label>
          <select
            value={formData.fk_dealer}
            onChange={(e) => setFormData({ ...formData, fk_dealer: e.target.value })}
            className="w-full border p-2 rounded-md"
            required
          >
            <option value="">Sélectionnez un concessionnaire</option>
            {dealers.map((dealer) => (
              <option key={dealer.id} value={dealer.id}>
                {dealer.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Propriétaire (optionnel)</label>
          <select
            value={formData.fk_owner}
            onChange={(e) => setFormData({ ...formData, fk_owner: e.target.value })}
            className="w-full border p-2 rounded-md"
          >
            <option value="">Sélectionnez un propriétaire</option>
            {owners.map((owner) => (
              <option key={owner.id} value={owner.id}>
                {owner.first_name} {owner.last_name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-500">
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default MotorcycleFormPage;