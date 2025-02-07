import React, { useState } from 'react';

interface TestDriveFormProps {
  onTestDriveAdded: (newTestDrive: any) => void; // Callback to inform the list that a test drive has been added
}

const TestDriveForm: React.FC<TestDriveFormProps> = ({ onTestDriveAdded }) => {
  const [formData, setFormData] = useState({
    car: '',
    date: '',
    time: '',
    customer: '',
    status: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/test-drives', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newTestDrive = await response.json();
        onTestDriveAdded(newTestDrive); // Call the callback to update the list
        setFormData({
          car: '',
          date: '',
          time: '',
          customer: '',
          status: '',
        }); // Reset the form
      } else {
        alert('Erreur lors de l\'ajout du test de conduite.');
      }
    } catch (error) {
      console.error('Erreur :', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-4 bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Ajouter un test de conduite</h2>
      <div>
        <label className="block text-sm font-medium mb-2">Voiture</label>
        <input
          type="text"
          value={formData.car}
          onChange={(e) => setFormData({ ...formData, car: e.target.value })}
          className="w-full border p-2 rounded-md"
          required
        />
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
        <label className="block text-sm font-medium mb-2">Heure</label>
        <input
          type="time"
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          className="w-full border p-2 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Client</label>
        <input
          type="text"
          value={formData.customer}
          onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
          className="w-full border p-2 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Statut</label>
        <input
          type="text"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
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

export default TestDriveForm;