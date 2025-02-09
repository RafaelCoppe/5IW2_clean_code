import React, { useEffect, useState } from "react";
import { useApi } from "../../context/ApiContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Bike, Users, Wrench, Activity, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardMotos: React.FC = () => {
  const api = useApi();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalMotos: 0,
    totalUsers: 0,
    totalEssais: 0,
    totalPieces: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const motos = await api.get("moto_model");
        const users = await api.get("user");
        const essais = await api.get("test_drive");
        const pieces = await api.get("spare_part");

        setStats({
          totalMotos: motos.data.length,
          totalUsers: users.data.length,
          totalEssais: essais.data.length,
          totalPieces: pieces.data.length,
        });
      } catch (error) {
        console.error("Erreur lors du chargement des statistiques", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [api]);

  // Simulation d'un graphique
  const data = [
    { name: "Jan", essais: 1, motos: 5 },
    { name: "Fév", essais: 0, motos: 0 },
    { name: "Mar", essais: 1, motos: 10 },
  ];

  if (loading) {
    return (
      <p className="text-center text-lg font-semibold">
        Chargement des données...
      </p>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard Gestion de Flotte</h1>
        <button
          onClick={() => navigate("/motorcycles/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-500"
        >
          <Plus size={18} /> Ajouter une moto
        </button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Motos"
          value={stats.totalMotos}
          color="blue"
          icon={<Bike className="w-10 h-10" />}
        />
        <StatCard
          title="Total Utilisateurs"
          value={stats.totalUsers}
          color="green"
          icon={<Users className="w-10 h-10" />}
        />
        <StatCard
          title="Total Essais"
          value={stats.totalEssais}
          color="yellow"
          icon={<Activity className="w-10 h-10" />}
        />
        <StatCard
          title="Total Pièces Détachées"
          value={stats.totalPieces}
          color="red"
          icon={<Wrench className="w-10 h-10" />}
        />
      </div>

      {/* Graphique */}
      <div className="bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">
          Évolution des essais et des motos
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="essais" stroke="#ff7300" />
            <Line type="monotone" dataKey="motos" stroke="#007bff" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const StatCard: React.FC<{
  title: string;
  value: number;
  color: string;
  icon: React.ReactNode;
}> = ({ title, value, color, icon }) => {
  return (
    <div
      className={`bg-white shadow-md p-6 rounded-lg flex flex-col items-center`}
    >
      <div className={`text-${color}-600`}>{icon}</div>
      <h2 className="text-xl font-semibold mt-2">{title}</h2>
      <p className={`text-3xl font-bold text-${color}-600`}>{value}</p>
    </div>
  );
};

export default DashboardMotos;
