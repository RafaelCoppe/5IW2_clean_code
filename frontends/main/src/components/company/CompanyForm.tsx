import React, { useState } from 'react';

interface CompanyFormProps {
  onCompanyAdded: (newCompany: any) => void; // Callback to inform the list that a company has been added
}

const CompanyForm: React.FC<CompanyFormProps> = ({ onCompanyAdded }) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newCompany = await response.json();
        onCompanyAdded(newCompany); // Call the callback to update the list
        setFormData({
          name: '',
          type: '',
          mail: '',
          phone: '',
          contact_first_name: '',
          contact_last_name: '',
          contact_mail: '',
          contact_phone: '',
        }); // Reset the form
      } else {
        alert('Erreur lors de l\'ajout de l\'entreprise.');
      }
    } catch (error) {
      console.error('Erreur :', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-4 bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Ajouter une entreprise</h2>
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
        Ajouter
      </button>
    </form>
  );
};

export default CompanyForm;