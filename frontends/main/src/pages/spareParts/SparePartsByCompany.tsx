import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApi } from "../../context/ApiContext";
import { SparePartCommand } from "../../types/spartPart";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";

const SparePartsByCompany: React.FC = () => {
  //   const { id } = useParams(); // Récupération de l'ID de l'entreprise depuis l'URL
  const id = useSelector((state: RootState) => state.auth.user?.company?.id); // Récupère l'ID de l'entreprise
  console.log("ID de l'entreprise de l'utilisateur connecté :", id); // Debug
  const [spareParts, setSpareParts] = useState<SparePartCommand[]>([]);
  const api = useApi();
  const navigate = useNavigate(); // Pour naviguer entre les pages

  useEffect(() => {
    api
      .get(`spare_part_command/company/${id}`, { credentials: "include" })
      .then((response) => {
        // console.log("Réponse API :", response.data); // ✅ Debugging
        setSpareParts(response.data);
      })
      .catch(console.error);
  }, [id, api]);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">
        Pièces détachées de l'entreprise
      </h1>

      {/* Bouton pour ajouter une commande */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate(`/spare-parts/add`)} // Redirection vers la page d'ajout
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500"
        >
          Ajouter une commande
        </button>
      </div>

      {/* Tableau des pièces */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-2xl font-bold mb-4">Liste des pièces commandées</h2>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              {/* <th className="border px-4 py-2">Image</th> */}
              <th className="border px-4 py-2">Nom</th>
              <th className="border px-4 py-2">Quantité commandée</th>
              <th className="border px-4 py-2">Prix total (€)</th>
              <th className="border px-4 py-2">Date de commande</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {spareParts.map((command) => {
              // Vérification pour éviter les erreurs
              if (!command.fk_spare_part) return null;

              return (
                <tr key={command.id}>
                  {/* Affichage de l'image avec une URL correcte */}
                  {/* <td className="border px-4 py-2">
                    {command.fk_spare_part.picture_link ? (
                      <img
                        src={`http://localhost:3001/${command.fk_spare_part.picture_link}`} // Adapter l'URL si nécessaire
                        alt={command.fk_spare_part.label}
                        className="h-16 w-16 object-contain"
                      />
                    ) : (
                      <span>Aucune image</span>
                    )}
                  </td> */}
                  <td className="border px-4 py-2">
                    {command.fk_spare_part.label}
                  </td>
                  <td className="border px-4 py-2">
                    {command.ordered_quantity}
                  </td>
                  <td className="border px-4 py-2">{command.total_price} €</td>
                  <td className="border px-4 py-2">{command.date_order}</td>
                  <td className="border px-4 py-2">
                    {/* Bouton Modifier */}
                    <button
                      onClick={() =>
                        navigate(`/spare-parts/${command.id}/edit`)
                      } // Redirection vers l'édition
                      className="bg-blue-600 text-white px-3 py-1 rounded mr-2 hover:bg-blue-500"
                    >
                      Modifier
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SparePartsByCompany;
