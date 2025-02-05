import React, { useState, useEffect } from 'react';

interface Notification {
  id: number;
  message: string;
  type: 'stock' | 'testdrive' | 'maintenance';
  date: string;
  read: boolean;
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Simulate fetching notifications data
    const fetchNotifications = () => {
      const simulatedData: Notification[] = [
        {
          id: 1,
          message: 'La pièce "Filtre à huile" est presque en rupture de stock.',
          type: 'stock',
          date: '2023-10-01',
          read: false,
        },
        {
          id: 2,
          message: 'Une nouvelle session de test de conduite a été programmée pour la voiture "Tesla Model S".',
          type: 'testdrive',
          date: '2023-10-02',
          read: false,
        },
        {
          id: 3,
          message: 'La pièce "Bougie d\'allumage" est presque en rupture de stock.',
          type: 'stock',
          date: '2023-10-03',
          read: false,
        },
        {
          id: 4,
          message: 'Une nouvelle session de test de conduite a été programmée pour la voiture "BMW i8".',
          type: 'testdrive',
          date: '2023-10-04',
          read: false,
        },
        {
          id: 5,
          message: 'La maintenance de la voiture "Audi A4" est prévue pour demain.',
          type: 'maintenance',
          date: '2023-10-05',
          read: false,
        },
      ];
      setNotifications(simulatedData);
    };
    fetchNotifications();
  }, []);

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Liste des notifications</h2>
          <button
            onClick={markAllAsRead}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500"
          >
            Marquer tout comme lu
          </button>
        </div>
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`border-l-4 p-4 rounded-md flex justify-between items-center ${
                notification.type === 'stock' ? 'border-red-600' :
                notification.type === 'testdrive' ? 'border-blue-600' :
                'border-yellow-600'
              } ${notification.read ? 'bg-gray-200' : 'bg-white'}`}
            >
              <div>
                <p className="text-sm text-gray-600">{notification.date}</p>
                <p className="text-lg text-black">{notification.message}</p>
              </div>
              {!notification.read && (
                <button
                  onClick={() => markAsRead(notification.id)}
                  className="ml-4 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-500"
                >
                  Non lu
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notifications;