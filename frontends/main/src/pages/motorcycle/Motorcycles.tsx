import { useState } from "react";
import { Link } from "react-router-dom";

export const Motorcycles: React.FC<{ userRole: string }> = ({ userRole }) => {
  const [motorcycles, setMotorcycles] = useState([
    {
      id: 1,
      model: "Street Triple",
      serialNumber: "STR12345",
      owner: "Partner A",
      color: "Black",
      capacity: 765,
      year: 2023,
      lastService: "2024-12-01",
      nextService: "2025-12-01",
    },
    {
      id: 2,
      model: "Tiger Sport 660",
      serialNumber: "TSP98765",
      owner: "Dealer B",
      color: "Red",
      capacity: 660,
      year: 2022,
      lastService: "2024-10-15",
      nextService: "2025-10-15",
    },
    {
      id: 2,
      model: "Tiger Sport 660",
      serialNumber: "TSP98765",
      owner: "Dealer A",
      color: "Red",
      capacity: 660,
      year: 2022,
      lastService: "2024-10-15",
      nextService: "2025-10-15",
    },
    // Autres motos...
  ]);

  // Filtrer les motos selon le rôle
  // const filteredMotorcycles =
  //   userRole === "admin"
  //     ? motorcycles // Admin voit tout
  //     : motorcycles.filter((moto) =>
  //         userRole === "dealer"
  //           ? moto.owner === "Dealer B"
  //           : moto.owner === "Partner A"
  //       ); // Dealer ou Partner voit ses propres motos

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Motorcycles Management</h1>
      {userRole === "admin" && (
        <Link
          to="/motorcycles/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
        >
          Add Motorcycle
        </Link>
      )}
      <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Model</th>
            <th className="border px-4 py-2">Serial Number</th>
            <th className="border px-4 py-2">Owner</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {motorcycles.map((moto) => (
            <tr key={moto.id}>
              <td className="border px-4 py-2">{moto.model}</td>
              <td className="border px-4 py-2">{moto.serialNumber}</td>
              <td className="border px-4 py-2">{moto.owner}</td>
              <td className="border px-4 py-2">
                <Link
                  to={`/motorcycles/${moto.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Voir
                </Link>
                {(userRole === "admin" || userRole === "dealer") && (
                  <>
                    {" | "}
                    <Link
                      to={`/motorcycles/edit/${moto.id}`}
                      className="text-green-600 hover:underline"
                    >
                      Editer
                    </Link>
                  </>
                )}
                {userRole === "admin" && (
                  <>
                    {" | "}
                    <button
                      onClick={() =>
                        setMotorcycles(
                          motorcycles.filter((m) => m.id !== moto.id)
                        )
                      }
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
