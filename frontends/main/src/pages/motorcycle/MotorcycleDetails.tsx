import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const MotorcycleDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Récupérer l'ID de la moto dans l'URL
  const navigate = useNavigate();
  const [motorcycle, setMotorcycle] = useState<any>(null); // État pour les détails de la moto

  useEffect(() => {
    const fetchMotorcycleDetails = async () => {
      try {
        // Remplace cette ligne par un appel à ton API réelle
        const response = await axios.get(`/api/motorcycles/${id}`);
        setMotorcycle(response.data);
      } catch (error) {
        console.error("Error fetching motorcycle details:", error);
      }
    };

    if (id) {
      fetchMotorcycleDetails();
    }
  }, [id]);

  if (!motorcycle) {
    return <div>Loading motorcycle details...</div>;
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Motorcycle Details</h1>
      <div className="mb-4">
        <strong>Model:</strong> {motorcycle.model}
      </div>
      <div className="mb-4">
        <strong>Serial Number:</strong> {motorcycle.serialNumber}
      </div>
      <div className="mb-4">
        <strong>Owner:</strong> {motorcycle.owner}
      </div>
      <div className="mb-4">
        <strong>Color:</strong> {motorcycle.color}
      </div>
      <div className="mb-4">
        <strong>Capacity:</strong> {motorcycle.capacity} cc
      </div>
      <div className="mb-4">
        <strong>Year:</strong> {motorcycle.year}
      </div>
      <div className="mb-4">
        <strong>Last Service:</strong> {motorcycle.lastService}
      </div>
      <div className="mb-4">
        <strong>Next Service:</strong> {motorcycle.nextService}
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Maintenance History</h2>
        {motorcycle.maintenanceHistory &&
        motorcycle.maintenanceHistory.length > 0 ? (
          <ul className="list-disc pl-6">
            {motorcycle.maintenanceHistory.map(
              (service: any, index: number) => (
                <li key={index}>
                  <strong>Date:</strong> {service.date},{" "}
                  <strong>Details:</strong> {service.details}
                </li>
              )
            )}
          </ul>
        ) : (
          <p>No maintenance history available.</p>
        )}
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Test Drives</h2>
        {motorcycle.testDrives && motorcycle.testDrives.length > 0 ? (
          <ul className="list-disc pl-6">
            {motorcycle.testDrives.map((testDrive: any, index: number) => (
              <li key={index}>
                <strong>Driver:</strong> {testDrive.driver},{" "}
                <strong>Date:</strong> {testDrive.date}
              </li>
            ))}
          </ul>
        ) : (
          <p>No test drives recorded.</p>
        )}
      </div>
      <button
        onClick={() => navigate(-1)} // Retour à la page précédente
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
      >
        Back
      </button>
    </div>
  );
};

export default MotorcycleDetails;
