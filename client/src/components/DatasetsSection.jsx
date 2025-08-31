import React, { useState } from 'react';
import { Database, Upload, Download, Filter, Search, MoreVertical, Eye, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { toast } from 'sonner';

export function DatasetsSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const datasets = [
    {
      id: 1,
      name: 'Global Coastline Changes 2020-2024',
      type: 'Satellite Imagery',
      size: '2.4 GB',
      records: '15,847',
      lastUpdated: '2 hours ago',
      status: 'active',
      accuracy: '94.2%',
      source: 'Landsat 8'
    },
    {
      id: 2,
      name: 'Marine Protected Areas Database',
      type: 'Vector Data',
      size: '156 MB',
      records: '342',
      lastUpdated: '1 day ago',
      status: 'processing',
      accuracy: '98.1%',
      source: 'Government APIs'
    },
    {
      id: 3,
      name: 'Ocean Temperature Monitoring',
      type: 'Time Series',
      size: '1.8 GB',
      records: '89,234',
      lastUpdated: '4 hours ago',
      status: 'active',
      accuracy: '91.7%',
      source: 'NOAA Buoys'
    },
    {
      id: 4,
      name: 'Coral Reef Health Assessment',
      type: 'Multispectral',
      size: '3.2 GB',
      records: '5,673',
      lastUpdated: '6 hours ago',
      status: 'error',
      accuracy: '87.3%',
      source: 'Sentinel-2'
    },
    {
      id: 5,
      name: 'Fisheries Activity Tracking',
      type: 'AIS Data',
      size: '890 MB',
      records: '23,456',
      lastUpdated: '30 min ago',
      status: 'active',
      accuracy: '96.5%',
      source: 'Vessel Tracking'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredDatasets = datasets.filter(dataset => {
    const matchesSearch = dataset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dataset.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || dataset.type.toLowerCase().includes(filterType.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  const handleUpload = () => {
    toast.info('Upload dialog would open here');
  };

  const handleExport = (datasetName) => {
    toast.success(`Exporting ${datasetName}...`);
  };

  const handleView = (datasetName) => {
    toast.info(`Opening ${datasetName} viewer`);
  };

  const handleDelete = (datasetName) => {
    toast.error(`${datasetName} deleted`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <Database className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Datasets</h1>
            <p className="text-gray-600">Manage and analyze your data collections</p>
          </div>
        </div>
        <Button onClick={handleUpload} className="bg-blue-600 hover:bg-blue-700">
          <Upload className="w-4 h-4 mr-2" />
          Upload Dataset
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Datasets</p>
                <p className="text-2xl font-semibold text-gray-900">24</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Database className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Size</p>
                <p className="text-2xl font-semibold text-gray-900">12.8 GB</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Download className="w-4 h-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-semibold text-gray-900">18</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Processing</p>
                <p className="text-2xl font-semibold text-gray-900">3</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Dataset Management</h3>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search datasets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="satellite">Satellite Imagery</SelectItem>
                  <SelectItem value="vector">Vector Data</SelectItem>
                  <SelectItem value="time">Time Series</SelectItem>
                  <SelectItem value="multispectral">Multispectral</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dataset Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Records</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Accuracy</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDatasets.map((dataset) => (
                <TableRow key={dataset.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900">{dataset.name}</div>
                      <div className="text-sm text-gray-500">{dataset.source}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{dataset.type}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{dataset.records}</TableCell>
                  <TableCell>{dataset.size}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(dataset.status)}>
                      {dataset.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{dataset.accuracy}</TableCell>
                  <TableCell className="text-gray-500">{dataset.lastUpdated}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleView(dataset.name)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleExport(dataset.name)}>
                          <Download className="w-4 h-4 mr-2" />
                          Export
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDelete(dataset.name)}
                          className="text-red-600"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}