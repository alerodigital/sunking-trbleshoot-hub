// components/admin/EditSubtopicModal.jsx
import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import RichTextEditor from './RichTextEditor2';

const validationSchema = Yup.object({
  title: Yup.string()
    .required('Title is required')
    .min(2, 'Title must be at least 2 characters'),
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

const EditSubtopicModal = ({ isOpen, onClose, subtopic, onSave, isLoading }) => {
  const [error, setError] = useState('');

  if (!isOpen || !subtopic) return null;

  // Prepare initial values from the subtopic
  const getInitialValues = () => {
    const formLinks = subtopic.formLinks || [];
    return {
      title: subtopic.title || '',
      content: subtopic.content || '',
      formLinksEnabled: formLinks.length > 0,
      formLink1Name: formLinks[0]?.name || '',
      formLink1Url: formLinks[0]?.url || '',
      formLink2Name: formLinks[1]?.name || '',
      formLink2Url: formLinks[1]?.url || '',
      formLink3Name: formLinks[2]?.name || '',
      formLink3Url: formLinks[2]?.url || '',
      formLink4Name: formLinks[3]?.name || '',
      formLink4Url: formLinks[3]?.url || '',
      formLink5Name: formLinks[4]?.name || '',
      formLink5Url: formLinks[4]?.url || '',
      formLink6Name: formLinks[5]?.name || '',
      formLink6Url: formLinks[5]?.url || ''
    };
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      setError('');

      const formLinks = [];
      if (values.formLinksEnabled) {
        if (values.formLink1Name && values.formLink1Url) {
          formLinks.push({
            name: values.formLink1Name,
            url: values.formLink1Url
          });
        }
        if (values.formLink2Name && values.formLink2Url) {
          formLinks.push({
            name: values.formLink2Name,
            url: values.formLink2Url
          });
        }
      }

      const subtopicData = {
        title: values.title,
        description: values.title,
        content: values.content,
        formLinks
      };

      await onSave(subtopic.id, subtopicData);
      resetForm();
      onClose();
    } catch (error) {
      // console.error('Error updating subtopic:', error);
      setError(error.message || 'Failed to update subtopic. Please try again.');
    }
  };

  const handleClose = () => {
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[95vh] overflow-y-auto shadow-2xl">
        {/* Yellow Header Bar */}
        <div className="bg-yellow-400 h-2 rounded-t-lg"></div>

        {/* Modal Header with Close Button */}
        <div className="flex justify-between items-center p-6 pb-4">
          <h2 className="text-2xl font-bold text-black">Edit Subtopic</h2>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            type="button"
          >
            <Icon icon="mdi:close" className="w-6 h-6 text-black" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="px-6 pb-6">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <Formik
            initialValues={getInitialValues()}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
            enableReinitialize
          >
            {({ values, setFieldValue, isSubmitting }) => (
              <Form className="space-y-6">
                {/* Title Field */}
                <div>
                  <label className="block text-base font-semibold text-black mb-3">
                    Title (*please enter the question or statement)
                  </label>
                  <Field
                    name="title"
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-black text-base disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                  <RichTextEditor
                    value={values.content}
                    onChange={(content) => setFieldValue('content', content)}
                    placeholder="Enter detailed content here..."
                    disabled={isLoading}
                  />
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
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"></div>
                      </label>
                      <span className="text-sm font-semibold text-black">On</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    {/** form link 2 */}
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

                    {/** form link 3 */}
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

                    {/** form link 4 */}
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

                    {/** form link 5 */}
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
                          <ErrorMessage name="formLink2Name" component="div" className="text-red-500 text-sm mt-1" />
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

                    {/** form link 6 */}
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
                          <ErrorMessage name="formLink2Name" component="div" className="text-red-500 text-sm mt-1" />
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
                    className="px-6 py-2.5 text-sm font-medium text-black bg-white border border-black rounded-md hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading || isSubmitting}
                    className="px-6 py-2.5 text-sm font-semibold text-black bg-yellow-400 rounded-full hover:bg-yellow-500 flex items-center space-x-2 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading || isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                        Updating...
                      </>
                    ) : (
                      <>
                        <Icon icon="mdi:content-save" className="w-4 h-4" />
                        <span>Update Subtopic</span>
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

export default EditSubtopicModal;