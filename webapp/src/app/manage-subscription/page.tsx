'use client'

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Dynamically import the component to ensure client-side rendering
const DynamicManageSubscriptionPage = dynamic(() => Promise.resolve(ManageSubscriptionPage), {
  ssr: false
});

function ManageSubscriptionPage() {
  const [session_id, setSessionId] = useState<string | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [canceling, setCanceling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [spendingData, setSpendingData] = useState<{
    dates: string[];
    amounts: number[];
  } | null>(null);
  const [spendingError, setSpendingError] = useState<string | null>(null);
  const [cancelationStatus, setCancelationStatus] = useState(false);

  // Dynamically get search params on client side
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // Get session_id from URL or localStorage after component mounts
    const session_id_from_url = searchParams.get('session_id');
    const localStorageSessionId = typeof window !== 'undefined' 
      ? localStorage.getItem('session_id') 
      : null;

    const finalSessionId = session_id_from_url || localStorageSessionId;
    
    if (finalSessionId) {
      setSessionId(finalSessionId);

      // Store session_id in localStorage if from URL
      if (session_id_from_url && session_id_from_url !== localStorageSessionId) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('session_id', session_id_from_url);
        }
      }

      // Fetch session data
      fetch(`/api/stripe/retrieve-session?session_id=${finalSessionId}`)
        .then(res => res.json())
        .then(data => {
          setSession(data);
          setCancelationStatus(data.cancel_at_period_end);
        })
        .catch((error) => {
          console.error('Error retrieving session:', error);
        });

      // Fetch spending data
      fetch(`/api/stripe/spending-history?session_id=${finalSessionId}`)
        .then(res => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
        .then(data => {
          setSpendingData({
            dates: data.dates,
            amounts: data.amounts
          });
        })
        .catch(err => {
          console.error("Detailed spending data error:", err);
          setSpendingError(err.message || "Failed to fetch spending data.");
        });
    }
  }, [searchParams]);

  const handleCancelSubscription = async () => {
    if (!session || !session_id) return;

    setCanceling(true);
    setError(null);

    try {
      const response = await fetch(`/api/stripe/cancel-subscription?session_id=${session_id}`, {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok) {
        setSession({ ...session, canceled: true });
        setCancelationStatus(true);
      } else {
        setError(data.error || 'An error occurred while canceling the subscription.');
      }
    } catch (error) {
      console.error('Error canceling subscription:', error);
      setError('An error occurred while canceling the subscription.');
    } finally {
      setCanceling(false);
    }
  };

  // Chart configuration
  const chartData = {
    labels: spendingData?.dates || [], 
    datasets: [
      {
        label: 'Spending ($)',
        data: spendingData?.amounts || [], 
        borderColor: '#4F46E5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Define chart options to position the legend, title, and tooltip
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context : any) {
            return `$${context.parsed.y.toFixed(2)}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: 'Amount ($)'
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 pt-20 pb-12 px-4 sm:px-8">
      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full mb-12 md:mb-16 pt-6 pb-4"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 pb-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-teal-400 text-transparent bg-clip-text animate-gradient text-center leading-[1.2]">
          Manage Subscription
        </h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mt-6">
          View and manage your subscription details and spending history
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Subscription Info Card */}
        <motion.div
          className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100 flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex-grow">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text">
              Subscription Details
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <span className="text-gray-600">Plan:</span>
                <span className="font-semibold text-indigo-600">{session?.plan_name || 'Loading...'}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <span className="text-gray-600">Amount:</span>
                <span className="font-semibold text-indigo-600">
                  {session ? `$${session.amount}/month` : 'Loading...'}
                </span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <span className="text-gray-600">Status:</span>
                <span className={`font-semibold ${cancelationStatus ? 'text-red-500' : 'text-green-500'}`}>
                  {session ? (cancelationStatus ? 'Scheduled to Cancel' : 'Active') : 'Loading...'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            {session && !cancelationStatus && (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                onClick={handleCancelSubscription}
                disabled={canceling}
              >
                {canceling ? 'Processing...' : 'Cancel Subscription'}
              </motion.button>
            )}

            {session && cancelationStatus && (
              <div className="p-4 bg-red-100 text-red-700 rounded-lg font-medium">
                Your subscription will cancel at the end of the current billing period.
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-100 text-red-700 rounded-lg font-medium">
                {error}
              </div>
            )}
          </div>
        </motion.div>

        {/* Graph Section */}
        <div className="flex flex-col">
          {spendingError ? (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center flex-grow flex items-center justify-center">
              {spendingError}
            </div>
          ) : (spendingData?.amounts?.length ?? 0) > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100 flex-grow flex flex-col"
            >
              <h3 className="text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text">
                Spending History
              </h3>
              <div className="flex-1 min-h-[300px]">
                <Line data={chartData} options={chartOptions} />
              </div>
            </motion.div>
          ) : (
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center text-gray-500 flex-grow flex items-center justify-center">
              No spending history available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DynamicManageSubscriptionPage;