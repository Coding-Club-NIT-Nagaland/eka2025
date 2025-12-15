import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MockRazorpay from './MockRazorpay';

const PaymentButton = ({ event, userData, onSuccess, onError, className = '' }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load Razorpay script
    const loadRazorpay = () => {
      return new Promise((resolve) => {
        if (window.Razorpay) {
          return resolve(true);
        }
        
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => {
          console.log('Razorpay SDK loaded successfully');
          resolve(true);
        };
        script.onerror = (error) => {
          console.error('Razorpay SDK failed to load:', error);
          onError && onError('Payment processor failed to load. Please try again later.');
          resolve(false);
        };
        document.body.appendChild(script);
      });
    };

    loadRazorpay();
  }, [onError]);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (!window.Razorpay) {
        throw new Error('Payment processor not available. Please refresh the page and try again.');
      }

      // First, save the registration data to your backend
      const registrationResponse = await fetch('http://localhost:5000/api/registrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...userData,
          status: 'pending_payment',
        }),
      });

      if (!registrationResponse.ok) {
        const errorData = await registrationResponse.json();
        throw new Error(errorData.message || 'Failed to process registration');
      }

      const { registrationId } = await registrationResponse.json();

      // Then create a payment order
      const response = await fetch('http://localhost:5000/api/payments/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: event.registrationFee * 100, // Convert to paise
          currency: 'INR',
          receipt: `txn_${Date.now()}`,
          notes: {
            eventId: event.id,
            eventName: event.title,
            registrationId,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create payment order');
      }

      const orderData = await response.json();

      // Prepare payment options
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID || 'YOUR_RAZORPAY_KEY_ID',
        amount: orderData.amount,
        currency: orderData.currency,
        name: event.title,
        description: `Registration for ${event.title}`,
        order_id: orderData.id,
        handler: async function (response) {
          try {
            // Verify payment on your backend
            const verifyResponse = await fetch('http://localhost:5000/api/payments/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                registrationId: registrationId
              }),
            });

            const data = await verifyResponse.json();
            
            if (!verifyResponse.ok) {
              throw new Error(data.message || 'Payment verification failed');
            }

            if (data.success) {
              onSuccess && onSuccess({
                ...response,
                orderId: orderData.id,
                registrationId,
                eventId: event.id,
                amount: orderData.amount / 100, // Convert back to rupees
                currency: orderData.currency,
                timestamp: new Date().toISOString()
              });
            } else {
              throw new Error(data.message || 'Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            onError && onError(error.message || 'Error verifying payment. Please contact support.');
          }
        },
        prefill: {
          name: userData?.name || '',
          email: userData?.email || '',
          contact: userData?.phone || '',
        },
        theme: {
          color: '#2563eb',
        },
        modal: {
          ondismiss: function() {
            onError && onError('Payment was cancelled by user');
          },
          escape: true,
          backdropclose: true
        }
      };

          // In development, use the mock Razorpay for testing
      if (process.env.NODE_ENV === 'development') {
        // Initialize mock Razorpay
        window.Razorpay = {
          open: () => {
            const shouldProceed = window.confirm(
              `Mock Payment: Pay ₹${event.registrationFee} for ${event.title}?\n\n` +
              'Click OK to simulate successful payment\n' +
              'Click Cancel to simulate payment failure'
            );

            if (shouldProceed) {
              // Simulate successful payment
              const response = {
                razorpay_payment_id: 'pay_' + Math.random().toString(36).substring(2, 15),
                razorpay_order_id: options.order_id,
                razorpay_signature: 'mock_signature_' + Math.random().toString(36).substring(2, 15)
              };
              
              // Call the success handler with mock data
              if (options.handler) {
                options.handler(response);
              }
            } else {
              // Simulate payment failure
              const error = { 
                error: {
                  description: 'Payment was cancelled by user',
                  code: 'PAYMENT_CANCELLED'
                }
              };
              
              // Call the payment failed handler if it exists
              const paymentFailedHandler = window.Razorpay._handlers?.paymentFailed;
              if (paymentFailedHandler) {
                paymentFailedHandler(error);
              }
              
              // Also call the onError prop if provided
              if (onError) {
                onError(error.error.description);
              }
            }
          },
          on: function(event, callback) {
            // Store the callback for later use
            this._handlers = this._handlers || {};
            this._handlers[event] = callback;
          }
        };
      }

      // In production, use the real Razorpay
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      
      paymentObject.on('payment.failed', function (response) {
        onError(response.error.description || 'Payment failed. Please try again.');
      });
    } catch (err) {
      console.error('Payment error:', err);
      onError(err.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  // Simplified mock payment handler for development
  const handleMockPayment = () => {
    const shouldProceed = window.confirm(
      `Mock Payment: Pay ₹${event.registrationFee} for ${event.title}?\n\n` +
      'Click OK to simulate successful payment\n' +
      'Click Cancel to simulate payment failure'
    );

    if (shouldProceed) {
      // Simulate successful payment
      const response = {
        razorpay_payment_id: 'pay_' + Math.random().toString(36).substring(2, 15),
        razorpay_order_id: 'order_' + Math.random().toString(36).substring(2, 15),
        razorpay_signature: 'mock_signature_' + Math.random().toString(36).substring(2, 15)
      };
      
      // Call the success handler with mock data
      if (onSuccess) {
        onSuccess({
          ...response,
          orderId: response.razorpay_order_id,
          registrationId: 'mock_reg_' + Math.random().toString(36).substring(2, 10),
          eventId: event.id,
          amount: event.registrationFee * 100,
          currency: 'INR',
          timestamp: new Date().toISOString()
        });
      }
    } else {
      // Simulate payment failure
      if (onError) {
        onError('Payment was cancelled by user');
      }
    }
  };

  // In development, use the simplified mock payment flow
  if (process.env.NODE_ENV === 'development') {
    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          setLoading(true);
          setTimeout(() => {
            handleMockPayment();
            setLoading(false);
          }, 500);
        }}
        disabled={loading}
        className={`px-6 py-2 rounded-md font-medium ${
          loading
            ? 'bg-blue-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        } text-white transition-colors w-full`}
      >
        {loading ? 'Processing...' : `Pay ₹${event.registrationFee} to Register (Test Mode)`}
      </button>
    );
  }

  // In production, use the real Razorpay flow
  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className={`px-6 py-2 rounded-md font-medium ${
        loading
          ? 'bg-blue-400 cursor-not-allowed'
          : 'bg-blue-600 hover:bg-blue-700'
      } text-white transition-colors w-full`}
    >
      {loading ? 'Processing...' : `Pay ₹${event.registrationFee} to Register`}
    </button>
  );
};

export default PaymentButton;
