import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { CourtModal } from './courts/CourtModal';
import type { Court } from '../../types';

interface CourtsListProps {
  courts: Court[];
  onToggleActive: (courtId: string) => void;
}

export function CourtsList({ courts, onToggleActive }: CourtsListProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState<Court | undefined>();

  const handleEditCourt = (court: Court) => {
    setSelectedCourt(court);
    setShowModal(true);
  };

  const handleAddCourt = () => {
    setSelectedCourt(undefined);
    setShowModal(true);
  };

  const handleSaveCourt = (courtData: any) => {
    console.log('Save court:', courtData);
    // In a real app, this would make an API call
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Courts</h2>
        <button
          onClick={handleAddCourt}
          className="flex items-center space-x-2 px-4 py-2 bg-red-900 text-white rounded-lg hover:bg-red-950"
        >
          <Plus className="w-5 h-5" />
          <span>Add Court</span>
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courts.map((court) => (
          <div
            key={court.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold">{court.name}</h3>
                  <p className="text-gray-600">€{court.price_per_hour / 100}/hour</p>
                </div>
                <button
                  onClick={() => handleEditCourt(court)}
                  className="text-sm text-red-900 hover:text-red-950"
                >
                  Edit
                </button>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Status: <span className={court.is_active ? 'text-green-600' : 'text-red-600'}>
                    {court.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <button
                  onClick={() => onToggleActive(court.id)}
                  className={`px-4 py-2 rounded-lg text-sm ${
                    court.is_active
                      ? 'bg-red-100 text-red-900 hover:bg-red-200'
                      : 'bg-green-100 text-green-900 hover:bg-green-200'
                  }`}
                >
                  {court.is_active ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <CourtModal
          court={selectedCourt}
          onClose={() => setShowModal(false)}
          onSave={handleSaveCourt}
        />
      )}
    </div>
  );
}