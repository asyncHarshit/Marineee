import React, { useState } from 'react';
import { Archive, Search, Download, Calendar, Database, HardDrive } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { toast } from 'sonner';

export function ArchiveSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedType, setSelectedType] = useState('all');

  const archivedItems = [
    {
      id: 1,
      name: 'Global Ocean Temperature Data 2023',
      type: 'Dataset',
      size: '12.4 GB',
      archived: '2024-01-15',
      retention: 'Until 2029',
      access: 'Read-only',
      category: 'Environmental'
    },
    {
      id: 2,
      name: 'Marine Protected Areas Analysis Q4 2023',
      type: 'Report',
      size: '4.2 MB',
      archived: '2024-01-01',
      retention: 'Until 2027',
      access: 'Full',
      category: 'Conservation'
    },
    {
      id: 3,
      name: 'Coral Reef Monitoring 2022-2023',
      type: 'Dataset',
      size: '8.7 GB',
      archived: '2023-12-31',
      retention: 'Until 2028',
      access: 'Read-only',
      category: 'Biodiversity'
    },
    {
      id: 4,
      name: 'Social Media Campaign Analysis 2023',
      type: 'Report',
      size: '156 MB',
      archived: '2023-12-15',
      retention: 'Until 2026',
      access: 'Full',
      category: 'Social'
    },
    {
      id: 5,
      name: 'Satellite Imagery Historical Collection',
      type: 'Dataset',
      size: '45.8 GB',
      archived: '2023-11-30',
      retention: 'Permanent',
      access: 'Read-only',
      category: 'Imagery'
    }
  ];

  const storageStats = [
    { category: 'Environmental Data', size: '156.7 GB', percentage: 35 },
    { category: 'Satellite Imagery', size: '98.3 GB', percentage: 22 },
    { category: 'Reports & Analysis', size: '45.2 GB', percentage: 18 },
    { category: 'Social Media Data', size: '23.1 GB', percentage: 12 },
    { category: 'Other', size: '18.9 GB', percentage: 13 }
  ];

  const retentionPolicies = [
    {
      type: 'Environmental Datasets',
      retention: '7 years',
      autoArchive: '1 year after last access',
      status: 'Active'
    },
    {
      type: 'Reports & Analysis',
      retention: '5 years',
      autoArchive: '6 months after creation',
      status: 'Active'
    },
    {
      type: 'Social Media Data',
      retention: '3 years',
      autoArchive: '3 months after collection',
      status: 'Active'
    },
    {
      type: 'Satellite Imagery',
      retention: 'Permanent',
      autoArchive: 'Immediate after processing',
      status: 'Active'
    }
  ];

  const getAccessColor = (access) => {
    switch (access) {
      case 'Full': return 'bg-green-100 text-green-800';
      case 'Read-only': return 'bg-blue-100 text-blue-800';
      case 'Restricted': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRestore = (itemName) => {
    toast.success(`Restoring ${itemName} from archive...`);
  };

  const handleDownload = (itemName) => {
    toast.info(`Downloading ${itemName} from archive...`);
  };

  const filteredItems = archivedItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || item.type.toLowerCase() === selectedType.toLowerCase();
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <Archive className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Archive</h1>
            <p className="text-gray-600">Manage archived data and historical records</p>
          </div>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <HardDrive className="w-4 h-4 mr-2" />
          Storage Settings
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Archived</p>
                <p className="text-2xl font-semibold text-gray-900">342</p>
                <p className="text-sm text-gray-500">Items</p>
              </div>
              <Archive className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Storage Used</p>
                <p className="text-2xl font-semibold text-gray-900">342.2 GB</p>
                <p className="text-sm text-gray-500">of 1 TB</p>
              </div>
              <HardDrive className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-semibold text-gray-900">23</p>
                <p className="text-sm text-gray-500">New archives</p>
              </div>
              {/* <Calendar className="w-8 h-8 text-purple-600" /> */}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Retention</p>
                <p className="text-2xl font-semibold text-gray-900">97%</p>
                <p className="text-sm text-gray-500">Compliance</p>
              </div>
              <Database className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="items" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="items">Archived Items</TabsTrigger>
          <TabsTrigger value="storage">Storage Analysis</TabsTrigger>
          <TabsTrigger value="policies">Retention Policies</TabsTrigger>
        </TabsList>

        <TabsContent value="items" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Archived Items</h3>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search archives..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="dataset">Datasets</SelectItem>
                      <SelectItem value="report">Reports</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Archived Date</TableHead>
                    <TableHead>Retention</TableHead>
                    <TableHead>Access Level</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-500">{item.category}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.type}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">{item.size}</TableCell>
                      <TableCell className="text-gray-500">{item.archived}</TableCell>
                      <TableCell className="text-gray-500">{item.retention}</TableCell>
                      <TableCell>
                        <Badge className={getAccessColor(item.access)}>
                          {item.access}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDownload(item.name)}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleRestore(item.name)}
                          >
                            Restore
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="storage" className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-gray-900">Storage Analysis by Category</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {storageStats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-gray-900">{stat.category}</span>
                        <span className="text-sm text-gray-500">{stat.size}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${stat.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="ml-4 text-sm font-medium text-gray-900">{stat.percentage}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policies" className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-gray-900">Data Retention Policies</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {retentionPolicies.map((policy, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{policy.type}</h4>
                      <Badge className="bg-green-100 text-green-800">{policy.status}</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Retention Period:</span> {policy.retention}
                      </div>
                      <div>
                        <span className="font-medium">Auto-Archive:</span> {policy.autoArchive}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}