import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApi } from "../../context/ApiContext";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";
import Select from 'react-select'

const PlanMaintenance: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [date, setDate] = useState("");
  const [cost, setCost] = useState(0);
  const [note, setNote] = useState("");
  const [parts, setParts] = useState<number[]>([]);
  const [companyParts, setCompanyParts] = useState([]);

  const api = useApi();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.user);
  const company_id = user.fk_company.id;

  // Charger les modèles et leurs intervalles
  useEffect(() => {
    api.get("spare_part_company/" + company_id)
      .then((response) => setCompanyParts(response.data))
      .catch(console.error);
  }, [api, company_id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const api_call_data = {
      fk_moto: {
        id: id
      },
      date: date,
      cost: cost,
      note: note
    }

    const formatted_parts = parts.map(part => part.value);

    api_call_data.fk_parts = formatted_parts;

    api.post("moto_service", api_call_data)
      .then(() => {
        navigate(`/maintenances`);
      })
      .catch(console.error);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Planifier un entretien</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Date du dernier entretien
          </label>
          <input
            type="date"
            className="w-full border p-2 rounded-md"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Coût
          </label>
          <input
            type="number"
            className="w-full border p-2 rounded-md"
            value={cost}
            onChange={(e) => setCost(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Note
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Pièces détachées
          </label>
          <Select
            className="w-full border p-2 rounded-md"
            value={parts}
            isMulti // Permet la sélection multiple
            onChange={(selectedOptions) => setParts(selectedOptions)}
            options={companyParts.map((part) => ({
              value: part.fk_part.id,
              label: `${part.fk_part.label} - Stock : ${part.stock}`,
            }))}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-500"
        >
          Planifier l'entretien
        </button>
      </form>
    </div>
  );
};

export default PlanMaintenance;
