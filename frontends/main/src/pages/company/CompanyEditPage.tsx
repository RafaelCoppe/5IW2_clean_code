import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CompanyEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    mail: '',
    phone: '',
    contact_first_name: '',
    contact_last_name: '',
    contact_mail: '',
    contact_phone: '',
  });

  // Load existing company data (simulation)
  useEffect(() => {
    // Simulate existing company data
    const simulatedCompany = {
      id: id,
      name: 'Company A',
      type: 'Type A',
      mail: 'companya@example.com',
      phone: '1234567890',
      contact_first_name: 'John',
      contact_last_name: 'Doe',
      contact_mail: 'john.doe@example.com',
      contact_phone: '0987654321',
    };
    setFormData(simulatedCompany);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Modifications sauvegardées :', formData);
    navigate('/companies'); // Redirect to the list after saving
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Modifier une entreprise</h1>
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
          <input
            type="text"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={formData.mail}
            onChange={(e) => setFormData({ ...formData, mail: e.target.value })}
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
          Sauvegarder
        </button>
      </form>
    </div>
  );
};

export default CompanyEditPage;