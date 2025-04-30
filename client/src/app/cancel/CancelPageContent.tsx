'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const CancelPageContent = () => {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session_id = searchParams.get('session_id');
    if (!session_id) {
      setLoading(false);
      return;
    }

    const fetchSessionStatus = async () => {
      try {
        const response = await fetch(`http://localhost:5000/session-status?session_id=${session_id}`);
        const data = await response.json();
        setStatus(data.status || 'canceled');
        setError(data.error_message || 'Payment was not completed');
      } catch (err) {
        console.error('Error fetching session status:', err);
        setError('Failed to retrieve payment details');
      } finally {
        setLoading(false);
      }
    };

    fetchSessionStatus();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
      >
        <div className="bg-gradient-to-r from-rose-400 to-red-500 p-6 text-white text-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-4"
          >
            <XCircle size={64} className="text-white" strokeWidth={1.5} />
          </motion.div>
          <h1 className="text-2xl font-bold">Payment Not Completed</h1>
          <p className="opacity-90 mt-1">Your transaction was canceled</p>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex flex-col items-center py-8">
              <div className="w-8 h-8 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600">Loading details...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Status</span>
                <span className="font-medium text-rose-600">{status}</span>
              </div>
              
              <div className="p-4 bg-rose-50 rounded-lg">
                <h3 className="font-medium text-rose-700 mb-2">Error Details</h3>
                <p className="text-gray-700">{error}</p>
              </div>

              <div className="flex gap-3 mt-6">
                <button 
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 rounded-lg font-medium transition-colors duration-200"
                  onClick={() => window.location.href = '/'}
                >
                  Back to Home
                </button>
                <button 
                  className="flex-1 bg-rose-500 hover:bg-rose-600 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200"
                  onClick={() => window.location.href = '/checkout'}
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default CancelPageContent;
