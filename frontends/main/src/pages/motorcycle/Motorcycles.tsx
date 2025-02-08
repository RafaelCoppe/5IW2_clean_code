import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useApi } from "../../context/ApiContext";

export const Motorcycles: React.FC<{ userRole: string }> = ({ userRole }) => {
  const api = useApi();
  const [motorcycles, setMotorcycles] = useState([]);

  useEffect(() => {
    api.get("moto")
      .then((response) => setMotorcycles(response.data))
      .catch(console.error);
  }, [api]);

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Gestion des motos</h1>
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
            <th className="border px-4 py-2">Dealer</th>
            <th className="border px-4 py-2">Owner</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {motorcycles.map((moto) => (
            <tr key={moto.id}>
              <td className="border px-4 py-2">{moto.fk_model ? moto.fk_model.label : ''}</td>
              <td className="border px-4 py-2">{moto.serial_number}</td>
              <td className="border px-4 py-2">{moto.fk_dealer ? moto.fk_dealer.name : ''}</td>
              <td className="border px-4 py-2">{moto.fk_owner ? (moto.fk_owner.last_name.toUpperCase() + ' ' + moto.fk_owner.first_name) : ''}</td>
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
