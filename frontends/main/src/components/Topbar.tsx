import { Bell, Search, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const TopBar: React.FC = () => {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Simulate fetching unread notifications count
    const fetchUnreadCount = () => {
      const simulatedUnreadCount = 3; // Replace with actual logic to fetch unread count
      setUnreadCount(simulatedUnreadCount);
    };
    fetchUnreadCount();
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 min-h-16 bg-gray-800 text-white flex items-center justify-between px-4 shadow-md z-10">
      <div className="flex items-center gap-2">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher..."
          className="bg-gray-700 text-white rounded-lg p-2 focus:outline-none"
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Bell className="w-6 h-6 cursor-pointer hover:text-gray-300" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-600 rounded-full"></span>
          )}
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <User className="w-6 h-6" />
          <Link to="/login">Se connecter</Link>
        </div>
      </div>
    </header>
  );
};