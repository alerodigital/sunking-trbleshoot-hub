import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import { topicsTableData } from '../../data/topicsTableData.js';
import { subtopicsData } from '../../data/subtopicsData.js';
import AddSubtopicModal from '../../components/admin/AddSubtopicModal.jsx';

const columnHelper = createColumnHelper();

const TopicDetailPage = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [subtopics, setSubtopics] = useState(subtopicsData[topicId] || []);

  // Find the current topic
  const currentTopic = topicsTableData.find(topic => topic.id === topicId);

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
      columnHelper.accessor('description', {
        header: 'Description',
        cell: info => (
          <div className="max-w-md">
            <div className="text-base text-black whitespace-normal break-words">
              {info.getValue()}
            </div>
          </div>
        ),
      }),
      columnHelper.display({
        id: 'action',
        header: 'Action',
        cell: () => (
          <button className="bg-white border border-black rounded-full px-6 py-2 text-sm font-medium text-black hover:bg-gray-50 transition-colors cursor-pointer">
            View More
          </button>
        ),
      }),
    ],
    []
  );

  const table = useReactTable({
    data: subtopics,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleAddSubtopic = (subtopicData) => {
    const newSubtopic = {
      id: `${topicId}-${Date.now()}`,
      title: subtopicData.title,
      description: subtopicData.description || subtopicData.title,
      content: subtopicData.content || '',
      formLinks: subtopicData.formLinks || []
    };
    setSubtopics(prev => [...prev, newSubtopic]);
  };

  if (!currentTopic) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
          <button
            onClick={() => navigate('/admin/topics')}
            className="mr-0 sm:mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <Icon icon="mdi:arrow-left" className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-black">
              {currentTopic ? currentTopic.title : 'Topic Details'}
            </h1>
            <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
              {currentTopic ? currentTopic.description : 'Manage subtopics for this topic'}
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-yellow-400 text-black px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold hover:bg-yellow-500 transition-colors flex items-center space-x-2 cursor-pointer text-sm sm:text-base w-full sm:w-auto justify-center"
          >
            <Icon icon="mdi:plus" className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Add Subtopic</span>
            <span className="sm:hidden">Add Subtopic</span>
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
          <AddSubtopicModal
            isOpen={showAddModal}
            onClose={() => setShowAddModal(false)}
            onSubmit={handleAddSubtopic}
            topicId={topicId}
          />
        )}
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
        <button
          onClick={() => navigate('/admin/topics')}
          className="mr-0 sm:mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
        >
          <Icon icon="mdi:arrow-left" className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-black">
            {currentTopic.title}
          </h1>
          <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
            {currentTopic.description}
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-yellow-400 text-black px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold hover:bg-yellow-500 transition-colors flex items-center space-x-2 cursor-pointer text-sm sm:text-base w-full sm:w-auto justify-center"
        >
          <Icon icon="mdi:plus" className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline">Add Subtopic</span>
          <span className="sm:hidden">Add Subtopic</span>
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
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`hover:bg-gray-50 transition-colors ${
                      index !== table.getRowModel().rows.length - 1
                        ? 'border-b border-gray-200'
                        : ''
                    }`}
                  >
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className="px-4 sm:px-6 py-3 sm:py-4">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-4 sm:px-6 py-12 text-center text-black">
                    No subtopics found for this topic.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <AddSubtopicModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddSubtopic}
          topicId={topicId}
        />
      )}
    </div>
  );
};

export default TopicDetailPage;
