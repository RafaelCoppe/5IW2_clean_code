import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../../context/ApiContext";

interface Service {
  "id": number,
  "date": string,
  "cost": number,
  "note": string,
  "fk_parts": [],
}

const MaintenanceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Récupérer l'ID dans l'URL
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  const api = useApi();

  useEffect(() => {
    api.get("moto_service/" + id)
      .then((response) => setService(response.data))
      .catch(console.error);
    setLoading(false);
  }, [id]);

  if (loading) return <p>Chargement des détails...</p>;
  if (!service) return <p>Aucun entretien trouvé.</p>;

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Détails de l'entretien</h1>
      <div className="mb-4">
        <strong>Moto : </strong> {service.fk_moto.fk_model.label} - {service.fk_moto.serial_number}
      </div>
      <div className="mb-4">
        <strong>Date :</strong> {service.date}
      </div>
      <div className="mb-4">
        <strong>Coût :</strong> {service.cost} €
      </div>
      <div className="mb-4">
        <strong>Note :</strong> {service.note}
      </div>
      <div className="mb-4">
        <strong>Pièces détachées :</strong>
        {service.fk_parts.length > 0
          ? (
            <ul className="list-disc list-inside">
              {service.fk_parts.map((part: object) => (
                <li key={part.id}>{part.label}</li>
              ))}
            </ul>
          )
          : " -"}
      </div>
    </div>
  );
};

export default MaintenanceDetails;
