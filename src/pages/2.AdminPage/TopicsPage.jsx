import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import { topicsTableData } from '../../data/topicsTableData.js';
import AddTopicModal from '../../components/admin/AddTopicModal.jsx';

const columnHelper = createColumnHelper();

const TopicsPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      columnHelper.accessor('title', {
        header: 'Title',
        cell: info => (
          <span className="text-base font-medium text-black">
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor('subjects', {
        header: 'Subjects',
        cell: info => (
          <span className="text-base text-black">
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.display({
        id: 'action',
        header: 'Action',
        cell: ({ row }) => (
          <button 
            onClick={() => navigate(`/admin/topics/${row.original.id}`)}
            className="bg-white border border-black rounded-full px-6 py-2 text-sm font-medium text-black hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Open
          </button>
        ),
      }),
    ],
    [navigate]
  );

  const table = useReactTable({
    data: topicsTableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleAddTopic = () => {
    // Handle topic submission logic here
    console.log('Topic added');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-black">Topics Management</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-yellow-400 text-black px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold hover:bg-yellow-500 transition-colors flex items-center space-x-2 cursor-pointer text-sm sm:text-base"
        >
          <Icon icon="mdi:plus" className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline">Add New Topic</span>
          <span className="sm:hidden">Add Topic</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-black uppercase tracking-wider"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-4 sm:px-6 py-3 sm:py-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <AddTopicModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddTopic}
        />
      )}
    </div>
  );
};

export default TopicsPage;
