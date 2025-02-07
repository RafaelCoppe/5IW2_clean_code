import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Company {
  id: number;
  name: string;
  type: string;
  mail: string;
  phone: string;
  contact_first_name: string;
  contact_last_name: string;
  contact_mail: string;
  contact_phone: string;
}

const Company: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const navigate = useNavigate();

  // Simulate fetching companies data
  useEffect(() => {
    const fetchCompanies = () => {
      const simulatedData: Company[] = [
        {
          id: 1,
          name: 'Company A',
          type: 'Type A',
          mail: 'companya@example.com',
          phone: '1234567890',
          contact_first_name: 'John',
          contact_last_name: 'Doe',
          contact_mail: 'john.doe@example.com',
          contact_phone: '0987654321',
        },
        {
          id: 2,
          name: 'Company B',
          type: 'Type B',
          mail: 'companyb@example.com',
          phone: '1234567890',
          contact_first_name: 'Jane',
          contact_last_name: 'Doe',
          contact_mail: 'jane.doe@example.com',
          contact_phone: '0987654321',
        },
      ];
      setCompanies(simulatedData);
    };
    fetchCompanies();
  }, []);

  // Handle delete company
  const handleDelete = (id: number) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette entreprise ?')) {
      setCompanies(companies.filter((company) => company.id !== id)); // Delete locally
    }
  };

  // Handle edit company
  const handleEdit = (id: number) => {
    navigate(`/companies/edit/${id}`);
  };

  // Handle add company
  const handleAdd = () => {
    navigate(`/companies/add`);
  };

  // Handle delete all companies
  const handleDeleteAll = () => {
    if (window.confirm('Voulez-vous vraiment supprimer toutes les entreprises ?')) {
      setCompanies([]); // Delete all locally
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Entreprises</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
        >
          Ajouter une entreprise
        </button>
        <button
          onClick={handleDeleteAll}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 ml-2"
        >
          Supprimer toutes les entreprises
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-2xl font-bold mb-4">Liste des entreprises</h2>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Nom</th>
              <th className="border px-4 py-2">Type</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Téléphone</th>
              <th className="border px-4 py-2">Contact</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company.id}>
                <td className="border px-4 py-2">{company.name}</td>
                <td className="border px-4 py-2">{company.type}</td>
                <td className="border px-4 py-2">{company.mail}</td>
                <td className="border px-4 py-2">{company.phone}</td>
                <td className="border px-4 py-2">
                  {company.contact_first_name} {company.contact_last_name} - {company.contact_mail} - {company.contact_phone}
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEdit(company.id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded mr-2 hover:bg-blue-500"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(company.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500"
                  >
                    Supprimer
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

export default Company;