import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft, Mail, Clock, MapPin, Calendar } from 'lucide-react';

const RegistrationSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { event, paymentId } = location.state || {};

  useEffect(() => {
    // If no event data is passed, redirect to events page
    if (!event) {
      navigate('/events');
    }
  }, [event, navigate]);

  if (!event) {
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center"
    >
      <div className="max-w-3xl w-full">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 dark:bg-green-900/30">
              <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">Registration Successful!</h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Thank you for registering for <span className="font-semibold text-blue-600 dark:text-blue-400">{event.title}</span>.
            </p>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Your payment ID: <span className="font-mono text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{paymentId || 'N/A'}</span>
            </p>

            {/* Event Details Card */}
            <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 text-left">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Event Details</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 mt-1 mr-3 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Date & Time</p>
                    <p className="font-medium text-gray-900 dark:text-white">{event.date} • {event.time}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mt-1 mr-3 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                    <p className="font-medium text-gray-900 dark:text-white">{event.location}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="w-5 h-5 mt-1 mr-3 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Reporting Time</p>
                    <p className="font-medium text-gray-900 dark:text-white">Please arrive 30 minutes before the event starts</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-white dark:bg-gray-700 rounded-lg border border-blue-100 dark:border-blue-800">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">What's Next?</h3>
                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>You'll receive a confirmation email with all the details</li>
                  <li>Save this payment ID for future reference</li>
                  <li>Bring a valid ID to the event for verification</li>
                </ul>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigate('/events')}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Events
              </button>
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
              >
                Go to Homepage
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RegistrationSuccess;
