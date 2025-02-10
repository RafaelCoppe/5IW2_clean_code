import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApi } from "../../context/ApiContext";
import { SparePart } from "../../types/spartPart";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";

const AddSparePartCommand: React.FC = () => {
  const id = useSelector((state: RootState) => state.auth.user?.company?.id); // Récupère l'ID de l'entreprise

  const navigate = useNavigate();
  const api = useApi();

  const [formData, setFormData] = useState({
    fk_spare_part: "",
    ordered_quantity: "",
    total_price: "",
    date_order: "",
    date_received: "",
  });

  const [spareParts, setSpareParts] = useState<SparePart[]>([]);

  useEffect(() => {
    // Récupération de la liste des pièces détachées
    api
      .get("spare_part", { credentials: "include" })
      .then((response) => setSpareParts(response.data))
      .catch(console.error);
  }, [api]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dataToSend = {
        fk_spare_part: { id: parseInt(formData.fk_spare_part, 10) },
        ordered_quantity: parseInt(formData.ordered_quantity, 10),
        total_price: parseFloat(formData.total_price),
        date_order: formData.date_order,
        date_received:
          formData.date_received || new Date().toISOString().split("T")[0], // ✅ Si vide, mettre la date d'aujourd'hui
        fk_company: id, // ID de l'entreprise à laquelle la commande appartient
      };

      console.log("Données envoyées :", dataToSend); // Debug

      await api.post("spare_part_command", dataToSend);
      navigate(-1); // Retour à la page précédente
    } catch (error) {
      console.error("Erreur lors de l'ajout de la commande :", error);
      alert("Une erreur est survenue.");
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Ajouter une commande</h1>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Sélection de la pièce détachée */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Pièce détachée
          </label>
          <select
            value={formData.fk_spare_part}
            onChange={(e) =>
              setFormData({ ...formData, fk_spare_part: e.target.value })
            }
            className="w-full border p-2 rounded-md"
            required
          >
            <option value="">Sélectionnez une pièce</option>
            {spareParts.map((part) => (
              <option key={part.id} value={part.id}>
                {part.label}
              </option>
            ))}
          </select>
        </div>

        {/* Quantité commandée */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Quantité commandée
          </label>
          <input
            type="number"
            value={formData.ordered_quantity}
            onChange={(e) =>
              setFormData({ ...formData, ordered_quantity: e.target.value })
            }
            className="w-full border p-2 rounded-md"
            required
          />
        </div>

        {/* Prix total */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Prix total (€)
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.total_price}
            onChange={(e) =>
              setFormData({ ...formData, total_price: e.target.value })
            }
            className="w-full border p-2 rounded-md"
            required
          />
        </div>

        {/* Date de commande */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Date de commande
          </label>
          <input
            type="date"
            value={formData.date_order}
            onChange={(e) =>
              setFormData({ ...formData, date_order: e.target.value })
            }
            className="w-full border p-2 rounded-md"
            required
          />
        </div>

        <label className="block text-sm font-medium mb-2">
          Date de réception
        </label>
        <input
          type="date"
          value={formData.date_received}
          onChange={(e) =>
            setFormData({ ...formData, date_received: e.target.value })
          }
          className="w-full border p-2 rounded-md"
        />

        {/* Bouton de soumission */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-500"
        >
          Enregistrer la commande
        </button>
      </form>
    </div>
  );
};

export default AddSparePartCommand;
