import React from 'react';
import { Icon } from '@iconify/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  topicName: Yup.string().required('Topic name is required')
});

const AddTopicModal = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  const initialValues = {
    topicName: ''
  };

  const handleFormSubmit = (values, { resetForm }) => {
    if (onSubmit) {
      onSubmit(values);
    }
    resetForm();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/95 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-black">Add New Topic</h2>
          <button
            onClick={onClose}
            className="text-black hover:text-gray-600 cursor-pointer"
          >
            <Icon icon="mdi:close" className="w-6 h-6" />
          </button>
        </div>
        
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          <Form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Topic Name
              </label>
              <Field
                name="topicName"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent cursor-text"
                placeholder="Enter topic name"
              />
              <ErrorMessage name="topicName" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-black bg-white border border-black rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-black bg-yellow-400 rounded-lg hover:bg-yellow-500 cursor-pointer transition-colors"
              >
                Add Topic
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AddTopicModal;
