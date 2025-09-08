import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../hooks/useAuth'; // Import the hook

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { signIn, isLoading, useCurrentUser } = useAuth(); // Get the signIn function and loading state from the hook
  const { data: user } = useCurrentUser();

  const initialValues = {
    email: '',
    password: '',
  };

   // Redirect if already logged in
   useEffect(() => {
    if (user) {
      navigate('/admin');
    }
  }, [user, navigate]);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      // Use the signIn function from our hook
      await signIn(values);

      // On successful login, navigate to admin page
      // navigate('/admin');
      // setSubmitting(false);
    } catch (error) {
      console.error('Login error:', error);

      // Handle specific Firebase auth errors
      switch (error.code) {
        case 'auth/invalid-email':
          setErrors({ email: 'Invalid email address' });
          break;
        case 'auth/user-disabled':
          setErrors({ email: 'This account has been disabled' });
          break;
        case 'auth/user-not-found':
          setErrors({ email: 'No account found with this email' });
          break;
        case 'auth/wrong-password':
          setErrors({ password: 'Incorrect password' });
          break;
        default:
          setErrors({ email: 'Failed to login. Please try again.' });
      }

    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4"
    >
      {/* Login Form Container */}
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        {/* Sun King Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center mb-4">
            <img src="/logo.png" alt="Sun King" className="h-12 w-full mr-3" />
          </div>
        </div>

        {/* Formik Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form className="space-y-6">
              {/* Display general error */}
              {errors.general && (
                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {errors.general}
                </div>
              )}
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Username (*please use your email)
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="j******k@company.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-gray-900"
                />
                <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-600" />
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Field
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-gray-900 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {showPassword ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      )}
                    </svg>
                  </button>
                </div>
                <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-600" />
              </div>

              {/* Forgotten Password Link */}
              <div className="text-right">
                <Link
                  to="/reset-password"
                  className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Forgotten password?
                </Link>
              </div>

                      {/** register */}
              <div className="text-center pt-4">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link
                    to="/register"
                    className="font-medium text-yellow-600 hover:text-yellow-500 transition-colors"
                  >
                    Create account
                  </Link>
                </p>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-4 cursor-pointer rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
                >
                  {isSubmitting || isLoading ? 'Logging in...' : 'Login'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </motion.div>
  );
};

export default Login;
