import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMaintenanceDetails } from "../../services/maintenanceService";
import { Maintenance } from "../../types/Maintenance";

const MaintenanceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Récupérer l'ID dans l'URL
  const [maintenance, setMaintenance] = useState<Maintenance | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMaintenanceDetails = async () => {
      try {
        if (id) {
          const data = await fetchMaintenanceDetails(Number(id));
          setMaintenance(data);
        }
      } catch (error) {
        console.error(
          "Erreur lors du chargement des détails de l'entretien :",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadMaintenanceDetails();
  }, [id]);

  if (loading) return <p>Chargement des détails...</p>;
  if (!maintenance) return <p>Aucun entretien trouvé.</p>;

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Détails de l'entretien</h1>
      <div className="mb-4">
        <strong>Moto ID :</strong> {maintenance.motoId}
      </div>
      <div className="mb-4">
        <strong>Date :</strong> {maintenance.date}
      </div>
      <div className="mb-4">
        <strong>Type :</strong>{" "}
        {maintenance.type === "preventive" ? "Préventif" : "Curatif"}
      </div>
      <div className="mb-4">
        <strong>Coût :</strong> {maintenance.cost} €
      </div>
      <div className="mb-4">
        <strong>Notes :</strong> {maintenance.notes}
      </div>
      {maintenance.partsUsed && maintenance.partsUsed.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Pièces utilisées</h2>
          <ul className="list-disc pl-6">
            {maintenance.partsUsed.map((part, index) => (
              <li key={index}>
                {part.name} - {part.cost} €
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MaintenanceDetails;
