import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  topic: Yup.string()
    .required('Topic name is required')
    .min(2, 'Topic name must be at least 2 characters'),
});

const EditTopicModal = ({ isOpen, onClose, onSubmit, isLoading, initialData }) => {
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const initialValues = {
    topic: initialData?.topic || '',
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      setError('');
      await onSubmit(values);
      resetForm();
      onClose();
    } catch (error) {
      setError(error.message || 'Failed to update topic. Please try again.');
    }
  };

  const handleClose = () => {
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-black">Edit Topic</h2>
          <button
            onClick={handleClose}
            className="text-black hover:text-gray-600 cursor-pointer"
            disabled={isLoading}
          >
            <Icon icon="mdi:close" className="w-6 h-6" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Topic Name *
                </label>
                <Field
                  name="topic"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent cursor-text"
                  placeholder="Enter topic name"
                  disabled={isLoading}
                />
                <ErrorMessage
                  name="topic"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isLoading}
                  className="px-4 py-2 text-sm font-medium text-black bg-white border border-black rounded-lg hover:bg-gray-50 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading || isSubmitting}
                  className="px-4 py-2 text-sm font-medium text-black bg-yellow-400 rounded-lg hover:bg-yellow-500 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading || isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                      Updating...
                    </>
                  ) : (
                    'Update Topic'
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditTopicModal;