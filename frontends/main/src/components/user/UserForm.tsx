import React, { useState } from 'react';

interface UserFormProps {
  onUserAdded: (newUser: any) => void; // Callback to inform the list that a user has been added
}

const UserForm: React.FC<UserFormProps> = ({ onUserAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newUser = await response.json();
        onUserAdded(newUser); // Call the callback to update the list
        setFormData({
          name: '',
          email: '',
          role: '',
        }); // Reset the form
      } else {
        alert('Erreur lors de l\'ajout de l\'utilisateur.');
      }
    } catch (error) {
      console.error('Erreur :', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-4 bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Ajouter un utilisateur</h2>
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
        <label className="block text-sm font-medium mb-2">Rôle</label>
        <input
          type="text"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
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

export default UserForm;