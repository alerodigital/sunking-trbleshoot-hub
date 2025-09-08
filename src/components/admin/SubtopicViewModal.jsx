// components/admin/SubtopicViewModal.jsx
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import SafeHTMLRenderer from '../common/SafeHTMLRenderer';

const SubtopicViewModal = ({ isOpen, onClose, subtopic, onEdit, onDelete, canEdit = false, isDeleting = false  }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!isOpen || !subtopic) return null;

  const { title, content, formLinks = [], id, updatedAt } = subtopic;

  const handleDelete = () => {
    onDelete(id);
    setShowDeleteConfirm(false);
    // onClose();
  };

  const handleEdit = () => {
    onEdit(subtopic);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Yellow Header Bar */}
        <div className="bg-yellow-400 h-2 rounded-t-lg"></div>
        
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-black">{title}</h2>
            <p className="text-gray-600 mt-1">Subtopic Details</p>
          </div>
          <div className="flex items-center space-x-2">
            {canEdit && (
              <>
                <button
                  onClick={handleEdit}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                  title="Edit subtopic"
                >
                  <Icon icon="mdi:pencil" className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  title="Delete subtopic"
                >
                  <Icon icon="mdi:delete" className="w-5 h-5" />
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <Icon icon="mdi:close" className="w-6 h-6 text-black" />
            </button>
          </div>
        </div>
        
        {/* Modal Content */}
        <div className="p-6">
          {/* Content Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
              <Icon icon="mdi:text-box" className="w-5 h-5 mr-2 text-gray-500" />
              Content
            </h3>
            {content ? (
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <SafeHTMLRenderer 
                  html={content} 
                  className="rich-text-content"
                />
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border border-gray-200">
                <Icon icon="mdi:file-document-outline" className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">No content available for this subtopic.</p>
                {canEdit && (
                  <p className="text-sm mt-2">Click the edit button to add content.</p>
                )}
              </div>
            )}
          </div>

          {/* Form Links Section */}
          {formLinks && formLinks.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
                <Icon icon="mdi:link" className="w-5 h-5 mr-2 text-gray-500" />
                Form Links ({formLinks.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formLinks.map((form, index) => (
                  <div key={index} className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="flex items-start mb-3">
                      <div className="bg-blue-100 p-2 rounded-lg mr-3">
                        <Icon icon="mdi:google-drive" className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-blue-900 truncate">{form.name}</h4>
                        <p className="text-sm text-blue-700 truncate">{form.url}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <a
                        href={form.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        <Icon icon="mdi:open-in-new" className="w-4 h-4 mr-2" />
                        Open Form
                      </a>
                      <button
                        onClick={() => navigator.clipboard.writeText(form.url)}
                        className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                        title="Copy link"
                      >
                        <Icon icon="mdi:content-copy" className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Form Links Message */}
          {(!formLinks || formLinks.length === 0) && (
            <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border border-gray-200">
              <Icon icon="mdi:link-off" className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No form links available for this subtopic.</p>
              {canEdit && (
                <p className="text-sm mt-2">Click the edit button to add form links.</p>
              )}
            </div>
          )}
        </div>
        
        {/* Modal Footer */}
        <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50 rounded-b-lg">
          <div className="text-sm text-gray-500">
            Last updated: {formatDate(updatedAt)}
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              disabled={isDeleting}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-black mb-2">Confirm Delete</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this subtopic? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center disabled:opacity-50"
                >
                  {isDeleting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Icon icon="mdi:delete" className="w-4 h-4 mr-2" />
                      Delete
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubtopicViewModal;