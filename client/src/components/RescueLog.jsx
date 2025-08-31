import React from 'react';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';

export function RescueLog() {
  const rescueData = [
    {
      date: '2024-12-28',
      time: '14:30',
      user: 'Sarah Mitchell',
      userInitials: 'SM',
      location: 'Pier 39',
      team: 'Alpha-1',
      duration: '25 min',
      status: 'completed',
    },
    {
      date: '2024-12-28',
      time: '13:15',
      user: 'John Davidson',
      userInitials: 'JD',
      location: 'Alcatraz Waters',
      team: 'Beta-2',
      duration: '45 min',
      status: 'in-progress',
    },
  ];

  const getStatusBadge = (status) => {
    if (status === 'completed') {
      return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Completed</Badge>;
    } else if (status === 'in-progress') {
      return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">In progress</Badge>;
    }
    return <Badge variant="secondary">{status}</Badge>;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Rescue Log</h3>
          <span className="text-sm text-gray-500">5 Total Records</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Team
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rescueData.map((rescue, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm text-gray-900">{rescue.date}</div>
                    <div className="text-sm text-gray-500">{rescue.time}</div>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Avatar className="w-8 h-8 mr-3">
                      <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                        {rescue.userInitials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-900">{rescue.user}</span>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {rescue.location}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {rescue.team}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {rescue.duration}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {getStatusBadge(rescue.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}