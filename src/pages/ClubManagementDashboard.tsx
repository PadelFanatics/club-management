import React from 'react';
import { Plus, Settings, Users, Calendar, Trophy, Package } from 'lucide-react';

interface Club {
  id: string;
  name: string;
  package: 'basic' | 'professional' | 'elite';
  location: string;
  courts: number;
  members: number;
  nextPayment: string;
}

export function ClubManagementDashboard() {
  // This would come from your API in a real app
  const clubs: Club[] = [
    {
      id: '1',
      name: 'UBUD Padel Club',
      package: 'elite',
      location: 'Ubud, Bali',
      courts: 4,
      members: 120,
      nextPayment: '2024-04-01'
    },
    {
      id: '2',
      name: 'Canggu Padel Center',
      package: 'professional',
      location: 'Canggu, Bali',
      courts: 2,
      members: 85,
      nextPayment: '2024-04-15'
    }
  ];

  const packageColors = {
    basic: 'bg-gray-100 text-gray-800',
    professional: 'bg-blue-100 text-blue-800',
    elite: 'bg-purple-100 text-purple-800'
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Padel Clubs</h1>
          <button className="flex items-center px-4 py-2 bg-red-900 text-white rounded-lg hover:bg-red-950">
            <Plus className="w-5 h-5 mr-2" />
            Add New Club
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {clubs.map((club) => (
            <div key={club.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{club.name}</h3>
                    <p className="text-sm text-gray-500">{club.location}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${packageColors[club.package]} capitalize`}>
                    {club.package}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                    <div>
                      <div className="text-sm text-gray-500">Next Payment</div>
                      <div className="font-medium">{new Date(club.nextPayment).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Package className="w-5 h-5 text-gray-400 mr-2" />
                    <div>
                      <div className="text-sm text-gray-500">Courts</div>
                      <div className="font-medium">{club.courts}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-gray-400 mr-2" />
                    <div>
                      <div className="text-sm text-gray-500">Members</div>
                      <div className="font-medium">{club.members}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Trophy className="w-5 h-5 text-gray-400 mr-2" />
                    <div>
                      <div className="text-sm text-gray-500">Tournaments</div>
                      <div className="font-medium">3 Active</div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button className="px-4 py-2 text-red-900 hover:bg-red-50 rounded-lg flex items-center">
                    <Settings className="w-4 h-4 mr-2" />
                    Manage
                  </button>
                  <button className="px-4 py-2 border border-red-200 text-red-900 hover:bg-red-50 rounded-lg">
                    View Dashboard
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Add New Club Card */}
          <button className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 p-6 hover:border-red-200 hover:bg-gray-100 flex flex-col items-center justify-center text-gray-500 hover:text-red-900">
            <Plus className="w-12 h-12 mb-2" />
            <span className="text-sm font-medium">Add New Club</span>
          </button>
        </div>
      </div>
    </div>
  );
}