import { Bell, Search, User } from "lucide-react";

export const TopBar: React.FC = () => {
  return (
    <header className="h-16 bg-gray-800 text-white flex items-center justify-between px-4 shadow-md">
      <div className="flex items-center gap-2">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher..."
          className="bg-gray-700 text-white rounded-lg p-2 focus:outline-none"
        />
      </div>
      <div className="flex items-center gap-4">
        <Bell className="w-6 h-6 cursor-pointer hover:text-gray-300" />
        <div className="flex items-center gap-2 cursor-pointer">
          <User className="w-6 h-6" />
          <span>Profil</span>
        </div>
      </div>
    </header>
  );
};
