import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface TestDrive {
  id: number;
  car: string;
  date: string;
  time: string;
  customer: string;
  status: string;
}

const TestDrives: React.FC = () => {
  const [testDrives, setTestDrives] = useState<TestDrive[]>([]);
  const navigate = useNavigate();

  // Simulate fetching test drives data
  useEffect(() => {
    const fetchTestDrives = () => {
      const simulatedData: TestDrive[] = [
        {
          id: 1,
          car: "Tesla Model S",
          date: "2023-10-01",
          time: "10:00",
          customer: "John Doe",
          status: "Scheduled",
        },
        {
          id: 2,
          car: "BMW i8",
          date: "2023-10-02",
          time: "14:00",
          customer: "Jane Doe",
          status: "Completed",
        },
      ];
      setTestDrives(simulatedData);
    };
    fetchTestDrives();
  }, []);

  // Handle delete test drive
  const handleDelete = (id: number) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce test de conduite ?")) {
      setTestDrives(testDrives.filter((testDrive) => testDrive.id !== id)); // Delete locally
    }
  };

  // Handle edit test drive
  const handleEdit = (id: number) => {
    navigate(`/test-drives/edit/${id}`);
  };

  // Handle add test drive
  const handleAdd = () => {
    navigate(`/test-drives/add`);
  };

  // Handle view test drive
  const handleView = (id: number) => {
    navigate(`/test-drives/${id}`);
  };

  // Handle delete all test drives
  const handleDeleteAll = () => {
    if (window.confirm("Voulez-vous vraiment supprimer tous les tests de conduite ?")) {
      setTestDrives([]); // Delete all locally
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Test Drives</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
        >
          Ajouter un test de conduite
        </button>
        <button
          onClick={handleDeleteAll}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 ml-2"
        >
          Supprimer tous les tests de conduite
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-2xl font-bold mb-4">Liste des tests de conduite</h2>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Voiture</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Heure</th>
              <th className="border px-4 py-2">Client</th>
              <th className="border px-4 py-2">Statut</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {testDrives.map((testDrive) => (
              <tr key={testDrive.id}>
                <td className="border px-4 py-2">{testDrive.car}</td>
                <td className="border px-4 py-2">{testDrive.date}</td>
                <td className="border px-4 py-2">{testDrive.time}</td>
                <td className="border px-4 py-2">{testDrive.customer}</td>
                <td className="border px-4 py-2">{testDrive.status}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEdit(testDrive.id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded mr-2 hover:bg-blue-500"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(testDrive.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500"
                  >
                    Supprimer
                  </button>
                  <button
                    onClick={() => handleView(testDrive.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-500 ml-2"
                  >
                    Voir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestDrives;