import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';

import { useTopics } from '../../hooks/useTopics'; // Import topics hook
import { useSubtopics } from '../../hooks/useSubtopics'; // Import subtopics hook
import AddSubtopicModal from '../../components/admin/AddSubtopicModal.jsx';
import SafeHTMLRenderer from '../../components/common/SafeHTMLRenderer.jsx';
import SubtopicViewModal from '../../components/admin/SubtopicViewModal';
import EditSubtopicModal from '../../components/admin/EditSubtopicModal';

const columnHelper = createColumnHelper();

const TopicDetailPage = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  // const [subtopics, setSubtopics] = useState(subtopicsData[topicId] || []);

// Get the current topic
const { useTopicsQuery } = useTopics();
const { data: topics = [] } = useTopicsQuery();
const currentTopic = topics.find(topic => topic.id === topicId);

// Get subtopics for this topic
const { useSubtopicsQuery, addSubtopic, updateSubtopic, 
  deleteSubtopic, 
  isLoading: isSubtopicsLoading,
  isAdding,
  isUpdating,
  isDeleting  } = useSubtopics(topicId);
const { data: subtopics = [], error, refetch } = useSubtopicsQuery();

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
      columnHelper.accessor('content', {
        header: 'Description',
        cell: info => (
          <div className="max-w-md">
             <SafeHTMLRenderer
        html={info.getValue()}
        className="text-base text-black whitespace-normal break-words"
      />
          </div>
        ),
      }),
      columnHelper.display({
        id: 'action',
        header: 'Action',
        cell: ({ row }) => (
          <button 
          onClick={() => {
            setSelectedSubtopic(row.original);
            setShowViewModal(true);
          }}
          className="bg-white border border-black rounded-full px-6 py-2 text-sm font-medium text-black hover:bg-gray-50 transition-colors cursor-pointer">
            View More
          </button>
        ),
      }),
    ],
    [navigate, topicId]
  );

  const table = useReactTable({
    data: subtopics,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // const handleAddSubtopic = (subtopicData) => {
  //   const newSubtopic = {
  //     id: `${topicId}-${Date.now()}`,
  //     title: subtopicData.title,
  //     description: subtopicData.description || subtopicData.title,
  //     content: subtopicData.content || '',
  //     formLinks: subtopicData.formLinks || []
  //   };
  //   setSubtopics(prev => [...prev, newSubtopic]);
  // };

  const handleAddSubtopic = async (subtopicData) => {
    try {
      await addSubtopic(subtopicData);
      setShowAddModal(false);
    } catch (error) {
      console.error('Error adding subtopic:', error);
      // You can add error handling UI here
    }
  };

  const handleEditSubtopic = async (subtopicId, updates) => {
    try {
      await updateSubtopic({ id: subtopicId, updates });
      setShowEditModal(false);
      setSelectedSubtopic(null);
    } catch (error) {
      console.error('Error updating subtopic:', error);
    }
  };

  const handleDeleteSubtopic = async (subtopicId) => {
    try {
      await deleteSubtopic(subtopicId);
      setShowViewModal(false);
      setSelectedSubtopic(null);
    } catch (error) {
      console.error('Error deleting subtopic:', error);
    }
  };

  const handleEdit = (subtopic) => {
    setSelectedSubtopic(subtopic);
    setShowViewModal(false);
    setShowEditModal(true);
  };

  if (error) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Error loading subtopics: {error.message}</p>
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

  // if (!currentTopic) {
  //   return (
  //     <div className="p-4 sm:p-6 lg:p-8">
  //       <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
  //         <button
  //           onClick={() => navigate('/admin/topics')}
  //           className="mr-0 sm:mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
  //         >
  //           <Icon icon="mdi:arrow-left" className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
  //         </button>
  //         <div className="flex-1 min-w-0">
  //           <h1 className="text-2xl sm:text-3xl font-bold text-black">
  //             {currentTopic ? currentTopic.title : 'Topic Details'}
  //           </h1>
  //           <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
  //             {currentTopic ? currentTopic.description : 'Manage subtopics for this topic'}
  //           </p>
  //         </div>
  //         <button
  //           onClick={() => setShowAddModal(true)}
  //           className="bg-yellow-400 text-black px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold hover:bg-yellow-500 transition-colors flex items-center space-x-2 cursor-pointer text-sm sm:text-base w-full sm:w-auto justify-center"
  //         >
  //           <Icon icon="mdi:plus" className="w-4 h-4 sm:w-5 sm:h-5" />
  //           <span className="hidden sm:inline">Add Subtopic</span>
  //           <span className="sm:hidden">Add Subtopic</span>
  //         </button>
  //       </div>

  //       <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
  //         <div className="overflow-x-auto">
  //           <table className="w-full min-w-[600px]">
  //             <thead className="bg-gray-50 border-b border-gray-200">
  //               {table.getHeaderGroups().map(headerGroup => (
  //                 <tr key={headerGroup.id}>
  //                   {headerGroup.headers.map(header => (
  //                     <th
  //                       key={header.id}
  //                       className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-black uppercase tracking-wider"
  //                     >
  //                       {header.isPlaceholder
  //                         ? null
  //                         : flexRender(
  //                             header.column.columnDef.header,
  //                             header.getContext()
  //                           )}
  //                     </th>
  //                   ))}
  //                 </tr>
  //               ))}
  //             </thead>
  //             <tbody className="bg-white divide-y divide-gray-200">
  //               {table.getRowModel().rows.map(row => (
  //                 <tr key={row.id} className="hover:bg-gray-50 transition-colors">
  //                   {row.getVisibleCells().map(cell => (
  //                     <td key={cell.id} className="px-4 sm:px-6 py-3 sm:py-4">
  //                       {flexRender(cell.column.columnDef.cell, cell.getContext())}
  //                     </td>
  //                   ))}
  //                 </tr>
  //               ))}
  //             </tbody>
  //           </table>
  //         </div>
  //       </div>

  //       {showAddModal && (
  //         <AddSubtopicModal
  //           isOpen={showAddModal}
  //           onClose={() => setShowAddModal(false)}
  //           onSubmit={handleAddSubtopic}
  //           topicId={topicId}
  //         />
  //       )}
  //     </div>
  //   );
  // }

  if (!currentTopic) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/admin/topics')}
            className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <Icon icon="mdi:arrow-left" className="w-6 h-6 text-black" />
          </button>
          <h1 className="text-2xl font-bold text-black">Topic Not Found</h1>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
          <p className="text-gray-600">The requested topic could not be found.</p>
          <button
            onClick={() => navigate('/admin/topics')}
            className="mt-4 bg-yellow-400 text-black px-4 py-2 rounded-full font-semibold hover:bg-yellow-500 transition-colors"
          >
            Back to Topics
          </button>
        </div>
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
            {currentTopic.topic}
          </h1>
          {/* <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
            {currentTopic.description}
          </p> */}
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

        {isSubtopicsLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto"></div>
              <p className="text-gray-500 mt-4">Loading subtopics...</p>
            </div>
          </div>
        )}
      </div>

      {showAddModal && (
        <AddSubtopicModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddSubtopic}
          topicId={topicId}
          isLoading={isAdding}
        />
      )}

      {/* Edit Subtopic Modal */}
      <EditSubtopicModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedSubtopic(null);
        }}
        subtopic={selectedSubtopic}
        onSave={handleEditSubtopic}
        isLoading={isUpdating}
      />

      {/* Subtopic View Modal */}
      <SubtopicViewModal
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false);
          setSelectedSubtopic(null);
        }}
        subtopic={selectedSubtopic}
        canEdit={true} // Set based on user permissions
        onEdit={handleEdit}
        onDelete={handleDeleteSubtopic}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default TopicDetailPage;
