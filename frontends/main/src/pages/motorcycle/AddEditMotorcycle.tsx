import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddEditMotorcycle: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Récupérer l'ID dans l'URL
  const navigate = useNavigate();

  const [motorcycle, setMotorcycle] = useState({
    model: "",
    serialNumber: "",
    owner: "",
    color: "",
    capacity: 0,
    year: new Date().getFullYear(),
    lastService: "",
    nextService: "",
  });

  //   const fetchMotorcycleById = async (motoId: string) => {
  //     const response = await axios.get(`/api/motorcycles/${motoId}`);
  //     return response.data;
  //   };

  // Simuler une API pour récupérer les données d'une moto par ID
  const fetchMotorcycleById = async (motoId: string) => {
    // Simuler une réponse de l'API (remplacer avec un appel API réel)
    const data = {
      id: motoId,
      model: "Street Triple",
      serialNumber: "STR12345",
      owner: "Partner A",
      color: "Black",
      capacity: 765,
      year: 2023,
      lastService: "2024-12-01",
      nextService: "2025-12-01",
    };
    return data;
  };

  // Charger les données si on est en mode édition
  useEffect(() => {
    if (id) {
      fetchMotorcycleById(id).then((data) => setMotorcycle(data));
    }
  }, [id]);

  //   const handleSubmit = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     if (id) {
  //       await axios.put(`/api/motorcycles/${id}`, motorcycle);
  //     } else {
  //       await axios.post("/api/motorcycles", motorcycle);
  //     }
  //     navigate("/motorcycles");
  //   };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      console.log("Updated motorcycle:", motorcycle); // Appel API pour mise à jour
    } else {
      console.log("Added motorcycle:", motorcycle); // Appel API pour ajout
    }
    navigate("/motorcycles");
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">
        {id ? "Edit Motorcycle" : "Add Motorcycle"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Model"
          value={motorcycle.model}
          onChange={(e) =>
            setMotorcycle({ ...motorcycle, model: e.target.value })
          }
          className="w-full border p-2 rounded-md"
        />
        <input
          type="text"
          placeholder="Serial Number"
          value={motorcycle.serialNumber}
          onChange={(e) =>
            setMotorcycle({ ...motorcycle, serialNumber: e.target.value })
          }
          className="w-full border p-2 rounded-md"
        />
        <input
          type="text"
          placeholder="Owner"
          value={motorcycle.owner}
          onChange={(e) =>
            setMotorcycle({ ...motorcycle, owner: e.target.value })
          }
          className="w-full border p-2 rounded-md"
        />
        <input
          type="text"
          placeholder="Color"
          value={motorcycle.color}
          onChange={(e) =>
            setMotorcycle({ ...motorcycle, color: e.target.value })
          }
          className="w-full border p-2 rounded-md"
        />
        <input
          type="number"
          placeholder="Capacity (cc)"
          value={motorcycle.capacity}
          onChange={(e) =>
            setMotorcycle({ ...motorcycle, capacity: Number(e.target.value) })
          }
          className="w-full border p-2 rounded-md"
        />
        <input
          type="number"
          placeholder="Year"
          value={motorcycle.year}
          onChange={(e) =>
            setMotorcycle({ ...motorcycle, year: Number(e.target.value) })
          }
          className="w-full border p-2 rounded-md"
        />
        <input
          type="date"
          placeholder="Last Service"
          value={motorcycle.lastService}
          onChange={(e) =>
            setMotorcycle({ ...motorcycle, lastService: e.target.value })
          }
          className="w-full border p-2 rounded-md"
        />
        <input
          type="date"
          placeholder="Next Service"
          value={motorcycle.nextService}
          onChange={(e) =>
            setMotorcycle({ ...motorcycle, nextService: e.target.value })
          }
          className="w-full border p-2 rounded-md"
        />
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
