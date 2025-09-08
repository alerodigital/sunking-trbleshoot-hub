// components/admin/DeleteConfirmationModal.jsx
import React from 'react';
import { Icon } from '@iconify/react';

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
  itemName,
  message = "Are you sure you want to delete this item? This action cannot be undone."
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center mb-4">
          <div className="bg-red-100 p-2 rounded-full mr-3">
            <Icon icon="mdi:alert-circle" className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-black">Confirm Delete</h3>
        </div>
        
        <p className="text-gray-600 mb-2">
          {message}
        </p>
        
        {itemName && (
          <p className="text-gray-800 font-medium mb-4">
            Topic: "{itemName}"
          </p>
        )}

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
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
  );
};

export default DeleteConfirmationModal;