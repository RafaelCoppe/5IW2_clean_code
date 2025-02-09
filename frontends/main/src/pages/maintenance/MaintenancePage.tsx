import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useApi } from "../../context/ApiContext";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";
import MaintenanceTable from "../../components/maintenance/MaintenanceTable";

const MaintenancePage: React.FC = () => {
  const [motos, setMotos] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = useSelector((state: RootState) => state.auth.user);
  const company_type = user.fk_company.type;

  const navigate = useNavigate();
  const api = useApi();

  useEffect(() => {
    api.get("moto/" + (company_type == "Concessionnaire" ? "dealer/" + user.fk_company.id : "owner/" + user.id))
      .then((response) => setMotos(response.data))
      .catch(console.error);

    setLoading(false);
  }, [api, company_type, user.fk_company.id, user.id]);

  const handleEdit = (id: number) => {
    navigate(`/maintenances/${id}/edit`);
  };

  const handleAdd = () => {
    navigate(`/maintenances/add`);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Gestion des entretiens</h1>

      <div className="flex justify-end mb-4">
        {company_type == "Concessionnaire" && (
            <button
              onClick={handleAdd}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500"
            >
              Planifier un entretien
            </button>
        )}
      </div>

      {motos.map(function(moto) {
      return (
        <div className="bg-white shadow-md rounded-lg p-4" key={moto.id}>
          <h2 className="text-2xl font-bold mb-4">{moto.fk_model.label}</h2>
          {loading ? (
            <p>Chargement des données...</p>
          ) : (
            <MaintenanceTable services={moto.services} company_type={company_type}/>
          )}
        </div>
      )
    })}
    </div>
  );
};

export default MaintenancePage;