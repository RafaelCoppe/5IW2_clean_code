import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApi } from "../../context/ApiContext";

interface User {
  id: string;
  first_name: string;
  last_name: string;
}

const DriverEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Récupérer l'ID dans l'URL
  const navigate = useNavigate();
  const api = useApi();

  const [formData, setFormData] = useState({
    fk_user: '',
    license_link: '',
    experience: '',
  });

  const [users, setUsers] = useState<User[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users from the API
        const userResponse = await api.get('user', { credentials: 'include' });
        const filteredUsers = userResponse.data.filter((user: any) => user.driver !== null);
        setUsers(filteredUsers);

        if (id) {
          const driverData = filteredUsers.find((user: any) => user.driver.fk_user === id);

          console.log('Données du conducteur :', driverData);
          if (driverData) {
            setFormData({
              fk_user: driverData.id,
              license_link: driverData.driver.license_link,
              experience: driverData.driver.experience,
            });
          }
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };

    fetchData();
  }, [api, id]);

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
      const dataToSend = {
        fk_user: formData.fk_user,
        license_link: formData.license_link,
        experience: formData.experience,
      };

      if (id) {
        await api.patch(`driver/${id}`, dataToSend);
        console.log("Updated driver:", dataToSend);
      } else {
        await api.post("driver", dataToSend);
        console.log("Added driver:", dataToSend);
      }

      navigate("/drivers");
    } catch (error) {
      console.error("Erreur lors de la soumission du conducteur:", error);
      alert("Erreur lors de la soumission du conducteur.");
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">
        {id ? "Modifier le conducteur" : "Ajouter un conducteur"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
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
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-500"
        >
          {id ? "Mettre à jour" : "Ajouter"}
        </button>
      </form>
    </div>
  );
};

export default DriverEditPage;