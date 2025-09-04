import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const resetPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const ResetPassword = () => {
  const initialValues = {
    email: '',
  };

  const handleSubmit = (values, { setSubmitting }) => {
    // Handle reset password logic here
    console.log('Reset password for:', values.email);
    // Simulate API call
    setTimeout(() => {
      alert('Password reset instructions have been sent to your email.');
      setSubmitting(false);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4"
    >
      {/* Reset Password Form Container */}
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Reset Your Password</h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            We'll email you instructions to reset your password. If you don't have access to 
            your email contact the{' '}
            <span className="text-yellow-600 font-medium underline underline-offset-2">our support team</span>.
          </p>
        </div>
        
        {/* Formik Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={resetPasswordSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Username (*please use your email)
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-gray-900"
                />
                <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-600" />
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                {/* Reset Password Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-4 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
                >
                  {isSubmitting ? 'Sending...' : 'Reset password'}
                </button>
                
                {/* Return to Login Button */}
                <Link
                  to="/login"
                  className="flex-1 text-center py-3 px-4 text-black underline underline-offset-5 cursor-pointer font-medium hover:text-gray-900 transition-colors focus:outline-none focus:underline"
                >
                  Return to login
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </motion.div>
  );
};

export default ResetPassword;