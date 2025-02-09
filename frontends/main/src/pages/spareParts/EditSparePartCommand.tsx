import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApi } from "../../context/ApiContext";

const EditSparePartCommand: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // ID de la commande à modifier
  const navigate = useNavigate();
  const api = useApi();

  const [formData, setFormData] = useState({
    ordered_quantity: "",
    total_price: "",
    date_order: "",
    fk_spare_part: { id: 0, label: "", picture_link: "" },
  });

  useEffect(() => {
    // Récupération de la commande actuelle
    if (id) {
      api
        .get(`spare_part_command/${id}`, { credentials: "include" })
        .then((response) => {
          const data = response.data;
          setFormData({
            ordered_quantity: data.ordered_quantity.toString(),
            total_price: data.total_price.toString(),
            date_order: data.date_order,
            fk_spare_part: data.fk_spare_part,
          });
        })
        .catch(console.error);
    }
  }, [id, api]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ordered_quantity: parseInt(formData.ordered_quantity, 10),
        total_price: parseFloat(formData.total_price),
        date_order: formData.date_order,
      };

      await api.patch(`spare_part_command/${id}`, dataToSend);
      navigate(-1); // Retour à la page précédente
    } catch (error) {
      console.error("Erreur lors de la modification de la commande :", error);
      alert("Une erreur est survenue.");
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Modifier la commande</h1>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Affichage de la pièce détachée */}
        <div className="flex items-center space-x-4">
          <img
            src={`http://localhost:3001/${formData.fk_spare_part.picture_link}`}
            alt={formData.fk_spare_part.label}
            className="h-16 w-16 object-contain"
          />
          <span className="text-lg font-semibold">
            {formData.fk_spare_part.label}
          </span>
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

        {/* Bouton de soumission */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-500"
        >
          Enregistrer les modifications
        </button>
      </form>
    </div>
  );
};

export default EditSparePartCommand;
