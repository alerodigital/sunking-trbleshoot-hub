import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
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
            <div className="text-base text-black truncate">
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
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-black">Topic not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-black">{currentTopic.title}</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-full flex items-center space-x-2 transition-colors cursor-pointer shadow-sm"
        >
          <Icon icon="mdi:plus" className="w-5 h-5" />
          <span>Add New Subtopic</span>
        </button>
      </div>

      {/* Subtopics Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-white border-b border-gray-100">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-8 py-6 text-left text-base font-semibold text-black"
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
          <tbody className="bg-white">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row, index) => (
                <tr
                  key={row.id}
                  className={`hover:bg-gray-50 transition-colors ${
                    index !== table.getRowModel().rows.length - 1
                      ? 'border-b border-gray-100'
                      : ''
                  }`}
                >
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-8 py-6">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-8 py-12 text-center text-black">
                  No subtopics found for this topic.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Subtopic Modal */}
      <AddSubtopicModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddSubtopic}
      />
    </div>
  );
};

export default TopicDetailPage;
