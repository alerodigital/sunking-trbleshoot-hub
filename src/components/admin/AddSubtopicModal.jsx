// AddSubtopicModal.jsx
import React, { useCallback, useState } from 'react';
import { Icon } from '@iconify/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import RichTextEditor from './RichTextEditor2';

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required').min(2, 'Title must be at least 2 characters'),
  content: Yup.string(),
  formLinksEnabled: Yup.boolean(),
  formLink1Name: Yup.string().when('formLinksEnabled', {
    is: true,
    then: (schema) => schema,
    otherwise: (schema) => schema
  }),
  formLink1Url: Yup.string().when(['formLinksEnabled', 'formLink1Name'], {
    is: (formLinksEnabled, formLink1Name) => formLinksEnabled && formLink1Name,
    then: (schema) => schema.url('Must be a valid URL'),
    otherwise: (schema) => schema
  }),
  formLink2Name: Yup.string(),
  formLink2Url: Yup.string().when(['formLinksEnabled', 'formLink2Name'], {
    is: (formLinksEnabled, formLink2Name) => formLinksEnabled && formLink2Name,
    then: (schema) => schema.url('Must be a valid URL'),
    otherwise: (schema) => schema
  }),
  formLink3Name: Yup.string(),
  formLink3Url: Yup.string().when(['formLinksEnabled', 'formLink3Name'], {
    is: (formLinksEnabled, formLink3Name) => formLinksEnabled && formLink3Name,
    then: (schema) => schema.url('Must be a valid URL'),
    otherwise: (schema) => schema
  }),
  formLink4Name: Yup.string(),
  formLink4Url: Yup.string().when(['formLinksEnabled', 'formLink4Name'], {
    is: (formLinksEnabled, formLink4Name) => formLinksEnabled && formLink4Name,
    then: (schema) => schema.url('Must be a valid URL'),
    otherwise: (schema) => schema
  }),
  formLink5Name: Yup.string(),
  formLink5Url: Yup.string().when(['formLinksEnabled', 'formLink5Name'], {
    is: (formLinksEnabled, formLink5Name) => formLinksEnabled && formLink5Name,
    then: (schema) => schema.url('Must be a valid URL'),
    otherwise: (schema) => schema
  }),
  formLink6Name: Yup.string(),
  formLink6Url: Yup.string().when(['formLinksEnabled', 'formLink6Name'], {
    is: (formLinksEnabled, formLink6Name) => formLinksEnabled && formLink6Name,
    then: (schema) => schema.url('Must be a valid URL'),
    otherwise: (schema) => schema
  })
});

const AddSubtopicModal = ({ isOpen, onClose, onSubmit, topicId, isLoading }) => {
  const [error, setError] = useState('');

  const initialValues = {
    title: '',
    content: '',
    formLinksEnabled: true,
    formLink1Name: '',
    formLink1Url: '',
    formLink2Name: '',
    formLink2Url: '',
    formLink3Name: '',
    formLink3Url: '',
    formLink4Name: '',
    formLink4Url: '',
    formLink5Name: '',
    formLink5Url: '',
    formLink6Name: '',
    formLink6Url: ''
  };

  const handleFormSubmit = useCallback(async (values, { resetForm }) => {
    try {
      setError('');

      const formLinks = [];
      if (values.formLinksEnabled) {
        // Add all form links that have both name and URL
        for (let i = 1; i <= 6; i++) {
          const name = values[`formLink${i}Name`];
          const url = values[`formLink${i}Url`];
          if (name && url) {
            formLinks.push({ name, url });
          }
        }
      }

      const subtopicData = {
        title: values.title,
        content: values.content,
        formLinks
      };

      await onSubmit(subtopicData);
      resetForm();
      onClose();
    } catch (error) {
      console.error('Error submitting subtopic:', error);
      setError(error.message || 'Failed to add subtopic. Please try again.');
    }
  }, [onSubmit, onClose]);

  const handleClose = useCallback(() => {
    setError('');
    onClose();
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl max-h-[95vh] overflow-y-auto shadow-2xl">
        {/* Yellow Header Bar */}
        <div className="bg-yellow-400 h-2 rounded-t-lg"></div>

        {/* Modal Header with Close Button */}
        <div className="flex justify-between items-center p-4 sm:p-6 lg:p-8 pb-2 sm:pb-3 lg:pb-4">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black">Add Subtopic</h2>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            type="button"
          >
            <Icon icon="mdi:close" className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({ values, setFieldValue, isSubmitting }) => (
              <Form className="space-y-8">
                {/* Title Field */}
                <div>
                  <label className="block text-base font-semibold text-black mb-3">
                    Title (*please enter the question or statement)
                  </label>
                  <Field
                    name="title"
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-black text-base"
                    placeholder="Enter the question or statement"
                    disabled={isLoading}
                  />
                  <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Contents Field */}
                <div>
                  <label className="block text-base font-semibold text-gray-900 mb-3">
                    Contents
                  </label>
                  <div>
                    <RichTextEditor
                      value={values.content}
                      onChange={useCallback((content) => setFieldValue('content', content), [setFieldValue])}
                      placeholder="Enter detailed content here..."
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Google Form Links Section */}
                <div className="space-y-5">
                  <div>
                    <h3 className="text-xl font-bold text-black mb-4">Google Form Links</h3>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-black">Are you adding links to forms?</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <Field
                          name="formLinksEnabled"
                          type="checkbox"
                          className="sr-only peer"
                          disabled={isLoading}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                      </label>
                      <span className="text-sm font-semibold text-black">On</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Form Link 1 */}
                    <div>
                      <h4 className="text-base font-semibold text-black mb-3">Form Link 1</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-black mb-2">Link name</label>
                          <Field
                            name="formLink1Name"
                            type="text"
                            disabled={!values.formLinksEnabled || isLoading}
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-black text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                            placeholder="Enter link name"
                          />
                          <ErrorMessage name="formLink1Name" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-black mb-2">Google Form Link</label>
                          <Field
                            name="formLink1Url"
                            type="url"
                            disabled={!values.formLinksEnabled || isLoading}
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-black text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                            placeholder="https://forms.google.com/..."
                          />
                          <ErrorMessage name="formLink1Url" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                      </div>
                    </div>

                    {/* Form Link 2 */}
                    <div>
                      <h4 className="text-base font-semibold text-black mb-3">Form Link 2</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-black mb-2">Link name</label>
                          <Field
                            name="formLink2Name"
                            type="text"
                            disabled={!values.formLinksEnabled || isLoading}
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-black text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                            placeholder="Enter link name"
                          />
                          <ErrorMessage name="formLink2Name" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-black mb-2">Google Form Link</label>
                          <Field
                            name="formLink2Url"
                            type="url"
                            disabled={!values.formLinksEnabled || isLoading}
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-black text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                            placeholder="https://forms.google.com/..."
                          />
                          <ErrorMessage name="formLink2Url" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                      </div>
                    </div>

                    {/* Form Link 3 */}
                    <div>
                      <h4 className="text-base font-semibold text-black mb-3">Form Link 3</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-black mb-2">Link name</label>
                          <Field
                            name="formLink3Name"
                            type="text"
                            disabled={!values.formLinksEnabled || isLoading}
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-black text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                            placeholder="Enter link name"
                          />
                          <ErrorMessage name="formLink3Name" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-black mb-2">Google Form Link</label>
                          <Field
                            name="formLink3Url"
                            type="url"
                            disabled={!values.formLinksEnabled || isLoading}
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-black text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                            placeholder="https://forms.google.com/..."
                          />
                          <ErrorMessage name="formLink3Url" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                      </div>
                    </div>

                    {/* Form Link 4 */}
                    <div>
                      <h4 className="text-base font-semibold text-black mb-3">Form Link 4</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-black mb-2">Link name</label>
                          <Field
                            name="formLink4Name"
                            type="text"
                            disabled={!values.formLinksEnabled || isLoading}
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-black text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                            placeholder="Enter link name"
                          />
                          <ErrorMessage name="formLink4Name" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-black mb-2">Google Form Link</label>
                          <Field
                            name="formLink4Url"
                            type="url"
                            disabled={!values.formLinksEnabled || isLoading}
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-black text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                            placeholder="https://forms.google.com/..."
                          />
                          <ErrorMessage name="formLink4Url" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                      </div>
                    </div>

                    {/* Form Link 5 */}
                    <div>
                      <h4 className="text-base font-semibold text-black mb-3">Form Link 5</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-black mb-2">Link name</label>
                          <Field
                            name="formLink5Name"
                            type="text"
                            disabled={!values.formLinksEnabled || isLoading}
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-black text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                            placeholder="Enter link name"
                          />
                          <ErrorMessage name="formLink5Name" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-black mb-2">Google Form Link</label>
                          <Field
                            name="formLink5Url"
                            type="url"
                            disabled={!values.formLinksEnabled || isLoading}
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-black text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                            placeholder="https://forms.google.com/..."
                          />
                          <ErrorMessage name="formLink5Url" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                      </div>
                    </div>

                    {/* Form Link 6 */}
                    <div>
                      <h4 className="text-base font-semibold text-black mb-3">Form Link 6</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-black mb-2">Link name</label>
                          <Field
                            name="formLink6Name"
                            type="text"
                            disabled={!values.formLinksEnabled || isLoading}
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-black text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                            placeholder="Enter link name"
                          />
                          <ErrorMessage name="formLink6Name" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-black mb-2">Google Form Link</label>
                          <Field
                            name="formLink6Url"
                            type="url"
                            disabled={!values.formLinksEnabled || isLoading}
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-black text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                            placeholder="https://forms.google.com/..."
                          />
                          <ErrorMessage name="formLink6Url" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleClose}
                    disabled={isLoading}
                    className="px-6 py-2.5 text-sm font-medium text-black bg-white border border-black rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading || isSubmitting}
                    className="px-6 py-2.5 text-sm font-semibold text-black bg-yellow-400 rounded-full hover:bg-yellow-500 flex items-center space-x-2 transition-colors cursor-pointer"
                  >
                    {isLoading || isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                        Adding...
                      </>
                    ) : (
                      <>
                        <Icon icon="mdi:plus" className="w-4 h-4" />
                        <span>Add New Subtopic</span>
                      </>
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddSubtopicModal;