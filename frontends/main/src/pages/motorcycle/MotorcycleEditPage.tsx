import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

const AddEditMotorcycle: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Récupérer l'ID dans l'URL
  const navigate = useNavigate();
  const api = useApi();

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

  const fetchMotorcycleById = async (motoId: string) => {
    try {
      const response = await api.get(`moto/${motoId}`, { credentials: 'include' });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération de la moto:", error);
      return null;
    }
  };

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

    if (id) {
      fetchMotorcycleById(id).then((data) => {
        if (data) {
          setFormData({
            serial_number: data.serial_number,
            price: data.price,
            color: data.color,
            capacity: data.capacity,
            year: data.year,
            warranty_end: data.warranty_end,
            next_service_date: data.next_service_date,
            next_service_distance: data.next_service_distance,
            fk_model: data.fk_model.id,
            fk_dealer: data.fk_dealer.id,
            fk_owner: data.fk_owner ? data.fk_owner.id : '',
          });
        }
      });
    }
  }, [api, id]);

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

      if (id) {
        await api.patch(`moto/${id}`, dataToSend);
        console.log("Updated motorcycle:", dataToSend);
      } else {
        await api.post("moto", dataToSend);
        console.log("Added motorcycle:", dataToSend);
      }
      navigate("/motorcycles");
    } catch (error) {
      console.error("Erreur lors de la soumission de la moto:", error);
      alert("Erreur lors de la soumission de la moto.");
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">
        {id ? "Edit Motorcycle" : "Add Motorcycle"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
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
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-500"
        >
          {id ? "Update" : "Save"}
        </button>
      </form>
    </div>
  );
};

export default AddEditMotorcycle;