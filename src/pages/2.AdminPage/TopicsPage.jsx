import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import AddTopicModal from '../../components/admin/AddTopicModal.jsx';
import DeleteConfirmationModal from '../../components/admin/DeleteConfirmationModal.jsx';
import { useTopics } from '../../hooks/useTopics'; // Import the topics hook

const columnHelper = createColumnHelper();

const TopicsPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [topicToDelete, setTopicToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const { useTopicsQuery, addTopic, deleteTopic, isLoading } = useTopics();
  const { data: topics = [], error, refetch } = useTopicsQuery();

  const columns = useMemo(
    () => [
      columnHelper.accessor('topic', {
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
          <div className="flex space-x-2">
            <button
              onClick={() => navigate(`/admin/topics/${row.original.id}`)}
              className="bg-white border border-black rounded-full px-6 py-2 text-sm font-medium text-black hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Open
            </button>

            <button
              onClick={() => handleDeleteClick(row.original)}
              className="bg-white border border-red-600 text-red-600 rounded-full px-4 py-1 text-sm font-medium hover:bg-red-50 transition-colors cursor-pointer"
              title="Delete topic"
            >
              <Icon icon="mdi:delete" className="w-4 h-4" />
            </button>
          </div>

        ),
      }),
    ],
    [navigate]
  );

  const table = useReactTable({
    data: topics,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleAddTopic = async (topicData) => {
    try {
      await addTopic(topicData);
      setShowAddModal(false);
    } catch (error) {
      console.error('Error adding topic:', error);
      // You can add error handling UI here
    }
  };

  const handleDeleteClick = (topic) => {
    setTopicToDelete(topic);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!topicToDelete) return;
    
    setIsDeleting(true);
    try {
      await deleteTopic(topicToDelete.id);
      setShowDeleteModal(false);
      setTopicToDelete(null);
    } catch (error) {
      console.error('Error deleting topic:', error);
      // You can add error handling UI here
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setTopicToDelete(null);
  };



  if (error) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Error loading topics: {error.message}</p>
          <button
            onClick={() => refetch()}
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-black">Topics Management</h1>
        <button
          onClick={() => setShowAddModal(true)}
          disabled={isLoading}
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

        {topics.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <Icon icon="mdi:folder-open-outline" className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No topics yet</p>
            <p className="text-gray-400 mt-1">Create your first topic to get started</p>
          </div>
        )}

        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto"></div>
            <p className="text-gray-500 mt-4">Loading topics...</p>
          </div>
        )}
      </div>

      {showAddModal && (
        <AddTopicModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddTopic}
          isLoading={isLoading}
        />
      )}

{showDeleteModal && (
        <DeleteConfirmationModal
          isOpen={showDeleteModal}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          isDeleting={isDeleting}
          itemName={topicToDelete?.topic}
          message="This will also delete all subtopics associated with this topic. This action cannot be undone."
        />
      )}
    </div>
  );
};

export default TopicsPage;
